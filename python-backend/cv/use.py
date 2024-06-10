from ultralytics import YOLO
from nn import core
import cv2



model = YOLO('cv/models/good-bad_v1.pt')


results = core.process(
    image_path='cv/testing/bad-crack.jpg',
    model=model,
    draw_style=1 # 0 = colored boxes, 1 = colored boxes with class and confidence, 2 = ...
)


print(results['result'], results['data']['objects'])

cv2.imwrite('cv/result.jpg', results['image'])

# from python-backend/