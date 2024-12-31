from database import Base, engine
from models.user import User  # Importar el modelo User
from models.server import Server, Channel  # Importar los modelos Server y Channel

def create_tables():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    create_tables() 