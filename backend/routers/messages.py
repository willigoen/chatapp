from fastapi import APIRouter, WebSocket
from models.base import Message

router = APIRouter()

@router.websocket("/ws/messages")
async def websocket_message(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        # Procesar y almacenar mensaje
        await websocket.send_text(f"Mensaje recibido: {data}") 