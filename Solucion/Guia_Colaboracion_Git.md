# Guía para repartir los aportes en una copia nueva de Modalab

Esta guía propone una secuencia para un repositorio nuevo. No describe el historial real del repositorio actual ni debe usarse como si esos commits ya existieran.

## Repositorio actual y copia nueva

El repositorio actual tiene el commit `2f3b054`, creado por Eduardo Deossa. Ese commit incluye la aplicación y las pruebas. Para practicar el trabajo por integrante, se hará una copia nueva de `proyecto-modalab`, se quitará el Git de esa copia si lo hubiera y se creará un repositorio distinto.

Conservar la carpeta original. Copiar el proyecto a una carpeta vacía y limpiar solo la copia:

```powershell
$origen = "C:\Users\eduar\Desktop\pruebasss\proyecto-modalab"
$destino = "C:\Users\eduar\Desktop\Modalab-simulacion"
Copy-Item -LiteralPath $origen -Destination $destino -Recurse
Set-Location $destino
if (Test-Path -LiteralPath ".git") { Remove-Item -LiteralPath ".git" -Recurse -Force }
foreach ($nombre in @("tests", "scripts", "data", "test-results", ".next", "node_modules", ".env")) {
    if (Test-Path -LiteralPath $nombre) { Remove-Item -LiteralPath $nombre -Recurse -Force }
}
```

En la copia nueva no incluir:

- `tests/`, `scripts/`, `data/`, `test-results/`, `.next/` ni `node_modules/`.
- `.env`, contraseñas, bases SQLite ni resultados locales.
- Archivos de Docker; el proyecto se ejecuta con Node.js y npm.

Sí se puede incluir `.env.example` si contiene solamente valores de prueba. En el primer commit, el `package.json` debe conservar los comandos de la aplicación (`dev`, `build`, `start` y `lint`); Santiago añadirá los comandos de prueba junto con las pruebas.

## Archivos por integrante

| Integrante | Archivos que agrega a la copia nueva | Mensaje propuesto |
|---|---|---|
| Eduardo Deossa | `src/`, `public/`, `.env.example`, `.gitignore`, `eslint.config.mjs`, `package.json`, `package-lock.json`, `tsconfig.json` | `feat: agrega aplicacion de inicio de sesion` |
| Estefanía Montoya | `tests/manual/casos-de-prueba.md`, `Solucion/Informe_Plan_Pruebas.md`, `Solucion/Informe_Plan_Pruebas.docx`, `Solucion/Guia_Colaboracion_Git.md` | `docs: agrega plan y casos manuales` |
| Santiago Castaño | `tests/unit/`, `tests/integration/`, `tests/e2e/`, `tests/load/`, `scripts/`, `playwright.config.ts`, `README.md`, cambios de pruebas en `package.json` | `test: agrega pruebas automatizadas y comandos` |

En el repositorio nuevo, crear `Solucion/` para los documentos. Como el proyecto estará en la raíz y no en `proyecto-modalab/`, ajustar las rutas relativas de los informes antes de subirlos. El archivo `README.md` debe describir la ejecución con npm, sin instrucciones de Docker.

## 1. Eduardo: iniciar el repositorio con la aplicación

En el proyecto copiado, excluir los archivos y carpetas indicados arriba. En `package.json`, dejar los comandos de aplicación y quitar por ahora las entradas `test:*`. Luego, desde la raíz de la copia:

```powershell
git init -b main
git config user.name "Eduardo Deossa"
git config user.email "CORREO_DE_EDUARDO"
git add src public .env.example .gitignore eslint.config.mjs package.json package-lock.json tsconfig.json
git status --short
git commit -m "feat: agrega aplicacion de inicio de sesion"
git remote add origin URL_DEL_REPOSITORIO_NUEVO
git push -u origin main
```

Revisar `git status --short` antes del commit. Si `public/` no tiene archivos, quitar `public` del comando `git add`. No agregar `tests/`, `scripts/`, `data/`, `.env` ni resultados.

## 2. Estefanía: agregar el plan y los casos manuales

Después de que Eduardo publique `main`, copiar los documentos y el catálogo manual a la copia del repositorio nuevo. Trabajar con la cuenta GitHub de Estefanía:

```powershell
git switch main
git pull --ff-only origin main
git switch -c docs/plan-y-casos
git add tests/manual/casos-de-prueba.md Solucion/Informe_Plan_Pruebas.md Solucion/Informe_Plan_Pruebas.docx Solucion/Guia_Colaboracion_Git.md
git status --short
git commit -m "docs: agrega plan y casos manuales"
git push -u origin docs/plan-y-casos
```

Crear un Pull Request de `docs/plan-y-casos` hacia `main`.

## 3. Santiago: agregar las pruebas automatizadas

Copiar las pruebas automáticas y archivos de configuración a la copia nueva. Agregar en `package.json` los comandos de pruebas (`test:unit`, `test:integration`, `test:e2e`, `test:load`, `test:all`) y conservar el lockfile actualizado. Trabajar con la cuenta GitHub de Santiago:

```powershell
git switch main
git pull --ff-only origin main
git switch -c test/pruebas-automatizadas
git add tests/unit tests/integration tests/e2e tests/load scripts playwright.config.ts package.json package-lock.json README.md
git status --short
git commit -m "test: agrega pruebas automatizadas y comandos"
git push -u origin test/pruebas-automatizadas
```

Crear un Pull Request de `test/pruebas-automatizadas` hacia `main`. El comando `npm run test:all` no reemplaza los 17 casos manuales.

## Registro de los commits

Los mensajes anteriores son una propuesta; no son commits ya creados. Cada integrante debe confirmar su propio nombre, correo y cuenta GitHub antes de hacer commit. Después de crear cada uno, registrar su hash real:

```powershell
git log --oneline --decorate --graph -10
git status --short
```

No usar hashes ni fechas supuestos en los informes. No subir `.env`, `data/`, `node_modules/`, `.next/`, `test-results/` ni bases de datos.
