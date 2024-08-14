from flask import Flask, request, jsonify
from flask_cors import CORS
from pypdf import PdfReader
from docx import Document
import os
from gensim.models.doc2vec import Doc2Vec
from preprocessing import preprocessing_data
from pymilvus import (
    connections,
    Collection,
)

app = Flask(__name__)
CORS(app, origins='*')

# upload
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXTENSIONS = {'pdf', 'docx'}

# load model
model = Doc2Vec.load("model/doc2vec_modelr30knoner.model")

# connect to milvus
connections.connect("default", host="localhost", port="19530")
collection = Collection("jobs_collection")
collection.load()

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

@app.route('/search', methods=['POST'])
def search():
    input_text = request.json.get("resume")
    print("input masuk")
    # preprocessing and convert to embeddings
    preprocessed_resume = preprocessing_data(input_text)
    resume_tokens = preprocessed_resume.split()
    resume_embedding = model.infer_vector(resume_tokens)
    print("embedding done")

    # query vector db
    search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
    results = collection.search(
        data=[resume_embedding],
        anns_field="embedding",
        param=search_params,
        limit=5,
        output_fields=["id", "title", "description"]
    )
    print("query done")

    # return data
    output = []
    for result in results[0]:
        output.append({
            "id": result.id,
            "title": result.entity.get("title"),
            "description": result.entity.get("description"),
            "distance": result.distance
        })
    
    return jsonify(output), 200


@app.route('/')
def index():
    return "reload complete"

if __name__ == "__main__":
    app.run(debug=True, port=5000)