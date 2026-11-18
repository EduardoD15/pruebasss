# Modalab — prototipo de autenticación y roles

Prototipo académico del módulo administrativo acordado en los talleres: **F01 inicio de sesión, F02 autenticación y F03 control de acceso por roles**. No implementa los módulos de productos, ventas, entregas o reportes y no está preparado para desplegarse en producción.

## Requisitos

- Windows 10/11 y PowerShell.
- Node.js 22.18 o superior; npm se instala con Node.js.
- Chromium de Playwright para las pruebas de navegador A05.
- k6 solo si se ejecutará la prueba de carga A06.

SQLite se guarda en archivos locales del proyecto; no requiere una instalación aparte.

### Instalar k6 (solo para A06)

En Windows, instala k6 desde PowerShell:

```powershell
winget install k6 --source winget
```

Al terminar, cierra y vuelve a abrir la terminal y verifica la instalación:

```powershell
k6 version
```

Las demás pruebas no necesitan k6.

## Preparación inicial

Ejecuta estos comandos desde PowerShell, en la carpeta `proyecto-modalab`:

```powershell
node --version
npm --version
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
npm ci
```

El proyecto requiere Node.js 22.18 o superior. Si acabas de crear `.env`, revisa que las variables `MODALAB_ADMIN_PASSWORD` y `MODALAB_SELLER_PASSWORD` tengan contraseñas sintéticas para pruebas. No publiques `.env` ni uses estas cuentas en un despliegue accesible desde internet.

## Ejecutar la aplicación

Modo desarrollo:

```powershell
npm run dev
```

Abre `http://localhost:3000`. Las cuentas sintéticas son:

| Rol | Usuario |
|---|---|
| Administrador | `admin@modalab.test` |
| Vendedor | `vendedor@modalab.test` |
| Cuenta inactiva para pruebas negativas | `inactivo@modalab.test` |

Las contraseñas del Administrador y Vendedor se configuran en `.env`. La base de datos local se crea en `data/modalab.sqlite`.

Para comprobar la versión compilada en local, detén el modo desarrollo con `Ctrl+C` y ejecuta:

```powershell
npm run build
npm start
```

Abre `http://localhost:3000`. `npm start` requiere que `npm run build` haya terminado correctamente.

## Ejecutar las pruebas automatizadas

Los resultados aparecen en la terminal. `✔` significa que un caso pasó; el resumen indica cuántos pasaron y fallaron.

### A01 — Pruebas unitarias

```powershell
npm run test:unit
```

Comprueba validaciones de entrada y reglas de acceso por rol.

### A02–A04 — Pruebas de integración

```powershell
npm run test:integration
```

Comprueba bloqueo de cuentas, inicio de sesión, cuentas inactivas y ciclo de vida de sesiones usando una base SQLite temporal.

Para ejecutar A01–A04 en una sola orden:

```powershell
npm test
```

### A05 — Pruebas de navegador

Instala Chromium una vez:

```powershell
npx playwright install chromium
```

Después ejecuta:

```powershell
npm run test:e2e
```

Playwright prepara una base de datos separada y arranca la aplicación en `http://localhost:3100` durante la prueba. No necesitas iniciar `npm run dev` por separado. Los resultados se muestran en la terminal; las trazas se conservan cuando una prueba falla.

### A06 — Prueba de carga local con k6

Primero inicia la aplicación en una terminal:

```powershell
npm run dev
```

En otra terminal, configura el usuario de prueba. `LOGIN_PASSWORD` debe tener el mismo valor que `MODALAB_ADMIN_PASSWORD` en `.env`; k6 no lee `.env` automáticamente:

```powershell
$env:LOGIN_EMAIL = "admin@modalab.test"
$env:LOGIN_PASSWORD = "reemplaza por la contraseña de prueba del administrador"
npm run test:load
si falla npm usar el siguiente comando
& "C:\Program Files\k6\k6.exe" run tests/load/login-concurrency.k6.js
```

La prueba envía 50 solicitudes al endpoint local `http://127.0.0.1:3000/api/auth/login`. Solo acepta destinos `localhost` o `127.0.0.1`; no la ejecutes contra producción ni contra sistemas de terceros.

El resumen de k6 aparece en la terminal. Para aprobar, cada respuesta debe ser HTTP 200, los errores HTTP deben ser menores al 1% y el tiempo promedio debe ser menor a 2 segundos. Si las solicitudes responden correctamente pero el umbral de tiempo falla, la autenticación funcionó, pero no se alcanzó el objetivo de rendimiento en ese equipo.

### Ejecutar todas las pruebas automatizadas juntas

Después de instalar Chromium y k6, ejecuta desde la carpeta del proyecto:

```powershell
npm run test:all
```

Este comando ejecuta lint, A01–A04, A05, compila la aplicación y ejecuta A06 sobre una instancia temporal de producción. Usa bases de datos y resultados temporales para no reemplazar los archivos locales habituales. Si no encuentra k6 en el `PATH` ni en su ubicación usual de Windows, indica la ruta con `$env:K6_PATH = "C:\Program Files\k6\k6.exe"` antes de ejecutarlo.

El proceso termina con error si una prueba falla o si A06 no cumple el umbral de rendimiento. Las 17 pruebas manuales no se pueden ejecutar automáticamente: están descritas en [tests/manual/casos-de-prueba.md](tests/manual/casos-de-prueba.md) y requieren registrar resultados y evidencia. `npm test` sigue disponible para ejecutar solamente A01–A04.

## Orden recomendado

1. Instala dependencias y configura `.env` siguiendo la preparación inicial.
2. Ejecuta las pruebas automatizadas juntas con `npm run test:all`, o usa los comandos individuales de A01–A06 para revisar cada grupo.
3. Ejecuta los casos M01–M17 de forma manual y registra su evidencia.

## Casos automatizados

El diseño contempla 17 casos manuales y 6 automatizados (23 en total):

- **A01:** particiones y límites de entradas / roles — `tests/unit/auth-policy.test.ts`.
- **A02:** bloqueo al tercer intento y concurrencia de fallos — `tests/integration/auth-service.test.ts`; verificación E2E adicional en `tests/e2e/auth.spec.ts`.
- **A03:** cuenta inactiva — `tests/integration/auth-service.test.ts`.
- **A04:** sesión, expiración y logout — `tests/integration/auth-service.test.ts`.
- **A05:** login y autorización por rol en UI/API — `tests/e2e/auth.spec.ts`.
- **A06:** 50 solicitudes válidas concurrentes — `tests/load/login-concurrency.k6.js`.

Los 17 casos manuales, con técnicas, datos, pasos, resultados y trazabilidad, están en [tests/manual/casos-de-prueba.md](tests/manual/casos-de-prueba.md). Están diseñados y pendientes de ejecución manual y captura de evidencia.

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
La guía para distribuir nuevas contribuciones y commits por integrante está en `../Solucion/Guia_Colaboracion_Git.md`.
