# Modalab — prototipo de autenticación y roles

Prototipo académico del módulo administrativo acordado en los talleres: **F01 inicio de sesión, F02 autenticación y F03 control de acceso por roles**. No implementa los módulos de productos, ventas, entregas o reportes y no está preparado para desplegarse en producción.

## Requisitos

- Node.js 22.18 o superior y npm.
- Docker Desktop si se desea ejecutar con contenedor.
- Chromium de Playwright para las pruebas de interfaz.

## Ejecución local

Desde esta carpeta:

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

Abre `http://localhost:3000`. Las cuentas sintéticas configuradas en `.env.example` son:

| Rol | Usuario |
|---|---|
| Administrador | `admin@modalab.test` |
| Vendedor | `vendedor@modalab.test` |
| Cuenta inactiva para pruebas negativas | `inactivo@modalab.test` |

La contraseña de Administrador y Vendedor está definida en las variables `MODALAB_ADMIN_PASSWORD` y `MODALAB_SELLER_PASSWORD` del archivo `.env`. Son valores de demostración: no los reutilices ni publiques un despliegue accesible desde internet. La base de datos local se crea en `data/modalab.sqlite`.

## Ejecución con Docker

```powershell
Copy-Item .env.example .env
docker compose up --build
```

Abre `http://localhost:3000`. SQLite persiste en el volumen `modalab-data`. El contenedor requiere las dos contraseñas definidas en `.env`; no hay contraseñas de producción dentro de la imagen.

## Pruebas

```powershell
npm test
npm run lint
npm run build
```

El diseño cumple el volumen de la guía: 17 casos manuales y 6 automatizados (23 en total). Los seis casos automatizados trazan así:

- **A01:** particiones y límites de entradas / roles — `tests/unit/auth-policy.test.ts`.
- **A02:** bloqueo al tercer intento y concurrencia de fallos — `tests/integration/auth-service.test.ts`; verificación E2E adicional en `tests/e2e/auth.spec.ts`.
- **A03:** cuenta inactiva — `tests/integration/auth-service.test.ts`.
- **A04:** sesión, expiración y logout — `tests/integration/auth-service.test.ts`.
- **A05:** login y autorización por rol en UI/API — `tests/e2e/auth.spec.ts`.
- **A06:** 50 solicitudes válidas concurrentes — `tests/load/login-concurrency.k6.js`. Requiere k6 instalado; está protegido para aceptar solo `localhost`.

Los 17 casos manuales con técnica, datos, pasos, resultados y trazabilidad están en `tests/manual/casos-de-prueba.md`; todos quedan pendientes de ejecución manual y captura de evidencia.

Para Playwright:

```powershell
npx playwright install chromium
npm run test:e2e
```

La prueba de concurrencia está delimitada al entorno local; inicia primero la aplicación y usa las mismas variables de entorno sintéticas:

```powershell
$env:LOGIN_EMAIL = "admin@modalab.test"
$env:LOGIN_PASSWORD = "Demo-Admin-2026!"
k6 run tests/load/login-concurrency.k6.js
```

No apuntes el script de carga a producción ni a sistemas de terceros.

## Rutas principales

| Ruta | Uso |
|---|---|
| `POST /api/auth/login` | Valida credenciales, aplica bloqueo temporal y crea cookie de sesión |
| `GET /api/auth/me` | Devuelve el usuario de la sesión activa |
| `POST /api/auth/logout` | Revoca la sesión y elimina la cookie |
| `GET /api/admin/users` | Lista datos básicos sintéticos; solo Administrador |

Las contraseñas se almacenan con scrypt; el identificador de sesión es aleatorio, se entrega en cookie `HttpOnly` y solo se conserva su hash en SQLite. El costo de scrypt está reducido para alcanzar el umbral académico en hardware local de cuatro núcleos; es una decisión exclusiva del prototipo y **no debe copiarse a producción**. El control de rol se verifica en la API, no solamente ocultando enlaces en la interfaz.

## Estructura

```text
src/app/                 Páginas Next.js y rutas API
src/lib/                 Persistencia SQLite, autenticación y política de roles
tests/unit/              Pruebas unitarias
tests/integration/       Pruebas de servicio con base temporal
tests/e2e/               Pruebas Playwright de navegador
tests/manual/            Catálogo de 17 casos manuales
tests/load/              Prueba k6 local de concurrencia
scripts/                 Preparación aislada de datos E2E
```

El plan completo y el documento Word están en la carpeta `../Solucion`.
