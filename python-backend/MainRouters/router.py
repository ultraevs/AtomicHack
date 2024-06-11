import base64
import cv2
import numpy as np
from cv.nn import core
from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from ultralytics import YOLO

model = YOLO('cv/models/good-bad_v1.pt')

app = FastAPI()
router = APIRouter(tags=["Model"])


class ImageData(BaseModel):
    image: str


@router.post("/process-image")
async def process_image(data: ImageData):
    try:
        image = base64_to_cv2(data.image)

        results = core.process(
            image=image,
            model=model
        )

        result1_path = './result1.jpg'
        result2_path = './result2.jpg'

        # преобразуем изображения в base64
        result1_base64 = image_to_base64(result1_path)
        result2_base64 = image_to_base64(result2_path)

        # формируем ответ
        return {"result1": result1_base64, "result2": result2_base64}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


app.include_router(router)


def base64_to_cv2(image_base64):
    image_data = base64.b64decode(image_base64)
    np_array = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    return image


def image_to_base64(image_path):
    with open(image_path, 'rb') as image_file:
        image_base64 = base64.b64encode(image_file.read()).decode('utf-8')
    return image_base64
