import React from "react";
import "./ThesisForm.css";

function ThesisForm({ thesis, setThesis, saveSearch }) {

  const handleChange = (e) => {
    setThesis({
      ...thesis,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="thesis-form">
      <input
        name="sector"
        placeholder="Sector"
        value={thesis.sector}
        onChange={handleChange}
      />
      <input
        name="stage"
        placeholder="Stage"
        value={thesis.stage}
        onChange={handleChange}
      />
      <input
        name="location"
        placeholder="Location"
        value={thesis.location}
        onChange={handleChange}
      />
      <input
        name="business_model"
        placeholder="Business Model"
        value={thesis.business_model}
        onChange={handleChange}
      />
      <button className="save-btn" onClick={saveSearch}>
        Save Search
      </button>
    </div>
  );
}

export default ThesisForm;