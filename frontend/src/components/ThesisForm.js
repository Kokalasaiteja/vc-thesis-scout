import React from "react";

function ThesisForm({ thesis, setThesis, saveSearch }) {
  return (
    <div>
      <h3>Investment Thesis</h3>
      <input placeholder="Sector"
        value={thesis.sector}
        onChange={e => setThesis({...thesis, sector: e.target.value})} />
      <input placeholder="Stage"
        value={thesis.stage}
        onChange={e => setThesis({...thesis, stage: e.target.value})} />
      <input placeholder="Location"
        value={thesis.location}
        onChange={e => setThesis({...thesis, location: e.target.value})} />
      <input placeholder="Business Model"
        value={thesis.business_model}
        onChange={e => setThesis({...thesis, business_model: e.target.value})} />

      <button onClick={saveSearch}>Save Search</button>
    </div>
  );
}

export default ThesisForm;