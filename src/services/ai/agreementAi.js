import { SERVICE_CLAUSES } from '../../modules/agreements/agreementConstants';

const MODEL = 'mistralai/Mistral-7B-Instruct-v0.3';
const HF_ENDPOINT = `https://api-inference.huggingface.co/models/${MODEL}`;

const fallbackAiContent = (input) => {
  const clauses = SERVICE_CLAUSES[input.service_type] || [
    'Any work outside the approved scope will be estimated and billed separately.',
    'Both parties agree to maintain timely communication throughout the project.',
  ];

  return {
    project_summary: `Crevix Studio will provide ${input.service_type || 'creative services'} for ${input.project_name || input.brand_name || 'the client'}, aligned with the agreed deliverables, timeline, and commercial terms.`,
    scope_of_work: `The scope covers ${input.deliverables || 'the listed project deliverables'} with structured feedback, professional execution, and delivery within ${input.timeline || 'the agreed timeline'}.`,
    deliverables_description: input.deliverables || 'Deliverables will be prepared according to the confirmed project brief and approved milestones.',
    professional_wording:
      'The parties agree to cooperate in good faith, share required inputs on time, and complete review cycles according to the agreement terms.',
    recommended_clauses: clauses,
  };
};

const extractJson = (text) => {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) return null;
  return JSON.parse(text.slice(start, end + 1));
};

export const generateAgreementAiContent = async (input) => {
  const token = import.meta.env.VITE_HUGGINGFACE_TOKEN;
  if (!token) return fallbackAiContent(input);

  const prompt = `
Return only valid JSON for a Crevix Studio service agreement.
Fields: project_summary, scope_of_work, deliverables_description, professional_wording, recommended_clauses.
Use professional legal-business wording, concise paragraphs, and practical clauses.

Input:
Service type: ${input.service_type}
Deliverables: ${input.deliverables}
Project description: ${input.project_description || input.project_name}
Timeline: ${input.timeline}
Project cost: ${input.project_cost}
`;

  try {
    const response = await fetch(HF_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 700,
          temperature: 0.35,
          return_full_text: false,
        },
      }),
    });

    if (!response.ok) throw new Error('AI generation failed');
    const payload = await response.json();
    const generated = Array.isArray(payload) ? payload[0]?.generated_text : payload.generated_text;
    const parsed = extractJson(generated || '');
    return parsed || fallbackAiContent(input);
  } catch (error) {
    console.warn(error);
    return fallbackAiContent(input);
  }
};
