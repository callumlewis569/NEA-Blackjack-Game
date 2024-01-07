# Main Flask application file
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/play')
def play():
    return render_template('board.html')
