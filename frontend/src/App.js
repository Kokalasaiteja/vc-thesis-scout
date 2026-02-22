import React, { useEffect, useState } from "react";
import axios from "axios";
import ThesisForm from "./components/ThesisForm";
import CompanyCard from "./components/CompanyCard";
import SavedList from "./components/SavedList";
import { calculateScore } from "./utils/scoring";

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
    axios.get(`${API_URL}/companies`)
      .then(res => setCompanies(res.data))
      .catch(err => console.error(err));

    const stored = localStorage.getItem("savedSearch");
    if (stored) setThesis(JSON.parse(stored));
  }, []);

  const saveSearch = () => {
    localStorage.setItem("savedSearch", JSON.stringify(thesis));
    alert("Search Saved");
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
    const res = await axios.post(`${API_URL}/enrich`, {
      website: company.website
    });
    alert(res.data.summary);
  };

  return (
    <div style={{padding: 20}}>
      <h1>VC Thesis Scout</h1>

      <ThesisForm thesis={thesis} setThesis={setThesis} saveSearch={saveSearch} />

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

      <SavedList saved={saved} />
    </div>
  );
}

export default App;