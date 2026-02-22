export function calculateScore(company, thesis) {
  let score = 0;
  let explanation = [];

  if (company.sector?.toLowerCase() === thesis.sector?.toLowerCase()) {
    score += 40;
    explanation.push("Sector match");
  }

  if (company.stage?.toLowerCase() === thesis.stage?.toLowerCase()) {
    score += 20;
    explanation.push("Stage match");
  }

  if (company.location?.toLowerCase() === thesis.location?.toLowerCase()) {
    score += 15;
    explanation.push("Geography match");
  }

  if (company.business_model?.toLowerCase() === thesis.business_model?.toLowerCase()) {
    score += 15;
    explanation.push("Business model match");
  }

  return { score, explanation };
}