from flask import Flask, request, jsonify
from flask_cors import CORS
from pypdf import PdfReader
import os

app = Flask(__name__)
CORS(app, origins='*')
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    print("read pdf")
    if 'pdf' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['pdf']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)

        text = ''
        try:
            reader = PdfReader(filepath)
            for page in reader.pages:
                text += page.extract_text()
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            os.remove(filepath)
        print("text pdf", text)
        return jsonify({'text': text})

@app.route('/')
def index():
    return "reload complete"

if __name__ == "__main__":
    app.run(debug=True, port=5000)