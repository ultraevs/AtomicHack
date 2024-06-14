import base64
import json
import logging
import os
from io import BytesIO

from aiogram import Bot, types, Router, F
from aiogram import Dispatcher
from aiogram.client.session import aiohttp
from aiogram.filters import CommandStart, Command
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.types import WebAppInfo, ContentType, MenuButtonWebApp, InlineKeyboardMarkup, InlineKeyboardButton, \
    InputFile, BufferedInputFile
from dotenv import load_dotenv

load_dotenv()
API_TOKEN = os.getenv('TOKEN')
API_URL = "https://atomic.shmyaks.ru/cv/check"

logging.basicConfig(level=logging.INFO)

bot = Bot(token=API_TOKEN)
storage = MemoryStorage()
dp = Dispatcher(storage=storage)
router = Router()

user_images = {}
user_selected_buttons = {}
user_results = {}


@router.message(CommandStart())
async def start_command(message: types.Message):
    await message.answer(text="Привет! Чтобы загрузить фото и получить результат напиши команду /check\n"
                              "Или используй наше приложение по кнопке 'Открыть'")


@router.message(Command(commands=["check"]))
async def check_command(message: types.Message):
    await message.answer("Пожалуйста, отправьте мне ваше фото.")


async def send_photo_to_api(photo_base64: str):
    async with aiohttp.ClientSession() as session:
        async with session.post(API_URL, json={'image': photo_base64}) as response:
            response_text = await response.text()
            response_json = json.loads(response_text)
            try:
                result = {
                    "result": response_json["result"],
                    "objects": response_json["objects"],
                    "images": response_json["images"]
                }
            except KeyError:
                result = {
                    "detail": response_json["detail"],
                }
            return result


@router.message(F.content_type == ContentType.PHOTO)
async def handle_photo(message: types.Message):
    photo = message.photo[-1]
    file_info = await bot.get_file(photo.file_id)

    photo_bytes = BytesIO()
    await bot.download_file(file_info.file_path, destination=photo_bytes)

    photo_base64 = base64.b64encode(photo_bytes.getvalue()).decode('utf-8')

    response = await send_photo_to_api(photo_base64)

    if "images" in response:
        images = response["images"]
        user_images[message.from_user.id] = images
        user_selected_buttons[message.from_user.id] = 0  # Инициализируем выбранную кнопку
        user_results[message.from_user.id] = response  # Сохраняем результат
        await send_image_with_buttons(message.chat.id, images, 0, message.from_user.id, response, message.message_id)
    else:
        await message.reply(str(response))


async def send_image_with_buttons(chat_id, images, index, user_id, response, message_id):
    image_data = base64.b64decode(images[index])
    photo = types.BufferedInputFile(BytesIO(image_data).getvalue(), filename=f"image_{index}.jpg")

    # Определяем текущее состояние кнопок для пользователя
    selected_button = user_selected_buttons.get(user_id, 0)
    buttons = []
    for i in range(len(images)):
        text = f"{i + 1} {'✅' if i == selected_button else ''}"
        buttons.append(InlineKeyboardButton(text=text, callback_data=f"image_{i}"))

    markup = InlineKeyboardMarkup(inline_keyboard=[buttons])

    # Форматируем текст
    result_text = response.get("result", "")
    objects = response.get("objects", [])

    # Преобразуем каждый объект в строку, если это список
    objects_text = "\n".join(
        [str(obj) if isinstance(obj, str) else json.dumps(obj, ensure_ascii=False) for obj in objects])

    caption = f"Result: {result_text}\nObjects:\n{objects_text}"

    # Отправляем новое сообщение с фото, кнопками и текстом
    await bot.send_photo(chat_id, photo, caption=caption, reply_markup=markup)


@router.callback_query(F.data.startswith("image_"))
async def handle_image_button(callback_query: types.CallbackQuery):
    index = int(callback_query.data.split('_')[1])
    user_id = callback_query.from_user.id

    if user_id in user_images:
        images = user_images[user_id]
        user_selected_buttons[user_id] = index  # Обновляем выбранную кнопку
        response = user_results[user_id]  # Получаем сохраненный результат

        await send_image_with_buttons(callback_query.message.chat.id, images, index, user_id, response,
                                      callback_query.message.message_id)

        # Удаляем старое сообщение
        await bot.delete_message(callback_query.message.chat.id, callback_query.message.message_id)
    else:
        await callback_query.answer("Изображения не найдены. Пожалуйста, повторите загрузку фото.")


dp.include_router(router)


async def set_webapp_menu(bot: Bot):
    web_app_info = WebAppInfo(url="https://atomic.shmyaks.ru")
    menu_button = MenuButtonWebApp(text="Открыть", web_app=web_app_info)
    await bot.set_chat_menu_button(menu_button=menu_button)


async def main():
    await set_webapp_menu(bot)
    await dp.start_polling(bot)


if __name__ == '__main__':
    import asyncio

    asyncio.run(main())
