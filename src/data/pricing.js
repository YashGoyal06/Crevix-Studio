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
    fullPrice: 3999,
    advancePrice: 1999,
    remainingPrice: 2000,
    price: '₹3,999',
    advance: '₹1,999',
    paymentLinks: paymentLinks.basic,
    features: [
      '1 Page Website',
      'Mobile Responsive',
      'Basic UI Design',
      'Contact Section',
      'Domain Excluded',
      'Delivery: 3-4 Days',
    ],
  },
  {
    id: 'standard-plan',
    type: 'Website Plan',
    name: 'Standard Plan',
    fullPrice: 8999,
    advancePrice: 4499,
    remainingPrice: 4500,
    price: '₹8,999',
    advance: '₹4,499',
    paymentLinks: paymentLinks.standard,
    features: [
      '3-5 Pages Website',
      'Custom UI Design',
      'Fully Responsive',
      'Basic Animations',
      'Contact Form',
      'Online Order Setup (WhatsApp / Form-based)',
      'Domain Excluded',
      'Delivery: 5-7 Days',
    ],
    featured: true,
  },
  {
    id: 'premium-plan',
    type: 'Website Plan',
    name: 'Premium Plan',
    fullPrice: 11999,
    advancePrice: 5999,
    remainingPrice: 6000,
    price: '₹11,999',
    advance: '₹5,999',
    paymentLinks: paymentLinks.premium,
    features: [
      '5-8 Pages Website',
      'Advanced UI/UX',
      'Smooth Animations (Framer Motion)',
      'SEO Setup',
      'Advanced Online Ordering (Cart + Payment Links)',
      'Domain Excluded',
      'Delivery: 7-10 Days',
    ],
  },
];

export const designServices = [
  {
    id: 'poster-banner-design',
    type: 'Design Service',
    name: 'Poster / Banner Design',
    price: 'Starting from ₹1,499',
    amount: 1499,
    unit: 'For campaigns, announcements, promotions, and events.',
  },
  {
    id: 'logo-design',
    type: 'Design Service',
    name: 'Logo Design',
    price: 'Starting from ₹3,999',
    amount: 3999,
    unit: 'Clean, memorable logos for brands, startups, and creators.',
  },
  {
    id: 'business-card-design',
    type: 'Design Service',
    name: 'Business Card Design',
    price: 'Starting from ₹999',
    amount: 999,
    unit: 'Professional, print-ready business card designs.',
  },
  {
    id: 'flyer-brochure-design',
    type: 'Design Service',
    name: 'Flyer / Brochure Design',
    price: 'Starting from ₹1,499',
    amount: 1499,
    unit: 'Marketing and promotional collateral for businesses.',
  },
  {
    id: 'presentation-design',
    type: 'Design Service',
    name: 'Presentation Design',
    price: 'Starting from ₹3,999',
    amount: 3999,
    unit: 'Investor decks, company profiles, and sales presentations.',
  },
  {
    id: 'menu-design',
    type: 'Design Service',
    name: 'Menu Design',
    price: 'Starting from ₹2,999',
    amount: 2999,
    unit: 'Professional menu layouts for restaurants and cafés.',
  },
];

export const designPackages = [
  {
    id: 'brand-identity-package',
    type: 'Design Package',
    name: 'Brand Identity Package',
    price: 'Starting from ₹11,999',
    amount: 11999,
    features: [
      'Logo Design',
      'Visual Identity System',
      'Brand Guidelines',
      'Business Collateral',
    ],
  },
  {
    id: 'marketing-design-package',
    type: 'Design Package',
    name: 'Marketing Design Package',
    price: 'Starting from ₹9,999',
    amount: 9999,
    features: [
      'Social Media Graphics',
      'Print & Marketing Collateral',
      'Promotional Campaign Assets',
      'Event & Advertising Materials',
    ],
  },
  {
    id: 'social-media-creative-pack',
    type: 'Design Package',
    name: 'Social Media Creative Pack',
    price: 'Starting from ₹6,999/month',
    amount: 6999,
    features: [
      '12–15 Custom Creatives Per Month',
      'Social Media Posts',
      'Stories',
      'Highlight Covers',
      'Monthly Design Support',
    ],
  },
];

export const addOns = [
  { id: 'extra-page', type: 'Add-on', name: 'Extra Page', price: '₹999/page', amount: 999, paymentLink: 'https://rzp.io/l/crevix-addon-page' },
  { id: 'advanced-animations', type: 'Add-on', name: 'Advanced Animations', price: '₹2,500+', amount: 2500, paymentLink: 'https://rzp.io/l/crevix-addon-anim' },
  { id: 'seo-optimization', type: 'Add-on', name: 'SEO Optimization', price: '₹1,500', amount: 1500, paymentLink: 'https://rzp.io/l/crevix-addon-seo' },
  { id: 'website-maintenance', type: 'Add-on', name: 'Website Maintenance', price: '₹999/month', amount: 999, paymentLink: 'https://rzp.io/l/crevix-addon-maint' },
  { id: 'online-ordering-upgrade', type: 'Add-on', name: 'Online Ordering Upgrade', price: '₹3,000', amount: 3000, paymentLink: 'https://rzp.io/l/crevix-addon-ordering' },
];

export const getPaymentLinkForItems = (items) => {
  if (items.length === 1 && items[0].paymentLink) return items[0].paymentLink;
  if (items.length === 1 && items[0].paymentLinks) return items[0].paymentLinks.full;
  return paymentLinks.custom;
};

export const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;
