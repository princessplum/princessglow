import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.multioutput import MultiOutputClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib

# Load data
X = np.load("../dino_embeddings.npy")
y = np.load("../dino_labels.npy")

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Build model
clf = MultiOutputClassifier(RandomForestClassifier(n_estimators=100, random_state=42))
clf.fit(X_train, y_train)

# Save training
joblib.dump(clf, "../skin_model.pkl")
print("✅ Model saved to skin_model.pkl")

# Predict
y_pred = clf.predict(X_test)

# Evaluate
print("\n🎯 Accuracy per label:")
for i, label in enumerate(["acne", "acne_marks", "stains", "wrinkles", "dark_circles"]):
    acc = accuracy_score(y_test[:, i], y_pred[:, i])
    print(f"  {label}: {acc:.2f}")

print("\n📊 Classification report (all labels):")
print(classification_report(y_test, y_pred, target_names=["acne", "acne_marks", "stains", "wrinkles", "dark_circles"]))
