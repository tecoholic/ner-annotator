import nltk

from flask import Flask, request
from flask_cors import cross_origin

from nltk.tokenize.treebank import TreebankWordTokenizer, TreebankWordDetokenizer

app = Flask(__name__)


@app.route("/tokenize", methods=["POST"])
@cross_origin()
def tokenize():
    text = request.json["text"]
    try:
        spans = list(TreebankWordTokenizer().span_tokenize(text))
    except LookupError:
        nltk.download('punkt')
        spans = list(TreebankWordTokenizer().span_tokenize(text))
    return {"tokens": [(s[0], s[1], text[s[0]:s[1]]) for s in spans]}


@app.route("/detokenize", methods=["POST"])
@cross_origin()
def detokenize():
    tokens = request.json["tokens"]
    return {"text": TreebankWordDetokenizer().detokenize(tokens)}



if __name__ == "__main__":
    app.run(port=5555, debug=True)
