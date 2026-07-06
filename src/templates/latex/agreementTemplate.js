import { COMPANY_PROFILE } from '../../modules/agreements/agreementConstants';

const escapeLatex = (value = '') =>
  String(value)
    .replaceAll('\\', '\\textbackslash{}')
    .replaceAll('&', '\\&')
    .replaceAll('%', '\\%')
    .replaceAll('$', '\\$')
    .replaceAll('#', '\\#')
    .replaceAll('_', '\\_')
    .replaceAll('{', '\\{')
    .replaceAll('}', '\\}')
    .replaceAll('~', '\\textasciitilde{}')
    .replaceAll('^', '\\textasciicircum{}');

export const buildAgreementLatex = ({ agreement, signature, auditTrail }) => {
  const clauses = agreement.ai_content?.recommended_clauses || [];

  return `\\documentclass[11pt,a4paper]{article}
\\usepackage[margin=20mm]{geometry}
\\usepackage{tabularx}
\\usepackage{fancyhdr}
\\usepackage{lastpage}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\pagestyle{fancy}
\\fancyhf{}
\\lhead{${escapeLatex(COMPANY_PROFILE.name)}}
\\rhead{${escapeLatex(agreement.document_id)}}
\\cfoot{Page \\thepage\\ of \\pageref{LastPage}}
\\titleformat{\\section}{\\large\\bfseries\\color{black}}{}{0em}{}
\\begin{document}
\\begin{center}
{\\Large \\textbf{${escapeLatex(COMPANY_PROFILE.name)}}}\\\\
${escapeLatex(COMPANY_PROFILE.status)}\\\\
${escapeLatex(COMPANY_PROFILE.tagline)}\\\\[8pt]
{\\LARGE \\textbf{Official Service Agreement}}
\\end{center}

\\section*{Client Information}
\\begin{tabularx}{\\textwidth}{lX}
Client Name & ${escapeLatex(agreement.client_name)} \\\\
Client Email & ${escapeLatex(agreement.client_email)} \\\\
Brand Name & ${escapeLatex(agreement.brand_name)} \\\\
Project Name & ${escapeLatex(agreement.project_name)} \\\\
Service Type & ${escapeLatex(agreement.service_type)} \\\\
\\end{tabularx}

\\section*{Project Summary}
${escapeLatex(agreement.ai_content?.project_summary)}

\\section*{Deliverables}
${escapeLatex(agreement.ai_content?.deliverables_description || agreement.deliverables)}

\\section*{Timeline}
${escapeLatex(agreement.timeline)}

\\section*{Pricing}
Project Cost: ${escapeLatex(agreement.project_cost)}\\\\
Advance Amount: ${escapeLatex(agreement.advance_amount)}\\\\
Remaining Amount: ${escapeLatex(agreement.remaining_amount)}

\\newpage
\\section*{Terms \\& Conditions}
\\begin{enumerate}
\\item Payment Terms
\\item Revision Policy
\\item Scope of Work: ${escapeLatex(agreement.ai_content?.scope_of_work)}
\\item Ownership Rights
\\item Refund Policy
\\item Delays
\\item Portfolio Rights
\\item Communication
${clauses.map((clause) => `\\item ${escapeLatex(clause)}`).join('\n')}
\\end{enumerate}

\\newpage
\\section*{Acceptance \\& Signatures}
Client: ${escapeLatex(agreement.client_name)}\\\\
Brand: ${escapeLatex(agreement.brand_name)}\\\\
Date: ${escapeLatex(signature?.signed_at || agreement.agreement_date)}\\\\
Signature: ${signature ? 'Digitally signed' : 'Pending'}\\\\[16pt]
Authorized Representative: ${escapeLatex(COMPANY_PROFILE.representative)}\\\\
Designation: ${escapeLatex(COMPANY_PROFILE.designation)}\\\\
Date: ${escapeLatex(signature?.signed_at || agreement.agreement_date)}\\\\
Signature: Digitally authorized\\\\[16pt]
${escapeLatex(COMPANY_PROFILE.website)} | ${escapeLatex(COMPANY_PROFILE.email)} | ${escapeLatex(COMPANY_PROFILE.phone)}

\\newpage
\\section*{Audit Trail}
Title: Official Service Agreement\\\\
Document ID: ${escapeLatex(agreement.document_id)}\\\\
Document Pages: 4\\\\
Status: COMPLETED\\\\
Time Zone: ${escapeLatex(auditTrail?.timezone)}\\\\[8pt]
Signed Date: ${escapeLatex(auditTrail?.signed_date)}\\\\
Signed Time: ${escapeLatex(auditTrail?.signed_time)}\\\\
Signed By: ${escapeLatex(auditTrail?.email)}\\\\
IP Address: ${escapeLatex(auditTrail?.ip_address)}
\\end{document}`;
};
