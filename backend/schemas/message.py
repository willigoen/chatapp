from pydantic import BaseModel
from datetime import datetime

class MessageCreate(BaseModel):
    content: str
    channel_id: int

class MessageResponse(BaseModel):
    id: int
    content: str
    sender_id: int
    channel_id: int
    timestamp: datetime 