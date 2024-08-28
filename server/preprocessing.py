import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from num2words import num2words
from deep_translator import GoogleTranslator

nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
nltk.download('punkt')
nltk.download('punkt_tab')

translator = GoogleTranslator(source='id', target='en')

def split_text(text, max_length):
    # Fungsi untuk membagi teks menjadi bagian yang lebih kecil
    words = text.split()
    parts = []
    current_part = []

    for word in words:
        if len(' '.join(current_part + [word])) <= max_length:
            current_part.append(word)
        else:
            parts.append(' '.join(current_part))
            current_part = [word]

    if current_part:
        parts.append(' '.join(current_part))

    return parts

def translate_batch(text, max_length=500):
    # Fungsi untuk menerjemahkan teks dalam batch
    parts = split_text(text, max_length)
    translated_parts = [translator.translate(part) for part in parts]
    return ' '.join(translated_parts)
    
def preprocessing_data(text):
  text = translate_batch(text)
  text = text.lower()

  text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
  text = re.sub(r'[^\w\s]', ' ', text)
  text = text.replace('s1', 'bachelor')
  text = text.replace('s2', 'master')
  text = text.replace('s3', 'doctorate')
  text = text.replace('d3', 'associate degree')
  text = text.replace('d4', 'professional degree')

  pattern = r'\b\d+\b'

  def replace_with_words(match):
      number = int(match.group())
      return num2words(number)

  text = re.sub(pattern, replace_with_words, text)

  text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
  text = text.replace('\n', ' ')
  text = text.replace('etc', ' ')

  stop_words = set(stopwords.words('english'))
  tokens = word_tokenize(text)
  tokens = [word for word in tokens if word not in stop_words]

  lemmatizer = WordNetLemmatizer()
  tokens = [lemmatizer.lemmatize(word) for word in tokens]

  preprocessed_text = ' '.join(tokens)

  return preprocessed_text

