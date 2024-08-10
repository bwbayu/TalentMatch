from flask import Flask, request, jsonify
from flask_cors import CORS
from pypdf import PdfReader
from docx import Document
import os

app = Flask(__name__)
CORS(app, origins='*')
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXTENSIONS = {'pdf', 'docx'}

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    print("read pdf")
    if 'pdf' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['pdf']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)

        text = ''
        try:
            if file.filename.lower().endswith('.pdf'):
                # Read PDF
                reader = PdfReader(filepath)
                for page in reader.pages:
                    text += page.extract_text()
            elif file.filename.lower().endswith('.docx'):
                # Read Word Document
                doc = Document(filepath)
                for paragraph in doc.paragraphs:
                    text += paragraph.text + '\n'
            else:
                return jsonify({'error': 'Unsupported file type'}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            os.remove(filepath)
        print("text pdf/word", text)
        return jsonify({'text': text})

@app.route('/')
def index():
    return "reload complete"

if __name__ == "__main__":
    app.run(debug=True, port=5000)