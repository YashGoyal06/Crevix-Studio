export const paymentLinks = {
  basic: {
    advance: 'https://rzp.io/l/crevix-basic-advance',
    full: 'https://rzp.io/l/crevix-basic-plan',
    remaining: 'https://rzp.io/l/crevix-basic-remaining',
  },
  standard: {
    advance: 'https://rzp.io/l/crevix-standard-advance',
    full: 'https://rzp.io/l/crevix-standard-plan',
    remaining: 'https://rzp.io/l/crevix-standard-remaining',
  },
  premium: {
    advance: 'https://rzp.io/l/crevix-premium-advance',
    full: 'https://rzp.io/l/crevix-premium-plan',
    remaining: 'https://rzp.io/l/crevix-premium-remaining',
  },
  custom: 'https://rzp.io/l/crevix-custom-checkout',
};

export const webPlans = [
  {
    id: 'basic-plan',
    type: 'Website Plan',
    name: 'Basic Plan',
    fullPrice: 1999,
    advancePrice: 999,
    remainingPrice: 1000,
    price: '₹1999',
    advance: '₹999',
    paymentLinks: paymentLinks.basic,
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
    fullPrice: 3999,
    advancePrice: 1999,
    remainingPrice: 2000,
    price: '₹3,999',
    advance: '₹1,999',
    paymentLinks: paymentLinks.standard,
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
    fullPrice: 6999,
    advancePrice: 3499,
    remainingPrice: 3500,
    price: '₹6,999',
    advance: '₹3,499',
    paymentLinks: paymentLinks.premium,
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
    paymentLink: 'https://rzp.io/l/crevix-design-poster',
  },
  {
    id: 'logo-design',
    type: 'Design Service',
    name: 'Logo Design',
    price: '₹499 onwards',
    amount: 499,
    unit: 'Clean marks for brands and creators',
    paymentLink: 'https://rzp.io/l/crevix-design-logo',
  },
  {
    id: 'social-media-creatives',
    type: 'Design Service',
    name: 'Social Media Creatives',
    price: '₹999/month',
    amount: 999,
    unit: 'Monthly content design support',
    paymentLink: 'https://rzp.io/l/crevix-design-social',
  },
];

export const addOns = [
  { id: 'extra-page', type: 'Add-on', name: 'Extra Page', price: '₹500/page', amount: 500, paymentLink: 'https://rzp.io/l/crevix-addon-page' },
  { id: 'advanced-animations', type: 'Add-on', name: 'Advanced Animations', price: '₹1000+', amount: 1000, paymentLink: 'https://rzp.io/l/crevix-addon-anim' },
  { id: 'seo-optimization', type: 'Add-on', name: 'SEO Optimization', price: '₹1000', amount: 1000, paymentLink: 'https://rzp.io/l/crevix-addon-seo' },
  { id: 'website-maintenance', type: 'Add-on', name: 'Website Maintenance', price: '₹999/month', amount: 999, paymentLink: 'https://rzp.io/l/crevix-addon-maint' },
  { id: 'online-ordering-upgrade', type: 'Add-on', name: 'Online Ordering Upgrade', price: '₹1500-₹3000', amount: 1500, paymentLink: 'https://rzp.io/l/crevix-addon-ordering' },
];

export const getPaymentLinkForItems = (items) => {
  if (items.length === 1 && items[0].paymentLink) return items[0].paymentLink;
  if (items.length === 1 && items[0].paymentLinks) return items[0].paymentLinks.full;
  return paymentLinks.custom;
};

export const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;
