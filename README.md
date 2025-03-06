# Proyecto React con Redux y Rutas Protegidas

Este es un proyecto desarrollado en React con TypeScript, utilizando Redux Toolkit
para la gestión de estado, Redux Persist para persistencia del estado y React Router
para manejo de rutas protegidas. Además, se integra con una API simulada para la
autenticación y la obtención de datos.

## 🛠 Tecnologías Usadas

- React + TypeScript
- Vite como bundler
- Redux Toolkit + Redux Persist
- React Router para navegación
- Jest + Testing Library para pruebas unitarias
- Axios para llamadas a la API
- SCSS para estilos

## 📂 Estructura del Proyecto

```markdown
├── src/
│ ├── **tests**/ # Pruebas unitarias
│ ├── assets/ # Recursos estáticos
│ ├── pages/ # Páginas principales (Home, Login)
│ ├── routes/ # Configuración de rutas protegidas
│ ├── services/ # Llamadas a la API
│ ├── store/ # Redux store y slices
│ ├── styles/ # Archivos SCSS globales
│ ├── App.tsx # Componente principal
│ ├── main.tsx # Punto de entrada
│ ├── index.css # Estilos globales
│ ├── vite-env.d.ts # Configuración de TypeScript para Vite
└──
```

## 🚀 Instalación y Ejecución

- Clonar el repositorio:

```bash
git clone <git@github.com:Nestor2018/tenpo.git>
cd tenpo
```

- Instalar dependencias

```bash
npm install
```

- Ejecutar el proyecto en modo desarrollo

```bash
npm run dev
```

## 🔑 Autenticación y Rutas Protegidas

El proyecto usa Redux para gestionar la autenticación y protege rutas con `PrivateRoute`.
Los usuarios deben iniciar sesión en la página de Login para acceder a `Home`.

- **Login:** Simula una autenticación con `fakeLogin`, generando un token falso

- **Redux Persist:** Mantiene la sesión del usuario en `localStorage`

- **Rutas protegidas:** `PrivateRoute` bloquea el acceso a `/` si el usuario no
  está autenticado

## 📡 API Simulada

Se usa `jsonplaceholder.typicode.com` como backend de prueba y un `fakeLogin` para
autenticación:

## 🧪 Testing

El proyecto incluye pruebas unitarias en `__tests__/`.

Ejecutar las pruebas con:

```bash
npm run test
```
