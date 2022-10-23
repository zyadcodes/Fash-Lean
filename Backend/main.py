# To run: flask --app main run

from productsearch import get_products
from flask_cors import CORS
import os
import replicate
from flask import Flask, request, jsonify
import os
import requests
import base64

os.environ['REPLICATE_API_TOKEN'] = '37452f1f1f6c31a1ab66ce785166168133f2e0b0'

app = Flask(__name__)
CORS(app)
model = replicate.models.get("andreasjansson/stable-diffusion-wip")


@app.route("/generate", methods=["POST"])
def _generate():

    data = request.get_json()

    shirt = data["shirt"]
    pants = data["pants"]
    image = data["image"]

    only_shirt = False
    if shirt and pants:
        prompt = f"A person wearing a {shirt} and {pants}"
    elif shirt:
        prompt = f"A person wearing {shirt}"
        only_shirt = True
    elif pants:
        prompt = f"A person wearing {pants}"
    else:
        return jsonify({"error": "No shirt or pants specified"})

    png_recovered = base64.b64decode(image)
    with open("image.png", "wb") as f:
        f.write(png_recovered)

    output = model.predict(prompt=prompt, init_image=open("image.png", "rb"), mask=open(
        "mask_y.png", "rb") if only_shirt else open("mask.png", "rb"), seed=2)

    r = requests.get(output[0])
    with open("output.png", "wb") as f:
        f.write(r.content)

    encoded_string = base64.b64encode(r.content)
    encoded_string = encoded_string.decode("utf-8")

    return jsonify({"image": encoded_string})


@app.route("/get_products", methods=["POST"])
def _get_products():

    data = request.get_json()

    shirt = data["shirt"]
    pant = data["pants"]

    # Post your code here
    shirts = get_products(shirt)
    pants = get_products(pant)

    return {"shirts": shirts, "pants": pants}, 200


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
