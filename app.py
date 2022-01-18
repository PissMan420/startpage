from bs4 import BeautifulSoup
import utils
import requests
from rich import print, inspect
from urllib.parse import urlparse, urljoin
from flask import (
    Flask,
    render_template,
    abort,
    make_response
)
from rich.console import Console

console = Console(stderr=True)
print = console.print
app = Flask(__name__)

@app.route('/')
def index():
    name = 'Aurélie' # TODO: Get that off of an config file or from a database.
    bg_image = 'static/forest-background-1.jpg'
    return render_template('index.html', name=name,
                           bg_image=bg_image)

@app.get('/favicon/<website>')
def favicon(website: str):
    if website.startswith(('http', 'https')):
        return (400, 'Website must not be starting with http or https' ,{})
    if not utils.test(r'\.\w+$', website):
        response = make_response()
        response.status_code = 400
        response.data = "Could not parse website. Website must match this regex: r'\\.\\w+$"
        return response

    favicon_res = requests.get(f'http://{website}/favicon.ico')
    response = make_response()
    if favicon_res.status_code != 200 or not favicon_res.headers['Content-Type'].startswith('image'):
        favicon_res = requests.get(f'https://{website}/favicon.ico' )
    if favicon_res.status_code != 200 or not favicon_res.headers['Content-Type'].startswith('image'):
        # find it via the link[rel=icon] tag
        soup = BeautifulSoup(requests.get(f'http://{website}').text, 'html.parser')
        icon_tag = soup.find('link', rel='icon')
        if icon_tag:
            icon_url = icon_tag.get('href')
            if icon_url:
                favicon_res = requests.get(urljoin(f'http://{website}', icon_url))
    if not favicon_res.headers['Content-Type'].startswith('image') or favicon_res.status_code != 200:
        response.status_code = 400
        response.data = 'Could not find icon'
    else:
        response.headers.set('Content-Type', 'image/x-icon')
        response.data = favicon_res.content
        response.status = 200
        response.headers['X-Content-Type'] = 'nosniff'
    return response

if __name__ == '__main__':
    app.run(debug=True, port=8080)