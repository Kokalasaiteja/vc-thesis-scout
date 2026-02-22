import React, { useEffect, useState } from "react";
import axios from "axios";
import ThesisForm from "./components/ThesisForm";
import CompanyCard from "./components/CompanyCard";
import SavedList from "./components/SavedList";
import { calculateScore } from "./utils/scoring";
import "./App.css";

const API_URL = "https://vc-thesis-scout.onrender.com";

function App() {
  const [companies, setCompanies] = useState([]);
  const [thesis, setThesis] = useState({
    sector: "",
    stage: "",
    location: "",
    business_model: ""
  });
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}companies`)
      .then(res => setCompanies(res.data))
      .catch(err => console.error(err));

    const stored = localStorage.getItem("savedSearch");
    if (stored) setThesis(JSON.parse(stored));
  }, []);

  const saveSearch = () => {
    localStorage.setItem("savedSearch", JSON.stringify(thesis));
  };

  const saveCompany = (company) => {
    const exists = saved.find(c => c.website === company.website);
    if (exists) {
      alert("Duplicate detected!");
      return;
    }
    setSaved([...saved, company]);
  };

  const enrich = async (company) => {
    try {
      const res = await axios.post(`${API_URL}enrich`, {
        website: company.website
      });
      alert(res.data.summary);
    } catch (err) {
      alert("Enrichment failed.");
    }
  };

  return (
    <div className="app-wrapper">
      <div className="app-container">

        <header className="app-header">
          <h1>VC Thesis Scout</h1>
          <p className="subtitle">
            Thesis-driven startup discovery for venture capital firms
          </p>
        </header>

        <section className="thesis-section">
          <ThesisForm
            thesis={thesis}
            setThesis={setThesis}
            saveSearch={saveSearch}
          />
        </section>

        <section className="companies-section">
          {companies.map(company => {
            const scoreData = calculateScore(company, thesis);
            return (
              <CompanyCard
                key={company.id}
                company={company}
                scoreData={scoreData}
                saveCompany={saveCompany}
                enrich={enrich}
              />
            );
          })}
        </section>

        {saved.length > 0 && (
          <section className="saved-section">
            <SavedList saved={saved} />
          </section>
        )}

      </div>
    </div>
  );
}

export default App;