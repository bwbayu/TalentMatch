# Init Flask
1. cd server
2. virtualenv env
3. env\Scripts\activate
4. pip install -r requirements.txt
5. flask run

# Init vite react
(install nodejs)
1. cd client
2. npm install --legacy-peer-deps
3. npm run dev

# Link Dataset [https://huggingface.co/datasets/bwbayu/job_cv_supervised]
1. job description in indonesian : https://www.kaggle.com/datasets/canggih/jog-description-and-salary-in-indonesia
2. it job description : https://www.kaggle.com/datasets/mscgeorges/itjobpostdescriptions?resource=download
3. resume 1 : https://www.kaggle.com/datasets/gauravduttakiit/resume-dataset
4. resume 2 : https://huggingface.co/datasets/InferencePrince555/Resume-Dataset
5. job description - resume pair : https://huggingface.co/datasets/cnamuangtoun/resume-job-description-fit 

# Link Model
https://huggingface.co/bwbayu/sbert_model_jobcv/tree/main

# Task UI
- CI/CD
- domain

# Deploy Flask to Cloud Run
1. create Dockerfile and .dockerignore
2. gcloud init
3. gcloud run deploy --source .
4. setting env -> service detail -> edit & deploy new revision -> variables & secrets
5. update memory -> service detail -> edit & deploy new revision -> resources

# Deploy React on Cloud Run
1. npm run build
2. create Dockerfile, .dockerignore, nginx.conf
3. gcloud init
4. gcloud run deploy --source .