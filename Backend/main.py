# To run: flask --app main run

import os
import replicate
from flask import Flask, request, jsonify
import os
import requests
import base64 
from PIL import Image

os.environ['REPLICATE_API_TOKEN'] = '37452f1f1f6c31a1ab66ce785166168133f2e0b0'
from flask_cors import CORS
from productsearch import get_products

app = Flask(__name__)


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
    with open("Backend/image.png", "wb") as f:
        f.write(png_recovered)
        
    print("Running prediction...")
    output = model.predict(prompt=prompt, init_image=open("Backend/image.png", "rb"), mask=open("Backend/mask_y.png", "rb") if only_shirt else open("Backend/mask.png", "rb"), seed=2)

    r = requests.get(output[0])
    with open("Backend/output.png", "wb") as f:
        f.write(r.content)
        
    # use the mask to merge the output with the input image with output.png
    # return the merged image
    # input_image = Image.open("Backend/image.png")
    # output_image = Image.open("Backend/output.png")    
    # mask_image = Image.open("Backend/mask.png")
    
    # output_image = Image.composite(output_image, input_image, mask_image)
    
    # with open("Backend/output.png", "wb") as f:
        # output_image.save(f)
    
    # encode the image to base64
    # with open("Backend/output.png", "rb") as f:
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
