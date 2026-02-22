import React from "react";
import "./CompanyCard.css";

function CompanyCard({ company, scoreData, saveCompany, enrich }) {
  return (
    <div className="company-card">
      <h2>{company.name}</h2>
      <p className="description">{company.description}</p>

      <p className="score">
        Score: <span>{scoreData.score}</span>
      </p>

      <div className="button-group">
        <button className="btn primary" onClick={() => saveCompany(company)}>
          Save
        </button>
        <button className="btn secondary" onClick={() => enrich(company)}>
          Enrich
        </button>
      </div>
    </div>
  );
}

export default CompanyCard;