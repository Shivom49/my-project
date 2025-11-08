# Copyright (c) 2025 Shivom Parashari. All rights reserved.
# Unauthorized use, distribution, or modification of this file is prohibited.

import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors
import pickle

# ------------------------------------------------------------
# Step 1: Dummy dataset (User-Item Ratings)
# ------------------------------------------------------------
data = {
    'user_id': [1, 1, 1, 2, 2, 3, 3, 3],
    'item_id': [10, 11, 12, 10, 13, 11, 12, 14],
    'rating':  [5, 4, 3, 4, 5, 2, 3, 4]
}

df = pd.DataFrame(data)

# Create user-item matrix
user_item_matrix = df.pivot_table(index='user_id', columns='item_id', values='rating').fillna(0)

# ------------------------------------------------------------
# Step 2: Train Collaborative Filtering Model (KNN)
# ------------------------------------------------------------
model = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=3)
model.fit(user_item_matrix)

# ------------------------------------------------------------
# Step 3: Save Model using Pickle
# ------------------------------------------------------------
with open("recommender.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model trained successfully and saved as 'recommender.pkl'")
