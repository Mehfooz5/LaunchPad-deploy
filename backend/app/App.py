from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import google.generativeai as genai
import re
import requests
import tempfile
from PyPDF2 import PdfReader
from dotenv import load_dotenv
import base64

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure Gemini AI
api_key = os.getenv('GOOGLE_API_KEY')
if not api_key:
    raise ValueError("API key not found. Please set GOOGLE_API_KEY in your .env file")

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route('/generate-signed-url', methods=['GET'])
def generate_signed_url():
    file_url = request.args.get('fileName')
    if not file_url:
        return jsonify({'error': 'No file URL provided'}), 400
    try:
        return jsonify({'signedUrl': file_url})
    except Exception as e:
        return jsonify({'error': f'Error generating signed URL: {str(e)}'}), 500

@app.route('/ask', methods=['POST'])
def ask():
    # Handle both JSON and form-data
    if request.is_json:
        data = request.get_json()
        question = data.get('question')
        pdf_base64 = data.get('pdfBase64')
        pdf_url = data.get('pdfUrl')
    else:
        question = request.form.get('question')
        pdf_url = request.form.get('pdfUrl')
        pdf_base64 = None
        if 'pdf' in request.files:
            pdf_file = request.files['pdf']
            pdf_base64 = base64.b64encode(pdf_file.read()).decode('utf-8')

    if not question:
        return jsonify({'answer': "Question is required"}), 400

    try:
        pdf_text = ""
        tmp_file_path = None
        
        # Handle PDF from base64
        if pdf_base64:
            pdf_bytes = base64.b64decode(pdf_base64)
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
                tmp_file.write(pdf_bytes)
                tmp_file_path = tmp_file.name
            
            reader = PdfReader(tmp_file_path)
            for page in reader.pages:
                pdf_text += page.extract_text() or ""
        
        # Handle PDF from URL
        elif pdf_url:
            pdf_response = requests.get(pdf_url)
            pdf_response.raise_for_status()
            
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
                tmp_file.write(pdf_response.content)
                tmp_file_path = tmp_file.name
            
            reader = PdfReader(tmp_file_path)
            for page in reader.pages:
                pdf_text += page.extract_text() or ""

        # Generate response
        prompt = f"Question: {question}\n\n"
        if pdf_text.strip():
            prompt += f"Document Content:\n{pdf_text}\n\nPlease answer based on the document."
        else:
            prompt += "Please answer based on your general knowledge."

        response = model.generate_content(prompt)
        cleaned = clean_response(response.text.strip())

        return jsonify({
            'answer': cleaned,
            'sources': pdf_url if pdf_url else None
        })

    except Exception as e:
        return jsonify({'answer': f"Error processing request: {str(e)}"}), 500
    finally:
        if tmp_file_path and os.path.exists(tmp_file_path):
            os.unlink(tmp_file_path)

def clean_response(text):
    """Clean and format the AI response"""
    text = re.sub(r'^#+\s*', '', text, flags=re.MULTILINE)
    text = re.sub(r'\*+', '', text)
    text = re.sub(r'<.*?>', '', text)
    text = re.sub(r'\n{2,}', '\n\n', text)
    text = re.sub(r'[ \t]+', ' ', text)
    return text.strip()

if __name__ == '__main__':
    app.run(debug=True, port=5000)