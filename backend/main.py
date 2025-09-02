import os
import json
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from openai import OpenAI

# Load environment variables
load_dotenv()

client = OpenAI(
    api_key=os.environ["LLM_FACTORY_API_KEY"],
    base_url=os.environ["LLM_FACTORY_BASE_URL"]
)

# Allow CORS for frontend
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://yourfrontend.com"],  # adjust
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response Models
class QuizAnswer(BaseModel):
    question: str
    answer: str

class RoutineRequest(BaseModel):
    quiz_results: List[QuizAnswer]

class RoutineResponse(BaseModel):
    routine: str  # could be JSON in string form or you could parse it

@app.post("/generate_routine")
def generate_routine(req: RoutineRequest):
    try:
        completion = client.chat.completions.create(
            model=os.environ["LLM_FACTORY_MODEL"],
            messages=[
                {"role": "system", "content": "You are a skincare assistant."},
                {
                    "role": "user",
                    "content": f"Give me a skincare routine for: {req.quiz_results}"
                }
            ],
            max_tokens=200,
            temperature=0.7,
            timeout=20
        )
        return {"routine": completion.choices[0].message.content}

    except Exception as e:
        # Fallback so you can still test the frontend
        return {"routine": f"[Fallback] Could not reach LLM: {str(e)}"}

