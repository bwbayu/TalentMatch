# Job-CV Matching System with Vector Search

This project is an AI-powered job matching web application aimed at helping job seekers, especially in the IT industry, find suitable job opportunities based on their skills. The system leverages vector search technology to match resumes with job descriptions effectively.

## Features
- **Job Matching via Vector Search**: Matches candidates' resumes with job descriptions using vector embeddings.
- **Resume Upload**: Users can upload their resumes in various formats.
- **Top Job Recommendations**: The system retrieves and displays the top 5 most similar job descriptions.
- **High-Quality Embeddings**: Utilizes a fine-tuned model to ensure accurate and relevant job matching.
- **Scalable and Fast Search**: Supports fast similarity searches even with large datasets.

## Workflow
1. **Data Collection**: Various datasets related to job descriptions and resumes were collected from Kaggle and Hugging Face.
2. **Preprocessing**: Job descriptions and resumes were preprocessed and converted into embeddings using the SBERT model.
3. **Vector Storage**: The preprocessed job descriptions were stored as vectors in the Milvus vector database.
4. **Job Matching**: When a user uploads a resume, it is converted into a vector using the SBERT model, and the system retrieves the top 5 most similar job descriptions based on cosine similarity.
5. **Results Display**: The matched job descriptions are presented to the user.

## Website Interface
### Resume Upload Page
Users can upload or paste their resumes on this page.

![Resume Upload Page]

### Results Page
This page displays the top 5 job descriptions that match the uploaded resume.

![Results Page]

## Datasets
The following datasets were used for fine-tuning the model and building the vector database:

| Source | Number of Entries | Column Descriptions |
|--------|-------------------|---------------------|
| [Kaggle - Job Description and Salary in Indonesia](https://www.kaggle.com/datasets/canggih/jog-description-and-salary-in-indonesia) | 34,746 | job_title, location, salary_currency, career_level, experience_level, education_level, employment_type, job_function, job_benefits, company_process_time, company_size, company_industry, job_description, salary |
| [Kaggle - IT Job Post Descriptions](https://www.kaggle.com/datasets/mscgeorges/itjobpostdescriptions?resource=download) | 10,000 | query, job title, description |
| [Kaggle - Resume Dataset](https://www.kaggle.com/datasets/gauravduttakiit/resume-dataset) | 962 | category, resume |
| [Hugging Face - Resume-Job Description Fit](https://huggingface.co/datasets/cnamuangtoun/resume-job-description-fit) | 8,000 | resume_text, job_description_text, label (fit, not fit, potential) |
| [Hugging Face - Resume Dataset](https://huggingface.co/datasets/InferencePrince555/Resume-Dataset) | 32,481 | instruction, resume_text |


## Technology Stack
- **Frontend**: ReactJS (Vite)
- **Backend**: Flask
- **Model**: Sentence-BERT (SBERT)
- **Vector Database**: Zilliz Milvus
- **Deployment**: Docker, GCP Cloud Run

## Dataset and Model
- **Link Dataset** : https://huggingface.co/datasets/bwbayu/job_cv_supervised
- **Link Model** : https://huggingface.co/bwbayu/sbert_model_jobcv/tree/main
