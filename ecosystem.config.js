module.exports = {
  apps: [
    {
      name: "fastapi-server",
      script: "uvicorn",
      args: "backend.main:app --host 0.0.0.0 --port 8000",
      interpreter: "python3",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "websocket-server",
      script: "server.js",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
}; 