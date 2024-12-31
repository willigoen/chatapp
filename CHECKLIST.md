# Checklist del Proyecto ChatDAP

## Sección 1: Configuración Inicial
- [x] Crear estructura básica del proyecto
- [x] Configurar FastAPI y Uvicorn
- [x] Configurar CORS
- [x] Configurar Logger
- [x] Configurar variables de entorno

## Sección 2: Autenticación y Usuarios
- [x] Crear modelo de usuario
- [x] Crear esquemas de usuario (UserCreate, UserLogin, UserResponse)
- [x] Implementar registro de usuarios
- [x] Implementar login y generación de JWT
- [x] Implementar endpoint para obtener información del usuario actual

## Sección 3: Chat de Texto
- [x] Configurar WebSocket básico
- [x] Implementar lógica de mensajes en tiempo real
- [x] Integrar autenticación en WebSocket

## Sección 4: Base de Datos
- [x] Configurar SQLAlchemy
- [x] Crear tablas de usuarios y mensajes
- [x] Implementar migraciones básicas

## Sección 5: Chat de Voz
- [ ] Configurar servidor de señalización para WebRTC
- [ ] Implementar lógica de llamadas de voz
- [ ] Integrar autenticación en las llamadas de voz

## Sección 6: Frontend
- [x] Configurar React Native + Expo
- [ ] Crear interfaz de usuario básica
- [ ] Integrar autenticación en el frontend
- [ ] Implementar chat de texto en el frontend
- [ ] Implementar chat de voz en el frontend

## Sección 7: Despliegue
- [ ] Configurar Docker
- [ ] Configurar CI/CD
- [ ] Desplegar en un servidor (Heroku, AWS, etc.)

## Sección 8: Pruebas
- [ ] Escribir pruebas unitarias
- [ ] Escribir pruebas de integración
- [ ] Realizar pruebas de carga

---

### Notas
- Marca con `[x]` las tareas completadas.
- Añade nuevas tareas según sea necesario. 