import { AGREEMENT_STATUS } from './agreementConstants';

const today = new Date().toISOString();

export const createSampleAgreement = (token) => {
  const readableToken = token?.slice(0, 8)?.toUpperCase() || 'DEMO';

  return {
    id: `agr_${readableToken}`,
    token,
    document_id: `CREVIX-${readableToken}`,
    status: AGREEMENT_STATUS.SENT,
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    created_at: today,
    client_name: 'Sample Client',
    client_email: 'client@example.com',
    brand_name: 'Northstar Brand',
    project_name: 'Brand Identity System',
    service_type: 'Branding',
    deliverables: 'Logo suite, color palette, typography system, brand usage guide, and social profile kit.',
    project_description: 'A complete brand identity package for a growing business that needs a polished visual system.',
    timeline: '21 working days',
    revision_count: 3,
    project_cost: 65000,
    advance_amount: 30000,
    remaining_amount: 35000,
    agreement_date: today,
    ai_content: {
      project_summary:
        'Crevix Studio will design a refined brand identity system for Northstar Brand, covering strategic visual direction, core identity assets, and ready-to-use brand applications.',
      scope_of_work:
        'The scope includes creative direction, identity exploration, selected logo refinement, color and typography guidance, and final export of approved assets for business and marketing use.',
      deliverables_description:
        'Final deliverables include logo files, brand colors, font recommendations, a usage guide, and social media profile assets prepared in standard digital formats.',
      professional_wording:
        'Both parties agree to collaborate through scheduled feedback checkpoints and maintain timely communication to complete the project within the agreed timeline.',
      recommended_clauses: [
        'Brand identity ownership transfers after full payment and final approval.',
        'Revision limits apply to each approved milestone and do not include a full creative direction reset.',
      ],
    },
  };
};
