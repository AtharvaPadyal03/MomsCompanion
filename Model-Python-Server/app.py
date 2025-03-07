from flask import Flask, render_template, request
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image  # Corrected import
from tensorflow.keras.applications.resnet50 import preprocess_input
from flask import Flask, request, jsonify 


def predict_label(img_path):
    i = image.load_img(img_path, target_size=(224, 224))
    i = image.img_to_array(i)
    i = np.expand_dims(i, axis=0)
    i = preprocess_input(i)  #  Apply the same normalization as training
    return model.predict(i)

import numpy as np  # Needed for argmax
import os  # Useful for path handling

# Load the trained model
model = load_model("model.keras")
app = Flask(__name__)
# Mapping predictions to labels
d = {0: 'Abnormal', 1: 'Normal'}  # Corrected dictionary
# Function to predict label from an image
def predict_label(img_path):
    i = image.load_img(img_path, target_size=(224, 224))
    i = image.img_to_array(i)
    i = np.expand_dims(i, axis=0)
    i = preprocess_input(i)  # Apply the same normalization as training
    return model.predict(i)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')  # Render the form page

@app.route('/predict', methods=['POST'])
def predict():
    if 'img' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    img = request.files['img']
    img_path = os.path.join("static", img.filename)
    img.save(img_path)

    predicted_class, probabilities = predict_label(img_path)
    
    return jsonify({
        "prediction": predicted_class,
        "probabilities": probabilities,
        "img_path": img_path
    })

@app.route("/submit", methods=['GET', 'POST'])
def get_output():
    if request.method == 'POST':
        img = request.files['img']

        if img:
            img_path = os.path.join("static", img.filename)  # Ensure correct path
            img.save(img_path)

            p = predict_label(img_path)  # Get prediction
            print(f"Raw model output: {p}")  
            predicted_class = d[1] if p[0][1] > 0.5 else d[0]
            prediction_valid = p is not None and p.any()
            return jsonify({"predicted_class" : predicted_class})

    return jsonify({"prediction": "", "predicted_class" : ""})

if __name__ == '__main__':
    app.run(debug=True) 

