from transformers import T5ForConditionalGeneration, T5Tokenizer
from lrml import *

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
