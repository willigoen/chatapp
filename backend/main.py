from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from settings import settings
from routes.auth import router as auth_router
from routes.server import router as server_router
from routes.chat import router as chat_router
from logger import logger

app = FastAPI()

# Configuración CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint básico
@app.get("/")
async def root():
    logger.info("Acceso al endpoint raíz")
    return {"message": "Bienvenido a ChatDAP"}

# Endpoint básico
@app.get("/api")
async def root():
    logger.info("Acceso al endpoint raíz")
    return {"message": "ChatDAP en puerto 5005 listo para múltiples plataformas"}

# WebSocket básico
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("Conexión WebSocket establecida")
    await websocket.send_text("Conexión WebSocket establecida")
    while True:
        data = await websocket.receive_text()
        logger.info(f"Mensaje recibido: {data}")
        await websocket.send_text(f"Echo: {data}")

# Incluir routers
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(server_router, prefix="/api/server", tags=["server"])
app.include_router(chat_router, prefix="/api/chat", tags=["chat"])

if __name__ == "__main__":
    logger.info("Iniciando servidor FastAPI en el puerto 5005")
    import uvicorn
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
