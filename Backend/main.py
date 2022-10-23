# To run: flask --app main run

import os

from flask import Flask, request, jsonify
from productsearch import get_products

app = Flask(__name__)


@app.route("/generate", methods=["POST"])
def _generate():

    data = request.get_json()

    shirt = data["shirt"]
    pants = data["pants"]
    image = data["image"]

    # Post your code here

    return jsonify({}), 200


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
