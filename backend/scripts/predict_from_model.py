import joblib
import numpy as np

# Load saved model
clf = joblib.load("../skin_model.pkl")

# Load a test embedding (e.g. first one)
X = np.load("../dino_embeddings.npy")
test_embedding = X[0].reshape(1, -1)  # Reshape for sklearn

# Predict
prediction = clf.predict(test_embedding)[0]

# Map prediction to labels
labels = ["acne", "acne_marks", "stains", "wrinkles", "dark_circles"]
results = {label: bool(pred) for label, pred in zip(labels, prediction)}

print("🧪 Predicted skin concerns:")
print(results)
