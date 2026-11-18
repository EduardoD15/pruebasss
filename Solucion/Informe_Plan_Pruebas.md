# Plan de pruebas de software — Modalab

**Proyecto:** Aplicativo administrativo de una tienda de ropa  
**Módulo evaluado:** Inicio de sesión, autenticación y control de acceso  
**Norma de referencia:** ISO/IEC/IEEE 29119-3:2013  
**Versión del documento:** 1.0  
**Fecha:** 18 de noviembre de 2026  
**Autores identificados en los antecedentes:** Eduardo Deossa, Estefanía Montoya y Santiago Castaño  
**Estado de aprobación:** Borrador académico pendiente de revisión del equipo y aprobación docente

> **Alcance de este entregable.** Este documento consolida y completa el plan de pruebas solicitado en `../Actividad/contenidoPlan.txt`, usando como contexto los talleres previos del equipo en `../ContextoTrabajosEchoAntes/trabajo.md`. El proyecto de software que acompaña el informe es un prototipo académico ejecutable para validar ese plan; no es una implementación completa de la tienda ni un sistema listo para producción.

## 1. Información específica del documento

### 1.1 Identificador

**MOD-PT-001 — Plan de pruebas del módulo administrativo de Modalab.**

### 1.2 Organización emisora y autores

Trabajo académico del equipo de Modalab, desarrollado para la asignatura de Ingeniería de Software / Pruebas de Software.

| Integrante | Responsabilidad propuesta |
|---|---|
| Eduardo Deossa | Coordinación del plan, trazabilidad y revisión |
| Estefanía Montoya | Análisis de condiciones y diseño de pruebas manuales |
| Santiago Castaño | Automatización, entorno y registro de resultados |
| Integrante 4 | **Por confirmar por el equipo**; los documentos previos lo dejan como “No aplica”, pero la guía final solicita un equipo de cuatro |

La asignación del cuarto integrante y el reparto definitivo de los 23 casos están pendientes. No se inventa una identidad ni se considera confirmada la capacidad de cuatro personas hasta que el equipo complete ese dato.

### 1.3 Autoridad de aprobación

La aprobación final corresponde al docente y al equipo del proyecto. Sus nombres, firmas y fecha de aprobación quedan pendientes; no se presumen en este borrador.

### 1.4 Historial de cambios

| Versión | Fecha | Cambio | Autoría |
|---|---|---|---|
| 0.1 | 24/03/2026 | Insumos iniciales de alcance, riesgos y estrategia en los talleres del equipo | Equipo Modalab |
| 1.0 | 18/11/2026 | Consolidación del plan, matriz de riesgos, trazabilidad, criterios, estimaciones y entregables ejecutables | Equipo Modalab |

## 2. Introducción y declaración de adaptación

### 2.1 Alcance del documento

Este plan define cómo verificar el módulo administrativo del sistema Modalab. La evaluación cubre:

- **F01 — Inicio de sesión:** presentación y validación del formulario de acceso.
- **F02 — Autenticación:** validación de credenciales, estado de cuenta, manejo de intentos fallidos y sesión.
- **F03 — Control de acceso:** autorización de funciones según el rol Administrador o Vendedor.

El sistema de muestra incluido implementa únicamente estos flujos con cuentas y datos sintéticos. No se evalúan inventario, productos, ventas, créditos, entregas, reportes ni una integración real con producción.

### 2.2 Referencias

1. `../Actividad/contenidoPlan.txt` — estructura requerida para el informe.
2. `../Actividad/Plan_de_Pruebas_de_Software_ISO_29119-3.pdf` — guía de la actividad final.
3. `../ContextoTrabajosEchoAntes/trabajo.md` — alcance, talleres, riesgos y casos de prueba ya trabajados por el equipo.
4. Material de clase sobre fundamentos, diseño y documentación de pruebas.
5. ISO/IEC/IEEE 29119-3:2013, *Software and systems engineering — Software testing — Part 3: Test documentation*.
6. ISO/IEC/IEEE 29119-4, como referencia para técnicas de diseño de pruebas.

### 2.3 Conformidad y adaptación (*tailoring*)

Este trabajo **no declara conformidad íntegra ni certificación** frente a ISO/IEC/IEEE 29119. Se adopta una adaptación académica de la estructura de documentación y de los conceptos de gestión basada en riesgos y trazabilidad, proporcional al alcance del módulo y al tiempo disponible.

Se limita el trabajo a un plan propio para Modalab (no una plantilla prefabricada), una matriz de riesgos, condiciones y 23 casos de prueba, procedimientos, datos/entorno, criterios de salida y estimaciones. Se excluyen auditoría formal, independencia organizacional de QA, cobertura completa de procesos del ciclo de vida, certificación, pruebas de penetración, pruebas de producción y análisis estadístico operacional. Estas exclusiones reducen costo y complejidad, pero dejan riesgo residual: los resultados solo describen el prototipo y los escenarios ejecutados; no demuestran ausencia de defectos ni seguridad de un despliegue real.

Las pruebas de concurrencia se autorizan únicamente contra el entorno local aislado y con datos sintéticos. No se ejecutarán cargas contra servicios externos, producción o sistemas de terceros. El prototipo usa un costo de scrypt reducido para cumplir la meta académica medida en cuatro núcleos; no es una configuración recomendada para producción y debe sustituirse antes de cualquier despliegue real. La guía solicita control de versiones en GitHub y un release vinculado; este entregable queda en el repositorio Git local del proyecto, sin remoto ni release publicados. Vincular el repositorio remoto y el release requiere que el equipo indique el destino y autorice su publicación.

### 2.4 Glosario

| Término | Definición usada en este plan |
|---|---|
| Caso de prueba (TC) | Condiciones, datos, acciones y resultados esperados para una verificación reproducible |
| Condición de prueba (CP) | Regla o comportamiento verificable derivado de una característica y un riesgo |
| RBAC | Control de acceso basado en roles |
| P1 / P2 / P3 | Prioridad alta / media / baja de ejecución |
| Severidad | Impacto de un defecto sobre seguridad, operación o comprensión |
| Exposición | Producto de probabilidad por impacto, en una escala de 1 a 9 |
| Retest | Repetición del caso que reveló un defecto, después de su corrección |
| Regresión | Ejecución de pruebas existentes para detectar efectos colaterales de cambios |

## 3. Contexto de las pruebas

### 3.1 Elementos de prueba

| ID | Elemento | Actor principal | En alcance | Justificación |
|---|---|---|---|---|
| F01 | Inicio de sesión | Administrador o Vendedor | Sí | Punto de entrada del módulo y origen de las sesiones |
| F02 | Autenticación y estado de cuenta | Servicio de autenticación | Sí | Impide el acceso con credenciales inválidas o cuentas inactivas/bloqueadas |
| F03 | Autorización por roles | Administrador y Vendedor | Sí | Evita que un rol acceda a funciones no autorizadas |
| F04 | Gestión de productos | Administrador | No | Está fuera del módulo de autenticación priorizado |
| F05 | Ventas y créditos | Vendedor / Administrador | No | Flujo operativo no implementado en el prototipo |
| F06 | Entregas y envíos | Personal de tienda | No | Fuera del alcance académico definido |
| F07 | Reportes y analítica | Administrador | No | Fuera del alcance académico definido |

### 3.2 Alcance y exclusiones de las pruebas

**Incluido:** validación de entradas; credenciales correctas e incorrectas; cuentas activas e inactivas; bloqueo al tercer intento fallido consecutivo; persistencia y cierre de sesión; rutas y API protegidas por rol; casos negativos y expiración de sesión; pruebas unitarias, de integración/API, de interfaz y carga local acotada.

**Excluido:** altas y recuperación de usuarios, cambio de contraseña, segundo factor, federación/SSO, integración con sistemas reales, gestión funcional de tienda, auditoría formal, compatibilidad exhaustiva de dispositivos, pruebas de penetración y cualquier carga contra un entorno no local.

### 3.3 Suposiciones y restricciones

- Se cuenta con una versión del prototipo y un entorno local controlado con Node.js 22, Next.js, SQLite y navegador Chromium.
- Las identidades, roles y contraseñas de ensayo son ficticios; no se usan datos personales ni credenciales reales.
- Los roles del alcance son Administrador y Vendedor. La matriz final de permisos de negocio debe ser confirmada por el equipo.
- La guía final solicita cuatro integrantes; los trabajos previos solo identifican a tres y dejan un cuarto como “No aplica”. Debe confirmarse antes de atribuir cargas y responsabilidades finales.
- Regla de bloqueo adoptada del taller: el tercer intento fallido consecutivo bloquea temporalmente la cuenta; los intentos primero y segundo no la bloquean. La duración exacta del bloqueo es una configuración del prototipo y debe confirmarse antes de fijar la prueba temporal.
- Los resultados de rendimiento dependen del equipo, sistema operativo y carga concurrente; deben registrarse junto con la medición y no generalizarse a producción.
- Las estimaciones son esfuerzo-persona, no duración calendario garantizada.

### 3.4 Partes interesadas

| Parte interesada | Interés / responsabilidad |
|---|---|
| Docente | Revisa la alineación con la actividad y aprueba el entregable |
| Equipo Modalab | Define alcance y reglas, prepara datos, ejecuta y reporta pruebas |
| Administrador de tienda (actor) | Accede a las funciones administrativas autorizadas |
| Vendedor (actor) | Usa funciones asignadas a su rol y no debe elevar privilegios |
| Responsable de desarrollo | Corrige defectos y entrega una versión identificable para retest |

## 4. Gestión de riesgos y matriz de exposición

### 4.1 Escala y método

Probabilidad (P) e impacto (I) se califican de 1 a 3. La exposición se calcula como **E = P × I**: 1–2 baja, 3–4 baja, 6 media y 9 alta. El equipo tratará obligatoriamente los riesgos de exposición alta con pruebas priorizadas. La evaluación es cualitativa y deberá revisarse si cambian alcance, diseño o entorno.

### 4.2 Matriz de riesgos

| ID | Tipo | Riesgo | P | I | E / nivel | Tratamiento y pruebas | Riesgo residual |
|---|---|---|---:|---:|---|---|---|
| RP-01 | Producto | El endpoint de autenticación se degrada bajo concurrencia y produce errores o demoras | 3 | 3 | 9 / Alto | CP-04 / A06, carga local de 50 VU; medir latencia y errores | Escenarios, hardware y volúmenes no ensayados |
| RP-02 | Producto | Fallos en los flujos principales de ingreso, sesión o salida | 2 | 3 | 6 / Medio | CP-02/03/06; M07–M12 y A02–A04 | Casos no contemplados y cambios posteriores |
| RP-03 | Producto | Una cuenta sin autorización obtiene acceso a funciones de otro rol | 2 | 3 | 6 / Medio | CP-05; M13–M14 y A05, UI y API | Errores de configuración o amenazas no simuladas |
| RP-04 | Producto | Entradas inválidas o sesiones expiradas generan errores no controlados | 3 | 2 | 6 / Medio | CP-01/06; M03–M07, M15–M16 y A01/A04 | Combinaciones de entrada no incluidas |
| RY-01 | Proyecto | El entorno de prueba difiere del entorno objetivo | 3 | 3 | 9 / Alto | CP-07 / M01, preparación reproducible Docker y comprobación de datos/versiones | Diferencias con infraestructura productiva inexistente en el prototipo |
| RY-02 | Proyecto | Retrasos de desarrollo reducen cobertura y tiempo de retest | 3 | 3 | 9 / Alto | CP-08 / M02, hitos de entrada/salida, dependencias WBS y priorización | Retraso extremo puede limitar alcance |
| RY-03 | Proyecto | Conocimiento técnico desigual retrasa diseño o ejecución | 2 | 2 | 4 / Bajo | CP-09 / M17, glosario, instrucciones y checklist | Curva de aprendizaje y errores humanos |
| RY-04 | Proyecto | Cambios no controlados amplían el alcance y obligan a rediseñar pruebas | 3 | 2 | 6 / Medio | CP-08 / M02, control de versión y actualización de trazabilidad | Cambios tardíos o no comunicados |

### 4.3 Tratamiento

RP-01, RY-01 y RY-02 se tratan como prioritarios y tienen cobertura explícita: A06 mide concurrencia solo en localhost; M01 comprueba el entorno reproducible; M02 verifica el control de versión, preparación y puertas de entrada. Los demás riesgos se cubren con los casos manuales y automatizados trazados abajo. RY-03 se acepta con mitigación documental de bajo costo; no requiere automatización especializada. Todo riesgo aceptado debe quedar visible en el reporte de cierre.

## 5. Estrategia de pruebas y derivación de casos

### 5.1 Condiciones de prueba derivadas

| CP | Característica / riesgo | Condición verificable |
|---|---|---|
| CP-01 | F01/F02 — RP-04 | Las clases válidas e inválidas de correo/contraseña y sus límites se validan en cliente y API |
| CP-02 | F02 — RP-02 | Credenciales correctas/incorrectas y estado activo/inactivo producen acceso o denegación esperados |
| CP-03 | F02 — RP-02 | Los fallos consecutivos producen transición Activo → Bloqueado al intento 3 |
| CP-04 | F01/F02 — RP-01 | Cincuenta solicitudes válidas concurrentes al endpoint local terminan con 100% HTTP 200 y promedio ≤ 2 s |
| CP-05 | F03 — RP-03 | Solo los roles autorizados pueden consultar cada ruta y endpoint |
| CP-06 | F02 — RP-02/RP-04 | La sesión se crea, persiste, expira y revoca conforme a sus estados |
| CP-07 | AMB-01 — RY-01 | La versión, el entorno y los datos sintéticos pueden prepararse y repetirse de forma segura |
| CP-08 | Proyecto — RY-02/RY-04 | Versión, cambios, hitos y criterios de entrada/salida quedan identificados antes de ejecutar |
| CP-09 | F01/F02/F03 — RY-03 | Mensajes, instrucciones y permisos visibles son comprensibles y coherentes con la guía del equipo |

### 5.2 Técnicas de diseño

- **Valores límite:** intentos fallidos 2/3/4; volumen de 50 solicitudes concurrentes; límites de longitud y campos vacíos.
- **Tabla de decisión:** combinación de credenciales correctas/incorrectas, cuenta activa/inactiva y rol Administrador/Vendedor.
- **Transición de estados:** no autenticado → autenticado; no autenticado → bloqueado; autenticado → sesión cerrada/expirada.
- **Partición de equivalencia:** correo válido/ inválido, contraseña presente/ausente, rol permitido/no permitido.
- **Checklist y exploración guiada:** coherencia de mensajes, navegación y permisos visibles.
- En el catálogo de 23 casos se indica por caso la técnica, la regla de generación de datos y el valor esperado; no se usan combinaciones intuitivas sin fundamento.

### 5.3 Casos de prueba y trazabilidad bidireccional

La guía final exige **20–24 casos por equipo**, con **15–18 manuales y 5–6 automatizados**. Se diseñan **23 casos: 17 manuales (M01–M17) y 6 automatizados (A01–A06)**, equivalentes a 5–6 por integrante si se confirma el cuarto integrante. El catálogo con datos, precondiciones, pasos, resultados y fundamento matemático está en `../proyecto-modalab/tests/manual/casos-de-prueba.md`.

| Riesgo | Condición | Casos que lo cubren |
|---|---|---|
| RP-01 | CP-04 | A06 |
| RP-02 | CP-02, CP-03, CP-06 | M07–M12; A02–A04 |
| RP-03 | CP-05 | M13–M14; A05 |
| RP-04 | CP-01, CP-06 | M03–M07, M15–M16; A01, A04 |
| RY-01 | CP-07 | M01 |
| RY-02 | CP-08 | M02 |
| RY-03 | CP-09 | M17 |
| RY-04 | CP-08 | M02 |

Trazabilidad directa e inversa: cada riesgo de la matriz conduce a condiciones y casos arriba; cada caso del catálogo incluye sus IDs de condición y riesgo. RP-01, RY-01 y RY-02 (exposición alta) tienen al menos un caso de mitigación explícito. Los casos A01–A05 se ejecutan con `npm test`/Playwright; A06 está implementado como script k6 local. Los casos manuales quedan **diseñados, pendientes de ejecución y registro de evidencia**.

### 5.4 Estado de validación técnica del prototipo

En las validaciones locales, A01–A05 pasaron con las pruebas unitarias, de integración y E2E; las pruebas unitarias y de integración se volvieron a ejecutar para esta entrega y también pasaron. `npm run lint` y `npm run build` pasaron en la última validación completa. Ninguno de estos resultados sustituye la ejecución manual de M01–M17, cuyos resultados y evidencias siguen pendientes.

Como prevalidación de concurrencia, se enviaron 50 solicitudes de inicio de sesión válidas concurrentes contra el prototipo local: 50/50 respuestas HTTP 200, promedio de 1.843 ms, p95 de 1.849 ms y máximo de 1.849 ms, en el equipo local de cuatro núcleos. Esta medición directa no equivale a ejecutar formalmente el script A06 con k6; esa corrida y su registro reproducible siguen pendientes.

El build y smoke test de Docker tuvieron una validación previa satisfactoria, pero no se pudo completar un build final de la versión actual porque Docker Engine devolvió un error interno HTTP 500. Se debe repetir el build y el smoke test de contenedor antes de considerar validada una entrega Docker.

### 5.5 Requisitos de entorno y datos

**Entorno AMB-01:** equipo de desarrollo, Docker Compose, Node.js 22, Next.js, SQLite aislada y Chromium con Playwright. La carga se ejecuta solamente contra `localhost` del prototipo. Se registra sistema operativo, CPU, memoria, ID de commit/release y configuración usada. No se conecta a producción. La publicación del repositorio/release en GitHub queda pendiente de que el equipo indique un destino remoto.

**Datos DAT-01:** cuentas sintéticas Administrador, Vendedor e Inactiva; contraseñas ficticias; estados iniciales documentados. Antes de TC-01 y TC-05 se reinicia el contador de fallos y se limpia la sesión; al terminar se eliminan sesiones y resultados temporales. No se almacenan contraseñas en texto claro ni se introducen datos reales.

### 5.6 Criterios de suspensión y finalización

**Suspender** si el entorno apunta fuera de localhost, hay riesgo de borrar datos no sintéticos, la versión bajo prueba no puede identificarse, la base de datos no se puede restaurar, aparecen errores sistémicos que invalidan resultados, o una prueba de carga afecta recursos ajenos.

**Finalizar** cuando: 100% de casos P1 diseñados se ejecutaron y sus resultados están registrados; 100% de riesgos críticos/altos está mitigado con casos y evidencia; 100% de reglas de acceso incluidas tiene resultado; para flujos secundarios se ejecutó al menos 80% de los casos diseñados; hay 0 defectos críticos/altos y como máximo 2 defectos medios y 5 bajos abiertos (solo si el equipo acepta documentarlos); A06 conserva evidencia de 50 solicitudes, status, latencia y hardware; existe retest de correcciones; y se entrega el informe de resultados. La cobertura de casos ejecutados no equivale a cobertura total del código.

## 6. Actividades de prueba y estimaciones

| ID WBS | Actividad | Esfuerzo | Dependencia | Resultado |
|---|---|---:|---|---|
| 1.0 | Preparar entorno y datos sintéticos | 12 h | — | AMB-01 y DAT-01 repetibles |
| 2.0 | Diseño documental de los 23 casos | 24 h | 1.0 | Trazabilidad, casos y procedimientos |
| 3.0 | Programar scripts automatizados (A01–A06) | 30 h | 2.0 | Unitarias, servicio, E2E y carga local |
| 4.0 | Ejecutar casos manuales y reportar defectos | 15 h | 2.0 | Evidencia M01–M17 y defectos |
| 5.0 | Retest, revisión de trazabilidad y release de cierre | 6 h | 3.0 y 4.0 | Informe de cierre y evidencia consolidada |
| **Total** |  | **87 h** |  |  |

La estimación anterior del equipo era 72 horas. Se actualiza a 87 horas para incluir el volumen obligatorio de 23 casos, la automatización diferenciada y la evidencia manual/de cierre de la guía final. La estimación respeta las dependencias y el ciclo de tres semanas. Con cuatro integrantes confirmados representa **21,75 horas por persona en total** (aprox. **7,25 horas semanales por persona**); la capacidad no se considera validada hasta asignar el cuarto integrante. Esfuerzo-persona y duración calendario no son intercambiables.

## 7. Personal

| Rol | Responsabilidades |
|---|---|
| Coordinación de pruebas | Mantener alcance, prioridades, riesgos, trazabilidad e informe |
| Diseño de pruebas | Especificar casos, datos, resultados y criterios de aceptación |
| Ejecución QA | Ejecutar casos, conservar evidencia, registrar defectos y hacer retest |
| Automatización | Programar, mantener y ejecutar los cinco/seis casos estables y scripts de carga local |
| Desarrollo | Entregar versión identificada, corregir defectos y describir cambios |
| Docente / revisor | Evaluar el cumplimiento académico y aprobar o solicitar ajustes |

Distribución propuesta: Eduardo — Test Manager; Estefanía — analista de pruebas; Santiago — automatización/ejecución; integrante 4 por confirmar — analista/ejecutor manual. La cuarta asignación y el reparto de 5–6 casos por persona deben validarse. Las pruebas de autorización se revisarán por una persona distinta de quien implementó la ruta cuando la disponibilidad lo permita.

## 8. Cronograma

Plan relativo de tres semanas; las fechas calendario deben confirmarse con el docente.

| Semana | Actividades | Hito / salida |
|---|---|---|
| 1 | Cerrar alcance y reglas; revisar riesgos; preparar entorno y datos; smoke tests | H1: versión y AMB-01 identificados; casos P1 listos |
| 2 | Ejecutar TC-01 a TC-05; concurrencia local; registrar y priorizar defectos | H2: ciclo inicial y evidencia P1/P2 |
| 3 | Retest, regresión, M17, métricas y consolidación de documentos | H3: criterios de salida evaluados e informe de cierre en Markdown y Word; publicación del release pendiente de repositorio remoto |

## Anexo A. Registro mínimo de defectos

Cada defecto debe incluir: identificador, versión/commit, caso asociado, entorno, pasos para reproducir, resultado esperado/obtenido, evidencia sin secretos, severidad, prioridad, responsable, estado, corrección y resultado del retest.

## Anexo B. Límites de interpretación

Este plan y el prototipo son recursos académicos. El cumplimiento de los casos no certifica el sistema, no demuestra que esté libre de vulnerabilidades y no sustituye revisión profesional, pruebas de seguridad autorizadas ni controles de operación. Los umbrales de aceptación de rendimiento y la duración del bloqueo deben ser ratificados por el equipo antes de presentarse como requisitos definitivos.
