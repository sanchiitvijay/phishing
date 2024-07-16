from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS, cross_origin
from feature_extractor import *
app = Flask(__name__)
import joblib
import numpy as np

# Load the data from the pkl file
try:
    with open('phishing.pkl', 'rb') as f:
        data = pickle.load(f)
except FileNotFoundError:
    data = None
cors = CORS(app)

@app.route('/predict', methods=['POST'])
def process_url():
    print("--------------------");
    url = request.json.get('url')
    print(url)
    # Extract features from the new data
    features = extract_url_features(url)
    new_data = np.array(features).reshape(1, -1)

    # Load the trained model
    print("---------------------")
    classifier = joblib.load('randomForest.pkl')
    print("---------------------")

    # Predict the class for the new data
    prediction = classifier.predict(new_data)
    print("---------------------")
    data = "abc" 
    # Print the predicted class
    if prediction[0]==1:
        print("Phishy URL")
        data = "Phishy Url"
    else:
        print(f"Legitimate URL")
        data = "Legitimate Url"
    # if not url:
    #     return jsonify({"error": "No URL provided"}), 400

    # if data is None:
    #     return jsonify({"error": "Data not loaded"}), 500

    # Example processing logic: here you can process the URL as needed
    # For now, we simply return the URL and loaded data
    processed_result = {
        "input_url": url,
        "data": data,
        "message": "Processed successfully"
    }
    
    return jsonify(processed_result)


if __name__ == '__main__':
    app.run(debug=True)
