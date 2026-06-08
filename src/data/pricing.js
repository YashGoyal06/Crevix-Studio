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
    fullPrice: 4999,
    advancePrice: 2499,
    remainingPrice: 2500,
    price: '₹4,999',
    advance: '₹2,499',
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
    price: 'Starting from ₹2,999',
    amount: 2999,
    unit: 'Clean, memorable logos for brands, startups, and creators.',
  },
  {
    id: 'social-media-post-design',
    type: 'Design Service',
    name: 'Social Media Post Design',
    price: 'Starting from ₹799',
    amount: 799,
    unit: 'Custom-designed creatives for Instagram, Facebook, and LinkedIn.',
  },
  {
    id: 'instagram-story-design',
    type: 'Design Service',
    name: 'Instagram Story Design',
    price: 'Starting from ₹599',
    amount: 599,
    unit: 'Engaging story designs for promotions and audience engagement.',
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
    price: 'Starting from ₹2,499',
    amount: 2499,
    unit: 'Investor decks, company profiles, and sales presentations.',
  },
  {
    id: 'menu-design',
    type: 'Design Service',
    name: 'Menu Design',
    price: 'Starting from ₹1,999',
    amount: 1999,
    unit: 'Professional menu layouts for restaurants and cafés.',
  },
];

export const designPackages = [
  {
    id: 'brand-identity-package',
    type: 'Design Package',
    name: 'Brand Identity Package',
    price: 'Starting from ₹7,999',
    amount: 7999,
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
    price: 'Starting from ₹7,999',
    amount: 7999,
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
    price: 'Starting from ₹4,999/month',
    amount: 4999,
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
