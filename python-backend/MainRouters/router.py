from cv.nn import core
from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File
from ultralytics import YOLO
import base64, cv2
import numpy as np

model = YOLO('cv/models/good-bad_v1.pt')

app = FastAPI()
router = APIRouter(tags=["Model"])


@router.post("/process-image")
async def process_image(file: UploadFile = File(...)):
    try:
        image = base64_to_cv2(None) # сюда base64 с фронта добавь

        results = core.process(
            image=image,
            model=model
        )

        # status: results -> result
        # objects: results -> objects list [[class, confidence], ...]
        # images: results -> images -> images in cv2! format


        # response

    except Exception as e:
        raise HTTPException(status_code=400, detail=e) from e


app.include_router(router)

def base64_to_cv2(image_base64):
    image_data = base64.b64decode(image_base64)
    
    np_array = np.frombuffer(image_data, np.uint8)
    
    image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    
    return image