from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
import os
from openai import OpenAI
from dotenv import load_dotenv
import logging

load_dotenv()
app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
CORS(app, origins=['http://localhost:3000'])


client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))



@app.before_request
def basic_authentication():
    if request.method.lower() == 'options':
        return Response()
    
@app.route('/api/analyze-image', methods=['POST'])


def analyze_image():
    try:
      data = request.get_json()
      base64_image = data['image']
      response = client.chat.completions.create(
          model="gpt-4o",
          messages=[
              {"role": "system", "content": "You are a helpful assistant that responds with good answers"},
              {"role": "user", "content": [
                  {"type": "text", "text": "What's in this image?"},
                  {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{base64_image}"}}
              ]}
          ],
          max_tokens=300
      )
      print(response)
      return jsonify({"description": response.choices[0].message.content})
    except Exception as e:
      logging.error("Failed to process image: ", exc_info=True)
      return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)