from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "ChatDAP"
    HOST: str = "0.0.0.0"
    PORT: int = 5005
    DATABASE_URL: str = "mysql+pymysql://willi:AR1s70t31ez_@localhost/chatdap"
    JWT_SECRET: str = "supersecret"
    ALLOWED_ORIGINS: list = ["http://localhost", "http://127.0.0.1"]
    DEBUG: bool = True

settings = Settings()
