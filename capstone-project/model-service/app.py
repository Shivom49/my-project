# Copyright (c) 2025 Shivom Parashari. All rights reserved.
# Unauthorized use, distribution, or modification of this file is prohibited.

from flask import Flask, request, jsonify
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

# Dummy user-item matrix
data = {
    'user_id': [1, 1, 1, 2, 2, 3, 3, 3],
    'item_id': [10, 11, 12, 10, 13, 11, 12, 14],
    'rating': [5, 4, 3, 4, 5, 2, 3, 4]
}
df = pd.DataFrame(data)
user_item_matrix = df.pivot_table(index='user_id', columns='item_id', values='rating').fillna(0)

# ------------------------------------------------------------
# Product Catalog (Updated for your current /images folder)
# ------------------------------------------------------------
product_catalog = {
    # Row 1 – Recommended for You (Electronics)
    10: {"name": "Laptop", "category": "Electronics", "image": "/images/laptop.jpg"},
    11: {"name": "Headphones", "category": "Electronics", "image": "/images/headphones.jpg"},
    12: {"name": "Smart TV", "category": "Electronics", "image": "/images/tv.jpg"},
    13: {"name": "Wireless Mouse", "category": "Electronics", "image": "/images/mouse.jpg"},
    14: {"name": "Gaming Keyboard", "category": "Electronics", "image": "/images/keyboard.jpg"},
    15: {"name": "Smart Watch", "category": "Electronics", "image": "/images/watch.jpg"},
    16: {"name": "RGB Desk Light", "category": "Gadgets", "image": "/images/rgblights.jpg"},
    17: {"name": "Cooling Pad", "category": "Accessories", "image": "/images/coolingpad.jpg"},
    18: {"name": "Phone Cooler", "category": "Accessories", "image": "/images/phonecooler.jpg"},
    19: {"name": "Projector", "category": "Electronics", "image": "/images/projector.jpg"},

    # Row 2 – Popular Now (Lifestyle & Fashion)
    20: {"name": "Sneakers", "category": "Fashion", "image": "/images/sneakers.jpg"},
    21: {"name": "Jacket", "category": "Fashion", "image": "/images/jacket.jpg"},
    22: {"name": "Sunglasses", "category": "Accessories", "image": "/images/glasses.jpg"},
    23: {"name": "Perfume", "category": "Lifestyle", "image": "/images/perfume.jpg"},
    24: {"name": "Cap", "category": "Fashion", "image": "/images/cap.jpg"},
    25: {"name": "Wallet", "category": "Accessories", "image": "/images/wallet.jpg"},
    26: {"name": "Cup", "category": "Lifestyle", "image": "/images/cup.jpg"},
    27: {"name": "Backpack", "category": "Accessories", "image": "/images/backpack.jpg"},
    28: {"name": "Phone", "category": "Electronics", "image": "/images/phone.jpg"},
    29: {"name": "Tablet", "category": "Electronics", "image": "/images/tablet.jpg"},

    # Row 3 – Tech Setup Essentials (Gaming / Workspace)
    30: {"name": "CPU Rig", "category": "Electronics", "image": "/images/cpu.jpg"},
    31: {"name": "Gaming Chair", "category": "Furniture", "image": "/images/chair.jpg"},
    32: {"name": "Gaming Controller", "category": "Gaming", "image": "/images/controller.jpg"},
    33: {"name": "Speakers", "category": "Electronics", "image": "/images/speakers.jpg"},
    34: {"name": "Desk Lamp", "category": "Gadgets", "image": "/images/lamp.jpg"},
    35: {"name": "Gaming Desk", "category": "Furniture", "image": "/images/table.jpg"},
    36: {"name": "Monitor", "category": "Electronics", "image": "/images/monitor.jpg"},
    37: {"name": "Touchpad", "category": "Accessories", "image": "/images/touchpad.jpg"},
    38: {"name": "Atomic Habits", "category": "Books", "image": "/images/atomic.jpg"},
    39: {"name": "RGB Keyboard & Setup", "category": "Electronics", "image": "/images/keyboard.jpg"},
}


# ------------------------------------------------------------
# Step 4: Routes
# ------------------------------------------------------------
@app.route('/')
def home():
    return jsonify({"message": "🎯 Recommender Model API is running..."})

@app.route('/health')
def health():
    return jsonify({"status": "Model OK"}), 200

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        user_id = data.get('user_id')

        if user_id not in user_item_matrix.index:
            return jsonify({"message": "User not found", "recommendations": []}), 404

        # Compute neighbors
        user_vector = user_item_matrix.loc[user_id].values.reshape(1, -1)
        distances, indices = model.kneighbors(user_vector, n_neighbors=2)
        similar_users = user_item_matrix.index[indices.flatten()].tolist()
        if user_id in similar_users:
            similar_users.remove(user_id)

        # Return all local images
        recommended_items = [product_catalog[i] for i in product_catalog]

        return jsonify({
            "message": "Recommendations generated successfully",
            "user_id": user_id,
            "similar_users": similar_users,
            "recommendations": recommended_items
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/update', methods=['POST'])
def update_data():
    try:
        data = request.json
        print(f"🟢 Received for retraining: {data}")
        return jsonify({"message": "Data received for retraining"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6060, debug=True)
