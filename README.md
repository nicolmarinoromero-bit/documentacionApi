# Puesto de Chance API

API REST para gestionar usuarios, sorteos, ventas de tiquetes de Chance y Baloto, premios y cierres de caja.

## Tecnologías

![Node.js](https://img.shields.io/badge/Node.js-JavaScript-green)
![Express](https://img.shields.io/badge/Express-API-black)
![Jest](https://img.shields.io/badge/Jest-Pruebas-red)

## Requisitos

- Node.js y npm instalados.
- Git para descargar el repositorio.

## Instalación y ejecución

1. Clona el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Entra en la carpeta del proyecto:

   ```bash
   cd documentacionApi
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Crea un archivo `.env` usando `.env.example` como guía y revisa sus valores.

5. Inicia el servidor:

   ```bash
   npm run dev
   ```

   También puedes usar `npm start`.

La API estará disponible en `http://localhost:3000`. Comprueba que está activa con `GET /health`.

## Variables de entorno

Las variables configurables están en `.env.example`. Cambia el secreto JWT antes de usar el proyecto fuera de un entorno local. No publiques el archivo `.env` con valores secretos.

## Autenticación

Las rutas protegidas requieren un token JWT. Inicia sesión en `POST /api/v1/auth/login` y envía el token en el encabezado:

```text
Authorization: Bearer <TOKEN>
```

## Endpoints

| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| GET | `/health` | Comprueba el estado del servidor | Público |
| POST | `/api/v1/auth/login` | Inicia sesión | Público |
| GET | `/api/v1/auth/perfil` | Consulta el perfil actual | Autenticado |
| GET | `/api/v1/sorteos` | Lista sorteos | Autenticado |
| GET | `/api/v1/sorteos/:id` | Consulta un sorteo | Autenticado |
| POST | `/api/v1/sorteos` | Crea un sorteo | Administrador |
| POST | `/api/v1/sorteos/:id/resultado` | Registra el resultado de un sorteo | Administrador |
| POST | `/api/v1/tickets/chance` | Vende un tiquete de Chance | Vendedor |
| POST | `/api/v1/tickets/baloto` | Vende un tiquete de Baloto | Vendedor |
| GET | `/api/v1/tickets` | Lista tiquetes | Autenticado |
| GET | `/api/v1/tickets/:codigo` | Consulta un tiquete | Autenticado |
| POST | `/api/v1/tickets/:codigo/anular` | Anula un tiquete | Autenticado |
| POST | `/api/v1/tickets/:codigo/pagar` | Paga un premio | Vendedor |
| GET | `/api/v1/caja/resumen` | Consulta el resumen de caja | Autenticado |
| POST | `/api/v1/caja/cierre` | Registra el cierre de caja | Vendedor |

## Ejemplos de solicitudes

### Iniciar sesión

```http
POST /api/v1/auth/login
Content-Type: application/json
```

```json
{
  "usuario": "vendedor1",
  "password": "vende123"
}
```

La respuesta contiene un token y los datos básicos del usuario. Usa el token para acceder a las rutas protegidas.

### Vender Chance

```http
POST /api/v1/tickets/chance
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

```json
{
  "sorteoId": 1,
  "apuestas": [
    {
      "numero": "1234",
      "valor": 2000
    }
  ],
  "cliente": "Cliente de ejemplo"
}
```

## Documentación interactiva de la API

Las rutas están implementadas en `src/routes/index.js`. Este proyecto aún no incluye una interfaz interactiva de Swagger UI. La tabla de endpoints y los ejemplos anteriores sirven como documentación básica. Si se configura OpenAPI/Swagger, agrega aquí las instrucciones para iniciar y consultar esa documentación.

## Pruebas

Ejecuta las pruebas con:

```bash
npm test
```

Los casos de prueba están en la carpeta `tests/`.

## Matriz de trazabilidad de requisitos

| ID HU | Descripción del requisito | Módulo / controlador | Caso de prueba | Estado QA |
|---|---|---|---|---|
| HU-001 | Autenticar usuarios y consultar el perfil | `src/controllers/authController.js`, `src/services/authService.js` | `test_login_exitoso`, `test_login_credenciales_invalidas`, `test_ruta_protegida_sin_token` | Aprobado |
| HU-002 | Vender tiquetes de Chance y Baloto | `src/controllers/ticketController.js`, `src/services/ticketService.js` | `test_venta_chance`, `test_venta_baloto`, `test_venta_sorteo_cerrado` | Aprobado |
| HU-003 | Validar apuestas y calcular premios de Chance | `src/services/chanceService.js` | `test_premio_directo_4_cifras`, `test_premio_directo_ultimas_cifras`, `test_validacion_apuesta_invalida` | Aprobado |
| HU-004 | Validar jugadas y calcular premios de Baloto | `src/services/balotoService.js` | `test_jugada_aleatoria_valida`, `test_jugada_numeros_repetidos`, `test_premio_por_aciertos` | Aprobado |
| HU-005 | Crear sorteos y registrar resultados | `src/controllers/sorteoController.js`, `src/services/sorteoService.js` | `test_admin_crea_sorteo`, `test_resultado_y_pago_premio` | Aprobado |
| HU-006 | Consultar ventas y cerrar caja | `src/controllers/cajaController.js`, `src/services/cajaService.js` | `test_resumen_caja_diario`, `test_cierre_caja_con_faltante` | Aprobado |

> Estado actualizado tras la ejecución de `npm test`: las 5 suites y los 20 casos de prueba finalizaron correctamente.

## Licencias de terceros

Este proyecto utiliza paquetes de terceros. Las licencias y avisos de copyright de las dependencias instaladas se encuentran en los paquetes correspondientes dentro de `node_modules/`.

Dependencias directas declaradas en `package.json`:

| Paquete | Uso | Licencia |
|---|---|---|
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | Cifrado y verificación de contraseñas | MIT |
| [cors](https://www.npmjs.com/package/cors) | Configuración de solicitudes entre orígenes | MIT |
| [dotenv](https://www.npmjs.com/package/dotenv) | Carga de variables de entorno | BSD-2-Clause |
| [Express](https://www.npmjs.com/package/express) | Servidor y rutas HTTP | MIT |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | Creación y validación de tokens JWT | MIT |
| [Morgan](https://www.npmjs.com/package/morgan) | Registro de solicitudes HTTP | MIT |
| [Jest](https://www.npmjs.com/package/jest) | Ejecución de pruebas | MIT |
| [Nodemon](https://www.npmjs.com/package/nodemon) | Reinicio del servidor durante el desarrollo | MIT |
| [Supertest](https://www.npmjs.com/package/supertest) | Pruebas HTTP de la API | MIT |

La tabla enumera las dependencias directas de `package.json`. `package-lock.json` también contiene dependencias transitivas; revisa sus paquetes y avisos de licencia al distribuir el proyecto.
