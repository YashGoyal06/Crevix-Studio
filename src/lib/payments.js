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
  const { customer, items, total, paymentId, orderId, createdAt } = checkoutData;
  if (!total) return;
  const doc = new jsPDF();
  const date = new Date(createdAt || Date.now()).toLocaleDateString('en-IN');

  // Theme Colors
  const primary = '#000000';
  const secondary = '#555555';

  // Header
  doc.setFillColor(0, 0, 0);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text('CREVIX STUDIO', 20, 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('INVOICE', 170, 25);

  // Info Section
  doc.setTextColor(primary);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Billed To:', 20, 60);
  doc.setFont('helvetica', 'normal');
  doc.text(customer?.name || 'Customer', 20, 67);
  doc.text(customer?.email || '', 20, 73);
  doc.text(customer?.phone || '', 20, 79);

  doc.setFont('helvetica', 'bold');
  doc.text('Invoice Details:', 120, 60);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${date}`, 120, 67);
  doc.text(`Order ID: ${orderId?.slice(-10) || 'N/A'}`, 120, 73);
  doc.text(`Payment ID: ${paymentId?.slice(-10) || 'N/A'}`, 120, 79);

  // Table Header
  doc.setFillColor(245, 245, 245);
  doc.rect(20, 95, 170, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.text('Description', 25, 102);
  doc.text('Amount', 160, 102);

  // Table Items
  let y = 115;
  doc.setFont('helvetica', 'normal');
  items?.forEach((item) => {
    doc.text(item.name || 'Service', 25, y);
    doc.text(`INR ${item.amount?.toLocaleString() || '0'}`, 160, y);
    y += 10;
  });

  // Footer
  doc.setDrawColor(230, 230, 230);
  doc.line(20, 180, 190, 180);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Total Paid', 25, 195);
  doc.text(`INR ${total?.toLocaleString()}`, 160, 195);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(secondary);
  doc.text('Thank you for choosing Crevix Studio. Let\'s build something great.', 105, 220, { align: 'center' });

  doc.save(`Crevix_Invoice_${orderId?.slice(-6) || 'Order'}.pdf`);
};
