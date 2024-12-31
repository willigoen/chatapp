from fastapi import APIRouter, WebSocket, Depends
from services.chat import manager
from services.auth import get_current_user
from models.user import User
from models.message import Message
from database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/chat", tags=["chat"])

@router.websocket("/ws/{channel_id}")
async def websocket_endpoint(websocket: WebSocket, channel_id: int, db: Session = Depends(get_db)):
    await manager.connect(channel_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(channel_id, f"Echo: {data}")
    except Exception as e:
        manager.disconnect(channel_id, websocket)
        await websocket.close() 