export function calculateScore(company, thesis) {
  let score = 0;
  let explanation = [];

  if (company.sector === thesis.sector) {
    score += 40;
    explanation.push("Sector match");
  }

  if (company.stage === thesis.stage) {
    score += 20;
    explanation.push("Stage match");
  }

  if (company.location === thesis.location) {
    score += 15;
    explanation.push("Geography match");
  }

  if (company.business_model === thesis.business_model) {
    score += 15;
    explanation.push("Business model match");
  }

  return { score, explanation };
}