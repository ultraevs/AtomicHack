from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse, StreamingResponse
from PIL import Image
import io
import base64


from ultralytics import YOLO
from cv.nn import core
model = YOLO('cv/models/absurdly-ridiculously-ultimate-defect-detection-device-turboX-extreme-v9.99-megaX-ultrasecret-super-duper-squirrel-master-pro-tactical.pt')



app = FastAPI()
router = APIRouter(tags=["Model"])

@router.post("/process-image")
async def process_image(file: UploadFile = File(...)):
    try:
        
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))

        result = core.process(image_bytes, model)


    except Exception as e:
        raise HTTPException(status_code=400, detail="An error occured") from e

app.include_router(router)
