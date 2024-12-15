from flask import Blueprint, request, jsonify
from model import predict_step

# Create a blueprint for prediction
predict = Blueprint('predict', __name__)

@predict.route('/predict', methods=['POST'])
def predict_route():
    # Expecting a JSON body with a key 'image_paths'
    data = request.get_json()
    image_paths = data.get('image_paths', [])
    userId = data.get('userId')

    if not image_paths:
        return jsonify({"error": "No image paths provided"}), 400

    predictions = predict_step(image_paths)
    return jsonify({"predictions": predictions,"userId":userId}), 200
