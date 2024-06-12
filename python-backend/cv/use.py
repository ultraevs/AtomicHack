from ultralytics import YOLO
from nn import core
import cv2
import base64
import numpy as np

def cv2_to_base64(image):
    _, buffer = cv2.imencode('.jpg', image)
    image_base64 = base64.b64encode(buffer).decode('utf-8')
    return image_base64

def base64_to_cv2(image_base64):
    image_data = base64.b64decode(image_base64)
    np_array = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    return image

model = YOLO('cv/models/good-bad_v1.pt')

image = cv2.imread('cv/testing/good.jpg')

image_base64 = cv2_to_base64(image)

results = core.process(
    image64=image_base64,
    model=model
)

# Вывод результатов
print(results['result'], results['objects'])

c = 0
for image_base64 in results['images']:
    c += 1
    image = base64_to_cv2(image_base64)
    cv2.imwrite(f'result{c}.jpg', image)
