import React from "react";

function SavedList({ saved }) {

  const exportCSV = () => {
    const headers = Object.keys(saved[0]);
    const rows = saved.map(obj => headers.map(h => obj[h]).join(","));
    const csv = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "saved_companies.csv";
    link.click();
  };

  if (!saved.length) return null;

  return (
    <div>
      <h3>Saved Companies</h3>
      <button onClick={exportCSV}>Export CSV</button>
      {saved.map(c => (
        <div key={c.id}>{c.name}</div>
      ))}
    </div>
  );
}

export default SavedList;