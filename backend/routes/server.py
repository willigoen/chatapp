from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.server import Server, Channel
from schemas.server import ServerCreate, ServerResponse, ChannelCreate, ChannelResponse
from services.auth import get_current_user
from models.user import User

router = APIRouter(prefix="/api/server", tags=["server"])

@router.post("/servers", response_model=ServerResponse)
def create_server(server: ServerCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_server = Server(name=server.name, owner_id=current_user.id)
    db.add(db_server)
    db.commit()
    db.refresh(db_server)
    return db_server

@router.post("/channels", response_model=ChannelResponse)
def create_channel(channel: ChannelCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_channel = Channel(name=channel.name, server_id=channel.server_id)
    db.add(db_channel)
    db.commit()
    db.refresh(db_channel)
    return db_channel 