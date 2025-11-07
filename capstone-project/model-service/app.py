from flask import Flask, request, jsonify
import numpy as np
import pickle
import pandas as pd

# ------------------------------------------------------------
# Step 1: Initialize Flask App
# ------------------------------------------------------------
app = Flask(__name__)

# ------------------------------------------------------------
# Step 2: Load Pickle Model
# ------------------------------------------------------------
with open("recommender.pkl", "rb") as f:
    model = pickle.load(f)

# Dummy user-item matrix for reference (same as training)
data = {
    'user_id': [1, 1, 1, 2, 2, 3, 3, 3],
    'item_id': [10, 11, 12, 10, 13, 11, 12, 14],
    'rating':  [5, 4, 3, 4, 5, 2, 3, 4]
}
df = pd.DataFrame(data)
user_item_matrix = df.pivot_table(index='user_id', columns='item_id', values='rating').fillna(0)

# ------------------------------------------------------------
# Step 3: Routes
# ------------------------------------------------------------
@app.route('/')
def home():
    return "🎯 Recommender Model API is running..."

# POST API for recommendations
@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        user_id = data.get('user_id')

        if user_id not in user_item_matrix.index:
            return jsonify({"message": "User not found", "recommendations": []}), 404

        # Get user vector and find nearest users
        user_vector = user_item_matrix.loc[user_id].values.reshape(1, -1)
        distances, indices = model.kneighbors(user_vector, n_neighbors=2)

        # Similar users
        similar_users = user_item_matrix.index[indices.flatten()].tolist()
        similar_users.remove(user_id) if user_id in similar_users else None

        return jsonify({
            "user_id": user_id,
            "similar_users": similar_users,
            "distances": distances.flatten().tolist()
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ------------------------------------------------------------
# Step 4: Run Flask App
# ------------------------------------------------------------
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=6000, debug=True)
