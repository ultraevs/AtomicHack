from ultralytics import YOLO
from nn import core
import cv2



model = YOLO('cv/models/good-bad_v1.pt')

image = cv2.imread('cv/testing/good.jpg')

results = core.process(
    image=image,
    model=model
)


print(results['result'], results['objects'], results['images'])

c = 0
for image in results['images']:
    c += 1
    cv2.imwrite(f'result{c}.jpg', image)


# from python-backend/