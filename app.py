from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS, cross_origin

app = Flask(__name__)

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
    if not url:
        return jsonify({"error": "No URL provided"}), 400

    if data is None:
        return jsonify({"error": "Data not loaded"}), 500

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
