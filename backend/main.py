from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import requests
from bs4 import BeautifulSoup

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load companies
with open("companies.json", "r") as f:
    companies = json.load(f)

@app.get("/")
def root():
    return {"message": "VC Thesis Scout Backend Running"}

@app.get("/companies")
def get_companies():
    return companies

@app.post("/enrich")
def enrich_company(data: dict):
    url = data.get("website")

    if not url:
        return {"summary": "No website provided"}

    try:
        response = requests.get(url, timeout=5)
        soup = BeautifulSoup(response.text, "html.parser")
        text = soup.get_text()[:1000]

        summary = text[:300] if text else "Mock enrichment summary."
        return {"summary": summary}
    except:
        return {"summary": "Mock enrichment summary for demo purposes."}