# PrincessGlow

PrincessGlow is a full-stack AI-powered skincare web application that helps users analyze their skin concerns and receive personalized skincare routines.  
The application allows users to upload a selfie and/or complete a short quiz, then generates tailored recommendations using computer vision and machine learning models.

## Project Structure
princessglow/
├── frontend/ # React (Vite) app
└── backend/ # FastAPI app


- **frontend/** → User-facing React app (quiz, image upload, results display)  
- **backend/** → FastAPI app for processing images, running models, and returning predictions  

---

## Getting Started


### 1. Backend (FastAPI)
1. Navigate to the backend folder:
   ```bash
   cd backend

2. Install dependencies (use a virtual environment if preferred):
pip install -r requirements.txt

3. Run the FastAPI server:
uvicorn main:app --reload

4. Backend will start at: http://127.0.0.1:8000


### 2. Frontend (React + Vite)

1. Navigate to the frontend folder:
cd frontend

2. Install dependencies:
npm install

3. Start the dev server:
npm run dev

4. Frontend will start at: http://127.0.0.1:5173
