# Catálogo de casos de prueba manuales — Modalab

**Documento relacionado:** `../../Solucion/Informe_Plan_Pruebas.md`  
**Versión:** 1.0  
**Alcance:** F01 inicio de sesión, F02 autenticación y F03 permisos  
**Cantidad:** 17 casos manuales. Se diseñaron, pero aún no se ejecutaron manualmente.

> Ejecutar solo con `localhost`, cuentas sintéticas y una base reiniciable. Antes de probar M10–M12, restaurar la cuenta Administrador a Activa y dejar el contador en cero. Guardar evidencia sin contraseñas, cookies, tokens ni hashes.

## M01 — Preparar entorno reproducible

- **Prioridad / trazabilidad:** P1 · RY-01 / CP-07.
- **Técnica y fundamento:** checklist de configuración para confirmar las precondiciones del ensayo antes de ejecutar casos de producto.
- **Precondiciones/datos:** Node.js 22.18 o superior, npm y copia de `.env.example` configurada con contraseñas sintéticas; sin datos de tienda.
- **Pasos:** 1) Iniciar el prototipo con `npm run dev`. 2) Verificar que la página local responde y la API de sesión sin cookie responde 401. 3) Registrar versiones de Node y npm, sistema operativo, versión/commit, archivo de entorno (sin secretos) y estado de SQLite. 4) Confirmar que el host es localhost.
- **Resultado esperado:** servicio disponible, base aislada, datos semilla sintéticos, sin conexión externa. Si cualquiera falla, suspender y no ejecutar casos.
- **Evidencia/estado:** checklist y salida de versiones; pendiente de ejecución manual.

## M02 — Control de versión y puerta de entrada

- **Prioridad / trazabilidad:** P1 · RY-02, RY-04 / CP-08.
- **Técnica y fundamento:** revisión estática de release y criterios de entrada; comparación de identificador de versión y alcance aprobado.
- **Precondiciones/datos:** versión candidata identificable, plan de 23 casos y dependencias WBS disponibles.
- **Pasos:** 1) Registrar commit/versión candidata. 2) Revisar cambios desde la versión previa y confirmar que no agregan módulos fuera de F01–F03. 3) Ejecutar `npm test`, `npm run lint` y `npm run build`. 4) Confirmar responsable y fecha de cada corrección pendiente.
- **Resultado esperado:** versión y cambios trazables; scripts aprobados; ningún defecto crítico/alto bloqueante; cambios de alcance reflejados en riesgos, casos y estimación. No afirmar release de GitHub hasta publicar y vincularlo.
- **Evidencia/estado:** ID de versión, lista de cambios y resultados de comandos; pendiente de ejecución manual por el equipo.

## M03 — Enviar el formulario vacío

- **Prioridad / trazabilidad:** P2 · RP-04 / CP-01.
- **Técnica y fundamento:** partición de equivalencia; clase inválida de correo/contraseña vacíos.
- **Precondiciones/datos:** navegador sin sesión en la pantalla de login.
- **Pasos:** dejar ambos campos vacíos y pulsar “Iniciar sesión”.
- **Resultado esperado:** el navegador marca los campos obligatorios y no crea sesión ni envía credenciales.
- **Evidencia/estado:** captura sin datos sensibles; pendiente.

## M04 — Correo con formato inválido

- **Prioridad / trazabilidad:** P2 · RP-04 / CP-01.
- **Técnica y fundamento:** partición de equivalencia; representante de la clase “correo mal formado”.
- **Precondiciones/datos:** API local y cuenta de prueba disponible.
- **Pasos:** enviar por API `correo-invalido` con una contraseña sintética.
- **Resultado esperado:** HTTP 400, mensaje de validación, sin sesión ni error 5xx.
- **Evidencia/estado:** status y respuesta sin secretos; pendiente.

## M05 — Límite de longitud del correo

- **Prioridad / trazabilidad:** P2 · RP-04 / CP-01.
- **Técnica y fundamento:** análisis de valores límite en longitud: 255 y 256 caracteres, un valor en el máximo admitido y uno inmediatamente superior.
- **Precondiciones/datos:** API local. Construir `a` repetida 250 veces + `@x.co` (255 caracteres) y `a` repetida 251 veces + `@x.co` (256).
- **Pasos:** enviar ambas cadenas como `email` con contraseña sintética.
- **Resultado esperado:** 255 pasa validación de forma y longitud y llega a autenticación (HTTP 401 por cuenta inexistente); 256 se rechaza en validación (HTTP 400). Ninguna crea sesión ni genera HTTP 5xx.
- **Evidencia/estado:** longitud calculada, status y respuesta; pendiente.

## M06 — Valores límite de contraseña

- **Prioridad / trazabilidad:** P2 · RP-04 / CP-01.
- **Técnica y fundamento:** valores límite: longitud 0, 1, 256 y 257 para límites admitido/no admitido.
- **Precondiciones/datos:** API local y correo sintácticamente válido.
- **Pasos:** enviar contraseñas con las longitudes indicadas.
- **Resultado esperado:** longitud 0 y 257 producen HTTP 400; 1 y 256 pasan validación de forma y llegan a autenticación (HTTP 401 con datos no coincidentes). Sin sesión ni HTTP 5xx.
- **Evidencia/estado:** longitud, status y respuesta; pendiente.

## M07 — Error genérico sin revelar existencia de cuenta

- **Prioridad / trazabilidad:** P2 · RP-02 / CP-01/CP-02.
- **Técnica y fundamento:** partición de equivalencia: usuario existente con clave incorrecta frente a usuario inexistente.
- **Precondiciones/datos:** cuenta activa Administrador reiniciada.
- **Pasos:** enviar una clave incorrecta para `admin@modalab.test`; luego enviar una clave para `no-existe@modalab.test`.
- **Resultado esperado:** ambos intentos responden HTTP 401 con el mismo mensaje genérico, sin token/cookie de sesión ni detalle que confirme la existencia del correo.
- **Evidencia/estado:** status, texto y cabeceras saneadas; pendiente.

## M08 — Inicio válido de Administrador y persistencia de sesión

- **Prioridad / trazabilidad:** P2 · RP-02 / CP-02/CP-06.
- **Técnica y fundamento:** tabla de decisión: credenciales válidas + cuenta Activa + rol Administrador.
- **Precondiciones/datos:** Administrador sintético activo, contador de fallos en cero.
- **Pasos:** ingresar con la clave definida en `.env`; confirmar llegada al panel; recargar una vez; abrir “Usuarios de prueba”.
- **Resultado esperado:** login HTTP 200, panel Administrador visible, sesión mantenida al recargar y lista accesible; nunca mostrar hashes o contraseñas.
- **Evidencia/estado:** capturas saneadas y status; pendiente.

## M09 — Rechazar cuenta inactiva

- **Prioridad / trazabilidad:** P2 · RP-02 / CP-02.
- **Técnica y fundamento:** tabla de decisión: credenciales correctas + estado Inactivo.
- **Precondiciones/datos:** `inactivo@modalab.test` sembrada con estado inactivo.
- **Pasos:** enviar su correo y la contraseña sintética configurada para el vendedor.
- **Resultado esperado:** HTTP 403, sin cookie ni sesión autenticada; no exponer datos de otras cuentas.
- **Evidencia/estado:** status y respuesta sin cookie; pendiente.

## M10 — Primer y segundo fallo no bloquean

- **Prioridad / trazabilidad:** P2 · RP-02 / CP-03.
- **Técnica y fundamento:** valores límite inmediatamente anteriores al umbral: intentos 1 y 2 frente al umbral 3.
- **Precondiciones/datos:** Administrador activo, contador reiniciado a cero.
- **Pasos:** enviar dos contraseñas incorrectas consecutivas y revisar estado después de cada una.
- **Resultado esperado:** dos HTTP 401; contador 1 y 2 respectivamente; la cuenta aún está Activa y no bloqueada.
- **Evidencia/estado:** status y estado sintético; pendiente.

## M11 — Tercer fallo activa el bloqueo

- **Prioridad / trazabilidad:** P2 · RP-02 / CP-03.
- **Técnica y fundamento:** valor límite exacto del umbral: tercer fallo consecutivo.
- **Precondiciones/datos:** continuar M10 sin reiniciar la cuenta.
- **Pasos:** enviar la tercera contraseña incorrecta consecutiva y consultar el estado.
- **Resultado esperado:** respuesta HTTP 423 y transición Activo → Bloqueado temporalmente al alcanzar 3 fallos.
- **Evidencia/estado:** status, hora de bloqueo y estado; pendiente.

## M12 — Clave correcta durante bloqueo

- **Prioridad / trazabilidad:** P2 · RP-02 / CP-03.
- **Técnica y fundamento:** transición de estado: validar que Bloqueado no vuelve a Activo por una clave correcta antes de expirar.
- **Precondiciones/datos:** cuenta bloqueada por M11, clave correcta disponible solo en `.env`.
- **Pasos:** intentar login inmediato con la clave correcta.
- **Resultado esperado:** HTTP 423, acceso denegado y sesión no emitida; el bloqueo permanece hasta el vencimiento configurado.
- **Evidencia/estado:** status y estado; pendiente.

## M13 — Vendedor no accede a funciones de Administrador

- **Prioridad / trazabilidad:** P2 · RP-03 / CP-05.
- **Técnica y fundamento:** partición de equivalencia de rol permitido/no permitido; Vendedor contra endpoint exclusivo de Administrador.
- **Precondiciones/datos:** sesión Vendedor activa.
- **Pasos:** abrir directamente `/admin/users` y solicitar `GET /api/admin/users` con la sesión Vendedor.
- **Resultado esperado:** la API responde HTTP 403; la interfaz no muestra datos administrativos ni el enlace de administración.
- **Evidencia/estado:** status y captura sin token; pendiente.

## M14 — Administrador ve solo campos autorizados

- **Prioridad / trazabilidad:** P2 · RP-03 / CP-05.
- **Técnica y fundamento:** revisión de salida permitida: comparación del esquema devuelto con la lista blanca `id`, `email`, `role`.
- **Precondiciones/datos:** sesión Administrador activa.
- **Pasos:** abrir la lista y revisar la respuesta JSON de `GET /api/admin/users`.
- **Resultado esperado:** aparecen solo identificador, correo y rol; no aparecen `password_hash`, `password_salt`, sesiones ni contraseñas.
- **Evidencia/estado:** claves JSON registradas, valores personales/sensibles omitidos; pendiente.

## M15 — Logout revoca la sesión

- **Prioridad / trazabilidad:** P2 · RP-02/RP-04 / CP-06.
- **Técnica y fundamento:** transición autenticado → cerrado; comprobación antes/después del estado de sesión.
- **Precondiciones/datos:** sesión activa de cualquiera de los dos roles.
- **Pasos:** cerrar sesión; solicitar `GET /api/auth/me`; intentar usar el endpoint protegido con el mismo cliente.
- **Resultado esperado:** cookie eliminada, `/me` responde HTTP 401 y la API protegida no acepta la sesión revocada.
- **Evidencia/estado:** status y cookie redactada/eliminada; pendiente.

## M16 — Sesión expirada no autoriza

- **Prioridad / trazabilidad:** P2 · RP-04 / CP-06.
- **Técnica y fundamento:** transición de sesión vigente → expirada; usar expiración controlada en la base de pruebas en lugar de esperar ocho horas.
- **Precondiciones/datos:** crear una sesión sintética y fijar su `expires_at` a un instante anterior al reloj de prueba.
- **Pasos:** solicitar `/api/auth/me` y endpoint protegido con esa cookie.
- **Resultado esperado:** HTTP 401 para `/me`; el recurso protegido tampoco devuelve datos. No alterar una base distinta a la de prueba.
- **Evidencia/estado:** hora simulada, status y base usada; pendiente.

## M17 — Checklist de mensajes, teclado y coherencia de roles

- **Prioridad / trazabilidad:** P3 · RY-03 / CP-09.
- **Técnica y fundamento:** checklist exploratorio acotado de 30 minutos, seleccionado por baja exposición y sin automatización exhaustiva.
- **Precondiciones/datos:** guía de roles, textos de la aplicación y perfiles sintéticos.
- **Pasos:** recorrer login, errores, logout y paneles con teclado; revisar foco, etiquetas, mensajes y opciones visibles para ambos roles.
- **Resultado esperado:** mensajes comprensibles, campos etiquetados, foco visible y navegación coherente con la matriz de permisos; registrar discrepancias como observaciones, no ocultarlas.
- **Evidencia/estado:** checklist con observaciones y responsable; pendiente.

## Trazabilidad de casos manuales

| Riesgo | Casos manuales |
|---|---|
| RP-02 | M07–M12, M15 |
| RP-03 | M13–M14 |
| RP-04 | M03–M07, M15–M16 |
| RY-01 | M01 |
| RY-02 / RY-04 | M02 |
| RY-03 | M17 |

Cada ejecución debe completar: fecha/hora, ejecutor, versión, ambiente, resultado real, estado (aprobado/fallido/bloqueado), evidencia redactada, defecto asociado y resultado de retest. El diseño no se debe marcar como ejecución aprobada sin evidencia.
