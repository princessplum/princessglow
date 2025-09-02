import os
import torch
import joblib
import numpy as np
from PIL import Image
from transformers import AutoImageProcessor, AutoModel

# === Load DINOv2 ===
print("🔄 Loading DINOv2 model...")
processor = AutoImageProcessor.from_pretrained("facebook/dinov2-base")
model = AutoModel.from_pretrained("facebook/dinov2-base")
model.eval()

# === Load trained skin concern model ===
print("📦 Loading saved skin concern classifier...")
clf = joblib.load("../skin_model.pkl")

# === Set up labels ===
labels = ["acne", "acne_marks", "stains", "wrinkles", "dark_circles"]

# === Pick image to test ===
image_path = "../data/001264_black_female_31_0_0_1_1_0.jpg"  # Replace with any new image

# === Preprocess and embed with DINOv2 ===
print(f"🖼️ Processing image: {image_path}")
image = Image.open(image_path).convert("RGB")
inputs = processor(images=image, return_tensors="pt")

with torch.no_grad():
    outputs = model(**inputs)
    embedding = outputs.last_hidden_state.mean(dim=1).squeeze().numpy()

# === Run prediction ===
prediction = clf.predict([embedding])[0]
results = {label: bool(pred) for label, pred in zip(labels, prediction)}

# === Display result ===
print("\n✅ Predicted Skin Concerns:")
for label, value in results.items():
    print(f"  {label}: {'✅' if value else '❌'}")
