export const paymentLinks = {
  basic: 'https://rzp.io/l/crevix-basic-plan',
  standard: 'https://rzp.io/l/crevix-standard-plan',
  premium: 'https://rzp.io/l/crevix-premium-plan',
  custom: 'https://rzp.io/l/crevix-custom-checkout',
};

export const webPlans = [
  {
    id: 'basic-plan',
    type: 'Website Plan',
    name: 'Basic Plan',
    price: '₹1',
    amount: 1,
    paymentLink: paymentLinks.basic,
    features: [
      '1 Page Website',
      'Mobile Responsive',
      'Basic UI Design',
      'Contact Section',
      'Delivery: 3-4 Days',
    ],
  },
  {
    id: 'standard-plan',
    type: 'Website Plan',
    name: 'Standard Plan',
    price: '₹3999',
    amount: 3999,
    paymentLink: paymentLinks.standard,
    features: [
      '3-5 Pages Website',
      'Custom UI Design',
      'Fully Responsive',
      'Basic Animations',
      'Contact Form',
      'Online Order Setup (WhatsApp / Form-based)',
      'Delivery: 5-7 Days',
    ],
    featured: true,
  },
  {
    id: 'premium-plan',
    type: 'Website Plan',
    name: 'Premium Plan',
    price: '₹6999',
    amount: 6999,
    paymentLink: paymentLinks.premium,
    features: [
      '5-8 Pages Website',
      'Advanced UI/UX',
      'Smooth Animations (Framer Motion)',
      'SEO Setup',
      'Advanced Online Ordering (Cart + Payment Links)',
      'Priority Delivery',
      'Delivery: 7-10 Days',
    ],
  },
];

export const designServices = [
  {
    id: 'poster-banner',
    type: 'Design Service',
    name: 'Poster / Banner',
    price: '₹199 onwards',
    amount: 199,
    unit: 'For campaigns, announcements, and promos',
  },
  {
    id: 'logo-design',
    type: 'Design Service',
    name: 'Logo Design',
    price: '₹499 onwards',
    amount: 499,
    unit: 'Clean marks for brands and creators',
  },
  {
    id: 'social-media-creatives',
    type: 'Design Service',
    name: 'Social Media Creatives',
    price: '₹999/month',
    amount: 999,
    unit: 'Monthly content design support',
  },
];

export const addOns = [
  { id: 'extra-page', type: 'Add-on', name: 'Extra Page', price: '₹500/page', amount: 500 },
  { id: 'advanced-animations', type: 'Add-on', name: 'Advanced Animations', price: '₹1000+', amount: 1000 },
  { id: 'seo-optimization', type: 'Add-on', name: 'SEO Optimization', price: '₹1000', amount: 1000 },
  { id: 'website-maintenance', type: 'Add-on', name: 'Website Maintenance', price: '₹999/month', amount: 999 },
  { id: 'online-ordering-upgrade', type: 'Add-on', name: 'Online Ordering Upgrade', price: '₹1500-₹3000', amount: 1500 },
];

export const getPaymentLinkForItems = (items) => {
  if (items.length === 1 && items[0].paymentLink) return items[0].paymentLink;
  return paymentLinks.custom;
};

export const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;
