import os
import pandas as pd

image_folder = "../data"  # adjust as needed
output_csv = "../skin_labels.csv"

data = []

for fname in os.listdir(image_folder):
    if fname.lower().endswith((".jpg", ".jpeg")):
        name_no_ext = os.path.splitext(fname)[0]
        parts = name_no_ext.split("_")

        if len(parts) < 9:
            print(f"Skipping invalid filename: {fname}")
            continue

        try:
            acne = int(parts[-5])
            acne_marks = int(parts[-4])
            stains = int(parts[-3])
            wrinkles = int(parts[-2])
            dark_circles = int(parts[-1])
        except ValueError as e:
            print(f"Skipping {fname}: {e}")
            continue

        data.append({
            "filename": fname,
            "acne": acne,
            "acne_marks": acne_marks,
            "stains": stains,
            "wrinkles": wrinkles,
            "dark_circles": dark_circles
        })

df = pd.DataFrame(data)
df.to_csv(output_csv, index=False)
print(f"✅ Saved labels for {len(df)} images to {output_csv}")
