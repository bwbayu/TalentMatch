from flask import Flask, request, jsonify
from flask_cors import CORS
from pypdf import PdfReader
from docx import Document
from dotenv import load_dotenv
import os
import numpy as np
from preprocessing import preprocessing_data
from sentence_transformers import SentenceTransformer, util
from pymilvus import (
    Collection, 
    connections,
)

app = Flask(__name__)
CORS(app, origins='*')

# upload
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXTENSIONS = {'pdf', 'docx'}

# load env
load_dotenv()
COLLECTION_NAME = os.getenv('COLLECTION_NAME')
ZILLIZ_API_KEY = os.getenv('ZILLIZ_API_KEY')
ZILLIZ_URI = os.getenv('ZILLIZ_URI')
print("load key done")

# load model and milvus
# model_sbert = SentenceTransformer("model/sbert_model")
model_sbert = SentenceTransformer("bwbayu/sbert_model_jobcv")
connections.connect("default", uri=ZILLIZ_URI, token=ZILLIZ_API_KEY)
collection = Collection(COLLECTION_NAME)
print("load model and milvus done")

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
        return jsonify({'text': text})

@app.route('/search', methods=['POST'])
def search():
    input_text = request.json.get("resume")
    print("input masuk")
    # preprocessing
    preprocessed_resume = preprocessing_data(input_text)

    # Convert to embeddings SBERT
    resume_embedding = model_sbert.encode(preprocessed_resume, convert_to_tensor=False)
    print("embedding done")

    # query vector db
    search_params = {"metric_type": "COSINE", "params": {"nprobe": 10}}
    results = collection.search(
        data=[resume_embedding],
        anns_field="vector",
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

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        resume = request.json.get("resume")
        jobDesc = request.json.get("jobDesc")
        print("input done")

        # preprocessing and convert to embeddings resume
        preprocessed_resume = preprocessing_data(resume)
        # preprocessing and convert to embeddings job description
        preprocessed_jd = preprocessing_data(jobDesc)

        # Convert to embeddings SBERT
        resume_embedding = model_sbert.encode(preprocessed_resume, convert_to_tensor=False)
        print("embedding resume done")
        # Convert to embeddings SBERT
        jd_embedding = model_sbert.encode(preprocessed_jd, convert_to_tensor=False)
        print("embedding job desc done")

        # calculate similarity score SBERT
        similarity_score = util.pytorch_cos_sim(resume_embedding, jd_embedding).item()

        similarity_score = float(similarity_score)
        print("similarity score:", similarity_score)

        # Return the similarity score
        return jsonify({"similarity": similarity_score})
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/')
def index():
    return "reload complete"

if __name__ == "__main__":
    app.run(debug=True)