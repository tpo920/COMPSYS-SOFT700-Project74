from transformers import T5ForConditionalGeneration, T5Tokenizer
from flask_cors import CORS, cross_origin
from flask import Flask, request
import torch
import json
from lrml import *

app = Flask(__name__)
CORS(app)

model_path = 'sffc348/t5-base-lrml-autocomplete'
model = T5ForConditionalGeneration.from_pretrained('sffc348/t5-base-lrml-autocomplete', use_safetensors=True)
model.eval()

tokenizer_name = 't5-base'

def load_tokenizer():
    tokenizer = T5Tokenizer.from_pretrained(tokenizer_name)
    tokenizer.add_tokens(['<sep>'], special_tokens=True)
    tokenizer.sep_token = '<sep>'
    tokenizer.sep_token_id = tokenizer.convert_tokens_to_ids(
        tokenizer.sep_token)
    return tokenizer

tokenizer = load_tokenizer()

# Preprocessing of text
def normalise_text(text):
    text = text.strip()
    if text and text[-1] != '.':
        text += '.'
    return text

# Functions for postprocessing
def post_process(lrml):
    lrml = lrml.strip()
    # lrml = lrml[lrml.find('if('):]
    lrml = lrml.replace('[', '(').replace(']', ')').replace(
        '{', '(').replace('}', ')')
    lrml = lrml.replace(').', ')')
    lrml = fix_then(lrml, ' ')
    lrml = revert_tree_based_spacing(lrml)
    lrml = add_space_after_comma(lrml)

    return lrml

def clean_pred(lrml):
    prefix = ''
    lrml = lrml.replace(', ', ',')
    lrml = reverse_loop(lrml, prefix=prefix)
    lrml = reverse_resolve_expressions(lrml, fix_errors=True, prefix=prefix)
    lrml = reverse_combine_rel_and_var(lrml, prefix=prefix)
    lrml = reverse_move_and_or_to_data_node(lrml)
    lrml = reverse_units(lrml, prefix=prefix)
    return lrml

# Generate a prediction based on the input text and the LRML
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

        predictedText = [post_process(i) for i in tokenizer.batch_decode(generation, skip_special_tokens=True)]
        cleanPredictedText = [clean_pred(i) for i in predictedText]
        return json.dumps(cleanPredictedText), 200, {'Content-Type': 'application/json; charset=utf-8'}
    else:
        return 'This is a LRML autocompletion tool. Please send a POST with "text" and "lrml" in the body.'
