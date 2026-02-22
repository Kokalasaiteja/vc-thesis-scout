import React from "react";

function CompanyCard({ company, scoreData, saveCompany, enrich }) {
  return (
    <div style={{border: "1px solid gray", padding: 10, margin: 10}}>
      <h3>{company.name}</h3>
      <p>{company.description}</p>
      <p><b>Score:</b> {scoreData.score}</p>
      <p>{scoreData.explanation.join(", ")}</p>

      <button onClick={() => saveCompany(company)}>Save</button>
      <button onClick={() => enrich(company)}>Enrich</button>
    </div>
  );
}

export default CompanyCard;