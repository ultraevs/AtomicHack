import base64
import json
import logging
import os
from io import BytesIO

from aiogram import Bot, types, Router, F
from aiogram import Dispatcher
from aiogram.client.session import aiohttp
from aiogram.client.session.aiohttp import ClientSession
from aiogram.filters import CommandStart, Command
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.types import WebAppInfo, ContentType, MenuButtonWebApp
from dotenv import load_dotenv

load_dotenv()
API_TOKEN = os.getenv('TOKEN')
API_URL = "https://atomic.shmyaks.ru/cv/check"

logging.basicConfig(level=logging.INFO)

bot = Bot(token=API_TOKEN)
storage = MemoryStorage()
dp = Dispatcher(storage=storage)
router = Router()


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
            result = {
                "result": response_json["result"],
                "objects": response_json["objects"]
            }
            return result


# Обработка полученного фото
@router.message(F.content_type == ContentType.PHOTO)
async def handle_photo(message: types.Message):
    photo = message.photo[-1]
    file_info = await bot.get_file(photo.file_id)

    photo_bytes = BytesIO()
    await bot.download_file(file_info.file_path, destination=photo_bytes)

    photo_base64 = base64.b64encode(photo_bytes.getvalue()).decode('utf-8')

    response = await send_photo_to_api(photo_base64)
    await message.reply(str(response))

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
