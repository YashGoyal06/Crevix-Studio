export const COMPANY_PROFILE = {
  name: 'Crevix Studio',
  status: 'MSME Registered',
  tagline: 'Designing Brands That Leave A Lasting Impression',
  website: 'www.crevixstudio.com',
  email: 'codewithyash124@gmail.com',
  phone: '+91 98765 43210',
  representative: 'Yash Goyal',
  designation: 'Founder & Creative Director',
};

export const AGREEMENT_STATUS = {
  DRAFT: 'DRAFT',
  SENT: 'SENT',
  COMPLETED: 'COMPLETED',
  EXPIRED: 'EXPIRED',
};

export const SERVICE_CLAUSES = {
  'Logo Design': [
    'Final approved logo assets include commercial usage rights after complete payment.',
    'Crevix Studio may retain editable source files until the final balance is cleared.',
  ],
  'Website Development': [
    'Hosting, domain renewal, and third-party subscription costs are billed separately unless listed in deliverables.',
    'Client is responsible for supplying final copy, product data, legal text, and media before development milestones.',
    'Maintenance after launch requires a separate support agreement unless included in the project scope.',
  ],
  'Social Media': [
    'Client approvals must be shared before the agreed posting schedule to avoid publishing delays.',
    'Crevix Studio is not responsible for platform reach, ad account restrictions, or algorithmic performance changes.',
  ],
  Branding: [
    'Brand identity ownership transfers after full payment and final approval.',
    'Revision limits apply to each approved milestone and do not include a full creative direction reset.',
  ],
};

export const REQUIRED_INPUTS = [
  'client_name',
  'client_email',
  'brand_name',
  'project_name',
  'service_type',
  'deliverables',
  'timeline',
  'revision_count',
  'project_cost',
  'advance_amount',
  'remaining_amount',
  'agreement_date',
];
