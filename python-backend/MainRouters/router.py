from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse, StreamingResponse
from PIL import Image
import io
import base64


from ultralytics import YOLO
from cv.nn import core
import cv2
model = YOLO('cv/models/good-bad_v1.pt')



app = FastAPI()
router = APIRouter(tags=["Model"])

@router.post("/process-image")
async def process_image(file: UploadFile = File(...)):
    try:
        # + get draw_style from request

        # save image
        results = core.process(
            image_path=None, # path to saved image or add bytes transfer
            model=model,
            draw_style=1 # 0 = colored boxes, 1 = colored boxes with class and confidence
        )
        
        # status: results -> result
        # objects: results -> data -> objects list [[class, confidence], ...]
        # image: results -> image


    except Exception as e:
        raise HTTPException(status_code=400, detail=e) from e

app.include_router(router)
