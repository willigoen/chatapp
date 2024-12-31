import logging
import sys

# Configuración básica del logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

# Crear un logger global
logger = logging.getLogger("ChatDAP") 