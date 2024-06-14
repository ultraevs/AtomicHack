import base64
import cv2
import numpy as np
from cv.nn import core
from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from ultralytics import YOLO

model = YOLO('cv/models/best.pt')

app = FastAPI()
router = APIRouter(tags=["Model"])


class ImageData(BaseModel):
    image: str


@router.post("/check")
async def process_image(data: ImageData):
    try:
        results = core.process(
            image64=data.image,
            model=model
        )

        # {
        #    'result': 'success',
        #    'objects': [[class, conf], ...],
        #    'images': ['base64'*3]
        # }
        return JSONResponse(content=results)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


app.include_router(router)