from pydantic import BaseModel
from datetime import datetime

class ServerCreate(BaseModel):
    name: str

class ServerResponse(BaseModel):
    id: int
    name: str
    owner_id: int

# Alias para ServerOut
ServerOut = ServerResponse

class ChannelCreate(BaseModel):
    name: str
    server_id: int

class ChannelResponse(BaseModel):
    id: int
    name: str
    server_id: int

# Alias para ChannelOut
ChannelOut = ChannelResponse 