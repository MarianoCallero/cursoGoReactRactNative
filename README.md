# Gateway App — Go + React + TypeScript

Aplicación web full-stack compuesta por:

- **Backend**: API Gateway en Go
- **Frontend**: React + TypeScript (Vite)
- Comunicación vía **HTTP REST**
- Enfoque simple, limpio y escalable

Este proyecto sirve como base para:
- Gateway / BFF
- Microservicios
- Pruebas técnicas
- Entornos de desarrollo local

---

## Arquitectura



┌────────────┐ HTTP ┌──────────────┐
│ Frontend │ ───────────────▶ │ Backend │
│ React + TS │ /api/v1/hello │ Go │
└────────────┘ └──────────────┘


- El frontend consume la API vía `/api/*`
- En desarrollo, Vite hace proxy al backend
- El backend expone endpoints versionados (`/api/v1`)

---

## Backend (Go)

### Stack
- Go 1.21+
- net/http
- chi router
- Middlewares: logging, recover, CORS
- Configuración por variables de entorno

### Estructura



gateway/
├── cmd/
│ └── api/
│ └── main.go # Entry point
├── internal/
│ ├── handlers/ # HTTP handlers
│ └── server/ # Router + server config
└── go.mod


### Requisitos
- Go 1.21 o superior
- Puerto `8080` libre

### Variables de entorno

| Variable | Default | Descripción |
|--------|---------|-------------|
| PORT   | 8080    | Puerto HTTP |

### Cómo correrlo

Desde la carpeta `gateway/`:

```bash
go mod tidy
go run ./cmd/api
```


## Backend disponible en:

http://localhost:8080


## Frontend (React + TypeScript) 

## Stack

React 18

TypeScript

Vite

Fetch API

Manejo de estados: loading / error / data

## Estructura 

frontend/
├── src/
│   ├── App.tsx
│   └── main.tsx
├── vite.config.ts
└── package.json

## Requisitos ##

Node.js 18+

npm / pnpm / yarn

Cómo correrlo

## Desde la carpeta del frontend:

npm install
npm run dev


## Frontend disponible en:

http://localhost:5173


Vite proxya /api/* hacia http://localhost:8080.

## Endpoints
GET /health

Descripción
Health check del servicio.

Respuesta

{
  "status": "ok"
}

GET /api/v1/hello

Descripción
Endpoint de prueba usado por el frontend.

Respuesta

{
  "message": "Hola desde Go"
}

## Flujo de la aplicación

El usuario abre la app web

React renderiza el título

Se ejecuta fetch('/api/v1/hello')

Mientras carga → Loading...

Si falla → se muestra error

Si responde OK → se renderiza el mensaje

Manejo de errores (Frontend)

Estado loading mientras se ejecuta la request

Manejo de errores HTTP

AbortController para evitar memory leaks

Validación de respuesta JSON

