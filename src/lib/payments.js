import { jsPDF } from 'jspdf';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';
export const PUBLIC_RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

export const loadRazorpayScript = () =>
  new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Razorpay can only be used in the browser.'));
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Razorpay SDK.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK.'));
    document.body.appendChild(script);
  });

const toJson = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Payment API request failed.');
  }
  return data;
};

export const createRazorpayOrder = async ({ amountPaise, notes }) => {
  const response = await fetch(`${BACKEND_BASE_URL}/api/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount_paise: amountPaise,
      currency: 'INR',
      notes,
    }),
  });
  return toJson(response);
};

export const verifyRazorpayPayment = async ({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) => {
  const response = await fetch(`${BACKEND_BASE_URL}/api/verify-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
    }),
  });
  return toJson(response);
};

export const generateInvoice = (checkoutData) => {
  const { customer, items, total, paymentId, orderId, createdAt, isAdvance, isRemaining } = checkoutData;
  if (!total) return;
  
  const doc = new jsPDF();
  const date = new Date(createdAt || Date.now()).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Colors
  const colors = {
    primary: '#000000',
    secondary: '#444444',
    accent: '#000000',
    lightGray: '#F9F9F9',
    border: '#EEEEEE',
    white: '#FFFFFF',
    success: '#10B981'
  };

  // Header Background
  doc.setFillColor(colors.primary);
  doc.rect(0, 0, 210, 50, 'F');
  
  // Brand Logo/Name
  doc.setTextColor(colors.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text('CREVIX STUDIO', 20, 32);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('DESIGN • DEVELOPMENT • BRANDING', 20, 40);
  
  // Invoice Label
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('TAX INVOICE', 160, 32, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Invoice #: ${orderId?.slice(-8).toUpperCase() || 'INV-TEST'}`, 160, 38, { align: 'right' });

  // Addresses Section
  doc.setTextColor(colors.primary);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('ISSUED BY:', 20, 65);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.secondary);
  doc.text('Crevix Studio', 20, 71);
  doc.text('Delhi, India', 20, 76);
  doc.text('payments@crevix-studio.in', 20, 81);

  doc.setTextColor(colors.primary);
  doc.setFont('helvetica', 'bold');
  doc.text('BILLED TO:', 120, 65);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.secondary);
  doc.text(customer?.name || 'Customer Name', 120, 71);
  doc.text(customer?.email || 'Email Address', 120, 76);
  doc.text(customer?.phone || 'Phone Number', 120, 81);
  if (customer?.businessName) doc.text(customer.businessName, 120, 86);

  // Status Bar
  doc.setFillColor(colors.lightGray);
  doc.rect(20, 95, 170, 15, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary);
  doc.text('Payment Date:', 25, 104);
  doc.setFont('helvetica', 'normal');
  doc.text(date, 55, 104);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Payment ID:', 110, 104);
  doc.setFont('helvetica', 'normal');
  doc.text(paymentId || 'N/A', 135, 104);

  // Table Header
  doc.setFillColor(colors.primary);
  doc.rect(20, 120, 170, 10, 'F');
  doc.setTextColor(colors.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Description', 25, 126.5);
  doc.text('Status', 120, 126.5);
  doc.text('Amount', 160, 126.5);

  // Table Items
  let y = 140;
  doc.setTextColor(colors.primary);
  doc.setFont('helvetica', 'normal');
  
  items?.forEach((item) => {
    // Determine the actual amount for this item in this transaction
    let displayAmount = item.amount;
    if (isRemaining) displayAmount = item.remainingPrice || item.amount;
    else if (isAdvance) displayAmount = item.advancePrice || item.amount;
    else displayAmount = item.fullPrice || item.amount;

    doc.setFont('helvetica', 'bold');
    doc.text(item.name || 'Service Package', 25, y);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(colors.secondary);
    doc.text(item.type || 'Web Design & Development', 25, y + 5);
    
    doc.setFontSize(10);
    doc.setTextColor(colors.primary);
    const statusText = isRemaining ? 'Remaining' : (isAdvance ? 'Advance' : 'Full Payment');
    doc.text(statusText, 120, y + 2);
    doc.text(`INR ${displayAmount?.toLocaleString() || '0'}`, 190, y + 2, { align: 'right' });
    
    // Line separator
    doc.setDrawColor(colors.border);
    doc.line(20, y + 10, 190, y + 10);
    y += 15;
  });

  // Totals Section
  const totalsY = Math.max(y + 10, 180);
  doc.setFont('helvetica', 'normal');
  doc.text('Subtotal:', 130, totalsY);
  doc.text(`INR ${total?.toLocaleString()}`, 190, totalsY, { align: 'right' });
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Total Paid:', 130, totalsY + 10);
  doc.setTextColor(colors.success);
  doc.text(`INR ${total?.toLocaleString()}`, 190, totalsY + 10, { align: 'right' });

  // Paid Watermark/Badge
  doc.setDrawColor(colors.success);
  doc.setLineWidth(0.5);
  doc.rect(20, totalsY - 5, 40, 15);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('PAID IN FULL', 25, totalsY + 5);

  // Footer
  doc.setTextColor(colors.secondary);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Note: This is a computer-generated invoice and does not require a physical signature.', 20, 260);
  doc.text('For any queries, please reach out to hello@crevixstudio.com', 20, 265);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Thank you for working with Crevix Studio!', 105, 275, { align: 'center' });

  doc.save(`Crevix_Invoice_${orderId?.slice(-6).toUpperCase() || 'ORDER'}.pdf`);
};

export const previewInvoice = () => {
  const dummyData = {
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 98765 43210',
      businessName: 'Example Corp'
    },
    items: [
      {
        id: 'premium-plan',
        name: 'Premium Studio Plan',
        type: 'Web Development',
        amount: 49999,
        advancePrice: 24999,
        remainingPrice: 25000,
        fullPrice: 44999
      }
    ],
    total: 24999,
    isAdvance: true,
    isRemaining: false,
    paymentId: 'pay_ABC123XYZ789',
    orderId: 'order_ORD987LMN456',
    createdAt: new Date().toISOString()
  };
  
  generateInvoice(dummyData);
};
