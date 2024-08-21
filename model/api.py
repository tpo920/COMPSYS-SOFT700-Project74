from flask_cors import CORS, cross_origin
from flask import Flask, request
import torch
import json
from lrml_model import *

app = Flask(__name__)
CORS(app)

# Load tokenizer from model
tokenizer = load_tokenizer()

# This POST method takes in {text, lrml} and returns a json array of prediction
# responses
@app.route("/predict", methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        text = request.form['text']
        lrml = request.form['lrml']
        print(text, lrml)
        num_beams = 5
        num_return_sequences = 5
        no_repeat_ngram_size = 8
        max_length = 256
        early_stopping = True
        if lrml.strip() != '':
            lrml = '<sep>' + lrml
        else:
            lrml = ''
        tokens = tokenizer('translate English to LegalRuleML: ' +
                                normalise_text(text) + lrml, return_tensors='pt')
        with torch.no_grad():
            generation = model.generate(inputs=tokens.input_ids, max_length=max_length, num_beams=num_beams,
                                                num_return_sequences=num_return_sequences, early_stopping=early_stopping,
                                                no_repeat_ngram_size=no_repeat_ngram_size)

        predicted_text = [post_process(i) for i in tokenizer.batch_decode(generation, skip_special_tokens=True)]
        clean_predicted_text = [clean_pred(i) for i in predicted_text]
        return json.dumps(clean_predicted_text), 200, {'Content-Type': 'application/json; charset=utf-8'}
    else:
        return 'This is a LRML autocompletion tool. Please send a POST with "text" and "lrml" in the body.'