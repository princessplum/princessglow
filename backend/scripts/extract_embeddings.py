import os
import pandas as pd
import numpy as np
from PIL import Image
from tqdm import tqdm
from transformers import AutoImageProcessor, AutoModel
import torch

# Load DINOv2
processor = AutoImageProcessor.from_pretrained("facebook/dinov2-base")
model = AutoModel.from_pretrained("facebook/dinov2-base")
model.eval()

# Paths
image_folder = "../data"
csv_path = "../skin_labels.csv"
embedding_save_path = "../dino_embeddings.npy"
label_save_path = "../dino_labels.npy"

# Load labels
df = pd.read_csv(csv_path)
X = []
failed = []

print("🔍 Extracting embeddings...")

for fname in tqdm(df["filename"]):
    try:
        image_path = os.path.join(image_folder, fname)
        image = Image.open(image_path).convert("RGB")

        # Preprocess and embed
        inputs = processor(images=image, return_tensors="pt")
        with torch.no_grad():
            outputs = model(**inputs)
            embedding = outputs.last_hidden_state.mean(dim=1).squeeze().numpy()

        X.append(embedding)

    except Exception as e:
        print(f"⚠️ Failed on {fname}: {e}")
        failed.append(fname)

# Save outputs
X = np.array(X)
y = df[["acne", "acne_marks", "stains", "wrinkles", "dark_circles"]].values

np.save(embedding_save_path, X)
np.save(label_save_path, y)

print(f"\n✅ Saved {len(X)} embeddings to {embedding_save_path}")
if failed:
    print(f"⚠️ {len(failed)} failed images (see log above)")
