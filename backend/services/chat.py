from fastapi import WebSocket
from typing import Dict, List
from models.user import User
from models.message import Message
from database import SessionLocal

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, List[WebSocket]] = {}

    async def connect(self, channel_id: int, websocket: WebSocket):
        await websocket.accept()
        if channel_id not in self.active_connections:
            self.active_connections[channel_id] = []
        self.active_connections[channel_id].append(websocket)

    def disconnect(self, channel_id: int, websocket: WebSocket):
        self.active_connections[channel_id].remove(websocket)

    async def broadcast(self, channel_id: int, message: str):
        if channel_id in self.active_connections:
            for connection in self.active_connections[channel_id]:
                await connection.send_text(message)

manager = ConnectionManager() 