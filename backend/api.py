from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
import joblib
import io
from transformers import AutoImageProcessor, AutoModel
import numpy as np

# Initialize FastAPI app
app = FastAPI()

# Allow CORS (e.g., from your React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔄 Load DINOv2 and classifier on startup
print("🔄 Loading DINOv2 and classifier...")
processor = AutoImageProcessor.from_pretrained("facebook/dinov2-base")
model = AutoModel.from_pretrained("facebook/dinov2-base")
clf = joblib.load("skin_model.pkl")  # Make sure path is correct
labels = ["acne", "acne_marks", "stains", "wrinkles", "dark_circles"]


@app.post("/analyze_skin")
async def analyze_skin(file: UploadFile = File(...)):
    try:
        # Load and preprocess the uploaded image
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        inputs = processor(images=image, return_tensors="pt")
        with torch.no_grad():
            outputs = model(**inputs)
            embedding = outputs.last_hidden_state.mean(dim=1).squeeze().numpy()

        # Run prediction
        proba = clf.predict_proba([embedding])

        concerns = []
        for label, prob in zip(labels, proba):
            # Flatten nested lists or arrays
            prob = prob[0] if isinstance(prob[0], (list, np.ndarray)) else prob
            confidence = float(prob[1]) if len(prob) > 1 else float(prob[0])
            concerns.append({
                "label": label,
                "confidence": round(confidence, 3)
            })

        top_concerns = sorted(
            [c for c in concerns if c["confidence"] >= 0.5],
            key=lambda x: x["confidence"],
            reverse=True
        )[:3]

        return {
            "skin_concerns": concerns,
            "top_concerns": [c["label"] for c in top_concerns]
        }

    except Exception as e:
        return {"error": str(e)}

from llm_factory_client import get_skincare_recommendation

@app.post("/recommend_routine")
async def recommend_routine(payload: dict):
    quiz_answers = payload.get("quiz_answers")
    top_concerns = payload.get("top_concerns")

    routine = get_skincare_recommendation(quiz_answers, top_concerns)
    return {"routine": routine}
