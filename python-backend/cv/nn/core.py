from ultralytics import YOLO
import cv2, base64
import numpy as np

def process(image64, model, colorcode=None, conf=None):
    """
    This function processes an image, detects objects, and draws bounding boxes with labels.

    Parameters:
    image64 (str): The base64 encoded image.
    model (YOLO): The YOLO model for object detection.
    colorcode (dict, optional): The color code for each class. Being automatically generated if not provided.
    conf (float, optional): The confidence threshold for object detection. Defaults to 0.6.

    Returns:
    dict: A dictionary containing the result, objects, and images.
    """
    if not is_base64_image(image64):
        return {'result': 'not an image', 'objects': [], 'images': [image64]*3}

    image = base64_to_cv2(image64)

    classnames = model.model.names
    classnames_values = list(model.model.names.values())
    
    if colorcode is None or len(colorcode)!= len(classnames):
        colorcode = assign_colors_to_classes(generate_colors(len(classnames)), classnames)

    result = detect_(image, model, classnames_values, conf)

    return_ = []
    images_ = []

    if len(result) > 0:
        for obj in result:
            return_.append([obj[0], obj[1]])

        for draw_style in range(3):
            cloned_image = image.copy()
            for obj in result:
                cloned_image = draw(cloned_image, obj[2], draw_style, colorcode, obj[0], obj[1])
            images_.append(image_to_base64(cloned_image))
        result_ = 'success'

    else:
        return_ = []
        images_ = [image_to_base64(image)]*3
        result_ = 'objects were not found'

    final = {
        'result': result_,
        'objects': return_,
        'images': images_
    }

    return final

def detect_(image, model, classname_values, conf=0.6):
    results = model(image, save=False, verbose=True, conf=conf)
    
    res = []

    # class, conf, xyxyn
    for result in results:
        for i in range(len(result)):
            class_ = int(result.boxes.cls[i])
            conf = str(result.boxes.conf[i].item())[:5]
            xyxyn = result.boxes.xyxyn[i].tolist()
            res.append([classname_values[class_], conf, xyxyn])

    return res


def draw(image, xyxyn, draw_style, colorcode, class_, conf):
    height, width, _ = image.shape

    x1 = int(xyxyn[0] * width)
    y1 = int(xyxyn[1] * height)
    x2 = int(xyxyn[2] * width)
    y2 = int(xyxyn[3] * height)
    cv2.rectangle(image, (x1, y1), (x2, y2), colorcode[class_], 2)
    
    if draw_style == 0:
        add_legend(image, colorcode)
        
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
    
    elif draw_style == 2:
        alpha = float(conf)
        overlay = image.copy()
        cv2.rectangle(overlay, (x1, y1), (x2, y2), colorcode[class_], -1)
        cv2.addWeighted(overlay, alpha, image, 1 - alpha, 0, image)
        text = f'{class_}: {conf}'
        font = cv2.FONT_HERSHEY_SIMPLEX
        font_scale = 1
        color = (255, 255, 255)
        thickness = 1
        text_size, _ = cv2.getTextSize(text, font, font_scale, thickness)
        text_x = x1
        text_y = y1 - 10
        offset = 5

        cv2.rectangle(image, (text_x-offset, text_y - text_size[1]-offset), (text_x+offset + text_size[0], text_y+offset), (32, 32, 32), cv2.FILLED)

        cv2.putText(image, text, (text_x, text_y), font, font_scale, color, thickness)
    
    return image

def add_legend(image, colorcode):
    start_x = 10
    start_y = 10
    square_size = 20
    padding = 5
    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 0.5
    color = (255, 255, 255)
    thickness = 1

    for idx, (class_name, class_color) in enumerate(colorcode.items()):
        top_left = (start_x, start_y + idx * (square_size + padding))
        bottom_right = (start_x + square_size, start_y + square_size + idx * (square_size + padding))
        cv2.rectangle(image, top_left, bottom_right, class_color, -1)
        cv2.putText(image, class_name, (start_x + square_size + padding, start_y + square_size - padding + idx * (square_size + padding)), font, font_scale, color, thickness)

def image_to_base64(image):
    _, buffer = cv2.imencode('.jpg', image)
    image_base64 = base64.b64encode(buffer).decode('utf-8')
    return image_base64

def base64_to_cv2(image_base64):
    image_data = base64.b64decode(image_base64)
    np_array = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    return image

def generate_colors(n):
    if n <= 0:
        return []

    colors = set()
    i = 0
    while len(colors) < n:
        r = (i * 53) % 256
        g = (i * 97) % 256
        b = (i * 173) % 256
        if (r, g, b) != (0, 0, 0) and (r, g, b) != (255, 255, 255):
            colors.add((r, g, b))
        i += 1
    return list(colors)

def assign_colors_to_classes(colors, class_dict):
    class_colors = {}
    for i, (class_key, class_name) in enumerate(class_dict.items()):
        if i < len(colors):
            class_colors[class_name] = colors[i]
        else:
            class_colors[class_name] = colors[-1]
    return class_colors

def is_base64_image(data):
    try:
        base64_bytes = base64.b64decode(data, validate=True)
        if base64_bytes.startswith((b'\xff\xd8', b'\x89PNG', b'GIF')):
            return True
    except (base64.binascii.Error, ValueError):
        pass
    return False