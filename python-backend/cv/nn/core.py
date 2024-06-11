from ultralytics import YOLO
import cv2

def process(image, model):
    colorcode = {'bad': (0, 0, 255), 'good': (0, 255, 0)}

    result = detect_(image, model)

    return_ = []
    images_ = []

    # debug data
    for obj in result:
        return_.append([obj[0], obj[1]])

    for draw_style in range(2):
        cloned_image = image.copy()
        for obj in result:
            cloned_image = draw(cloned_image, obj[2], draw_style, colorcode, obj[0], obj[1])
        images_.append(cloned_image)

    final = {
        'result': 'success',
        'objects': return_,
        'images': images_
    }

    return final

def detect_(image, model):
    results = model(image, save=False, verbose=False, conf=0.6)
    
    # class, conf, xyxyn
    res = [[['bad', 'good'][int(result.boxes.cls)], str(result.boxes.conf.tolist()[0])[:5], result.boxes.xyxyn.tolist()[0]] for result in results]

    return res

def draw(image, xyxyn, draw_style, colorcode, class_, conf):
    height, width, _ = image.shape

    x1 = int(xyxyn[0] * width)
    y1 = int(xyxyn[1] * height)
    x2 = int(xyxyn[2] * width)
    y2 = int(xyxyn[3] * height)
    cv2.rectangle(image, (x1, y1), (x2, y2), colorcode[class_], 2)
    
    if draw_style == 0:
        pass
        
    elif draw_style == 1:
        text = f'{class_}: {conf}'
        font = cv2.FONT_HERSHEY_SIMPLEX
        font_scale = 1
        color = colorcode[class_]
        thickness = 1
        text_size, _ = cv2.getTextSize(text, font, font_scale, thickness)
        text_x = x1
        text_y = y1 - 10
        offset = 5

        cv2.rectangle(image, (text_x-offset, text_y - text_size[1]-offset), (text_x+offset + text_size[0], text_y+offset), (32, 32, 32), cv2.FILLED)

        cv2.putText(image, text, (text_x, text_y), font, font_scale, color, thickness)

    return image