from ultralytics import YOLO
from nn import core
import cv2
import base64
import numpy as np

def image_to_base64(image_path):
    try:
        with open(image_path, "rb") as img_file:
            img_data = img_file.read()
            img_base64 = base64.b64encode(img_data).decode('utf-8')
            return img_base64
    except FileNotFoundError:
        print(f"File '{image_path}' not found.")
        return None
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None


model = YOLO('cv/models/good-bad_v1.pt')


image_base64 = image_to_base64('cv/testing/bad.jpg')

results = core.process(
    image64=image_base64,
    model=model,
    colorcode={'bad': (0, 0, 255), 'good': (0, 255, 0)},
    conf=0.65
)

print(results)

for i, base64_str in enumerate(results['images'], 1):
    img_data = base64.b64decode(base64_str)
    filename = f"result_{i}.jpg"
    with open(filename, 'wb') as f:
        f.write(img_data)
