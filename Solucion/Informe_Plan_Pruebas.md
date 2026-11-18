# Plan de pruebas de software — Modalab

**Proyecto:** Aplicativo administrativo de una tienda de ropa  
**Módulo evaluado:** Inicio de sesión, autenticación y control de acceso  
**Norma de referencia:** ISO/IEC/IEEE 29119-3:2013  
**Versión del documento:** 1.1
**Fecha:** 18 de noviembre de 2026  
**Autores identificados en los antecedentes:** Eduardo Deossa, Estefanía Montoya y Santiago Castaño  
**Estado de aprobación:** Borrador académico pendiente de revisión del equipo y aprobación docente

> **Alcance de este entregable.** Este documento consolida y completa el plan de pruebas solicitado en `../Actividad/contenidoPlan.txt`, usando como contexto los trabajos y talleres previos del equipo. Modalab es un proyecto propio de inicio de sesión elaborado previamente por el equipo y usado como sistema bajo prueba; no es una implementación completa de la tienda ni un sistema listo para producción. El periodo de trabajo reportado para este proyecto fue del 9 al 17 de noviembre de 2026.

## 1. Información específica del documento

### 1.1 Identificador

**MOD-PT-001 — Plan de pruebas del módulo administrativo de Modalab.**

### 1.2 Organización emisora y autores

Trabajo académico del equipo de Modalab, desarrollado para la asignatura de Ingeniería de Software / Pruebas de Software.

| Integrante | Responsabilidad propuesta |
|---|---|
| Eduardo Deossa | Aplicación de inicio de sesión y configuración básica del proyecto |
| Estefanía Montoya | Alcance, riesgos, casos manuales y documentos del plan |
| Santiago Castaño | Pruebas automatizadas, ejecución y guía de comandos |

El equipo está compuesto por estos tres integrantes. La distribución se usará para organizar los aportes en una copia nueva del proyecto.

### 1.3 Autoridad de aprobación

La aprobación final corresponde al docente y al equipo del proyecto. Sus nombres, firmas y fecha de aprobación quedan pendientes; no se presumen en este borrador.

### 1.4 Historial de cambios

| Versión | Fecha | Cambio | Autoría |
|---|---|---|---|
| 0.1 | 09/11/2026 | Inicio del periodo del proyecto propio de inicio de sesión y revisión del prototipo existente del equipo | Equipo Modalab |
| 1.0 | 17/11/2026 | Cierre del periodo de trabajo; consolidación de alcance, riesgos, casos, ejecución y estimaciones | Equipo Modalab |
| 1.1 | 18/11/2026 | Actualización de autores, cronograma, estado de A06 y propuesta para separar aportes en una copia nueva del proyecto | Equipo Modalab |

**Registro del repositorio actual:** el commit `2f3b054` (`Incluir proyecto Modalab en el repositorio`, 18/11/2026) fue creado por Eduardo Deossa e incluye la aplicación y las pruebas. La separación descrita en este informe corresponde a una copia nueva del proyecto que crearán los integrantes; todavía no es parte del historial de GitHub. La guía incluye los archivos por aporte y los mensajes sugeridos. Los hashes se anotarán después de crear los commits.

## 2. Introducción y declaración de adaptación

### 2.1 Alcance del documento

Este plan define cómo verificar el módulo administrativo del sistema Modalab. La evaluación cubre:

- **F01 — Inicio de sesión:** presentación y validación del formulario de acceso.
- **F02 — Autenticación:** validación de credenciales, estado de cuenta, manejo de intentos fallidos y sesión.
- **F03 — Control de acceso:** autorización de funciones según el rol Administrador o Vendedor.

El proyecto propio de inicio de sesión, elaborado previamente por el equipo, implementa únicamente estos flujos con cuentas y datos sintéticos. Se usa como base para verificar el plan. No se evalúan inventario, productos, ventas, créditos, entregas, reportes ni una integración real con producción.

### 2.2 Referencias

1. `../Actividad/contenidoPlan.txt` — estructura requerida para el informe.
2. `../Actividad/Plan_de_Pruebas_de_Software_ISO_29119-3.pdf` — guía de la actividad final.
3. `../ContextoTrabajosEchoAntes/trabajo.md` — trabajos previos del equipo: alcance, talleres, riesgos y casos de prueba elaborados a medida de la clase.
4. `../proyecto-modalab/README.md` — proyecto propio de inicio de sesión elaborado previamente por el equipo y usado como sistema bajo prueba.
5. Material de clase sobre fundamentos, diseño y documentación de pruebas.
6. ISO/IEC/IEEE 29119-3:2013, *Software and systems engineering — Software testing — Part 3: Test documentation*.
7. ISO/IEC/IEEE 29119-4, como referencia para técnicas de diseño de pruebas.
8. `Guia_Colaboracion_Git.md` — archivos y pasos para organizar los aportes en una copia nueva del proyecto.

### 2.3 Conformidad y adaptación (*tailoring*)

Este trabajo **no declara conformidad íntegra ni certificación** frente a ISO/IEC/IEEE 29119. Se adopta una adaptación académica de la estructura de documentación y de los conceptos de gestión basada en riesgos y trazabilidad, proporcional al alcance del módulo y al tiempo disponible.

Se limita el trabajo a un plan para Modalab, una matriz de riesgos, condiciones y 23 casos de prueba, procedimientos, datos/entorno, criterios de salida y estimaciones. El repositorio actual está en GitHub y su rama `main` estaba sincronizada con `origin/main` al revisarla el 18/11/2026. La separación de aportes se hará en otra copia del proyecto y no modifica ese historial. El release de GitHub sigue pendiente. Se excluyen auditoría formal, independencia organizacional de QA, certificación, pruebas de producción y análisis estadístico operacional.

Las pruebas de concurrencia se ejecutan contra el entorno local y con datos sintéticos. El costo de scrypt del prototipo está configurado para la medición académica y no debe usarse como referencia para producción. El commit actual incluye la aplicación y las pruebas en un solo cambio. Los commits separados se crearán en un repositorio nuevo, según la guía de colaboración.

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
- El equipo reportado para este proyecto está compuesto por Eduardo Deossa, Estefanía Montoya y Santiago Castaño; la distribución de responsabilidades se detalla en 1.2 y 7.
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
| RY-01 | Proyecto | El entorno de prueba difiere del entorno objetivo | 3 | 3 | 9 / Alto | CP-07 / M01, preparación local reproducible con Node.js/npm y comprobación de datos/versiones | Diferencias con infraestructura productiva inexistente en el prototipo |
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

La guía final exige **20–24 casos por equipo**, con **15–18 manuales y 5–6 automatizados**. Se diseñan **23 casos: 17 manuales (M01–M17) y 6 automatizados (A01–A06)**. La distribución propuesta entre los tres integrantes es por responsabilidad: Eduardo mantiene la aplicación base; Estefanía lidera los casos manuales y la documentación; Santiago lidera la automatización. El catálogo con datos, precondiciones, pasos, resultados y fundamento matemático está en `../proyecto-modalab/tests/manual/casos-de-prueba.md`.

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

Trazabilidad directa e inversa: cada riesgo de la matriz conduce a condiciones y casos arriba; cada caso del catálogo incluye sus IDs de condición y riesgo. RP-01, RY-01 y RY-02 (exposición alta) tienen al menos un caso de mitigación explícito. A01–A04 se ejecutan con `npm test`, A05 con Playwright, A06 con k6 y el comando `npm run test:all` reúne todas las pruebas automatizadas. Los casos manuales M01–M17 requieren ejecución y registro de evidencia por separado.

### 5.4 Estado de validación técnica del prototipo

En la validación local del 18/11/2026, A01–A04 pasaron (2 pruebas unitarias y 4 de integración); `npm run lint` y `npm run build` también pasaron. A05 consta como ejecutada anteriormente con Playwright. Ninguno de estos resultados sustituye la ejecución manual de M01–M17, cuyos resultados y evidencias siguen pendientes.

**Ejecución A06 con k6 (18/11/2026, posterior al periodo del proyecto):** se completaron 50 de 50 solicitudes y todas respondieron HTTP 200; `checks` fue 100% y `http_req_failed` 0%. Sin embargo, `http_req_duration` registró promedio de 4.61 s, p95 de 5.63 s y máximo de 5.73 s. El promedio excede el umbral configurado de menos de 2 s, por lo que A06 **no aprobó el criterio de rendimiento** aunque las solicitudes funcionaron. Se requiere optimización y retest; esta medición no se debe presentar como aprobada.

La validación de la entrega se realiza en el entorno local documentado en el README del prototipo: instalar dependencias, ejecutar pruebas y completar el build con Node.js/npm.

### 5.5 Requisitos de entorno y datos

**Entorno AMB-01:** equipo de desarrollo, Node.js 22.18 o superior, npm, Next.js, SQLite aislada y Chromium con Playwright. k6 se requiere solo para la prueba de carga A06. La carga se ejecuta solamente contra `localhost` del prototipo. Se registra sistema operativo, CPU, memoria, ID de commit/release y configuración usada. No se conecta a producción. El repositorio está en GitHub; la publicación de un release sigue pendiente.

**Datos DAT-01:** cuentas sintéticas Administrador, Vendedor e Inactiva; contraseñas ficticias; estados iniciales documentados. Antes de TC-01 y TC-05 se reinicia el contador de fallos y se limpia la sesión; al terminar se eliminan sesiones y resultados temporales. No se almacenan contraseñas en texto claro ni se introducen datos reales.

### 5.6 Criterios de suspensión y finalización

**Suspender** si el entorno apunta fuera de localhost, hay riesgo de borrar datos no sintéticos, la versión bajo prueba no puede identificarse, la base de datos no se puede restaurar, aparecen errores sistémicos que invalidan resultados, o una prueba de carga afecta recursos ajenos.

**Finalizar** cuando: 100% de casos P1 diseñados se ejecutaron y sus resultados están registrados; 100% de riesgos críticos/altos está mitigado con casos y evidencia; 100% de reglas de acceso incluidas tiene resultado; para flujos secundarios se ejecutó al menos 80% de los casos diseñados; hay 0 defectos críticos/altos y como máximo 2 defectos medios y 5 bajos abiertos (solo si el equipo acepta documentarlos); A06 conserva evidencia de 50 solicitudes, status, latencia y hardware; existe retest de correcciones; y se entrega el informe de resultados. La cobertura de casos ejecutados no equivale a cobertura total del código.

## 6. Actividades de prueba y estimaciones

| ID WBS | Actividad | Esfuerzo | Dependencia | Resultado |
|---|---|---:|---|---|
| 1.0 | Revisar el proyecto propio de inicio de sesión existente, preparar entorno y datos | 8 h | — | AMB-01 y DAT-01 repetibles |
| 2.0 | Revisar talleres, alcance, riesgos y condiciones de prueba | 10 h | 1.0 | Matriz de riesgos y CP-01–CP-09 |
| 3.0 | Diseñar los 23 casos manuales y automatizados | 12 h | 2.0 | Trazabilidad, datos, pasos y resultados esperados |
| 4.0 | Implementar y preparar automatización A01–A06 | 34 h | 3.0 | Unitarias, integración, E2E y carga local |
| 5.0 | Ejecutar casos manuales y registrar hallazgos | 15 h | 3.0 | Evidencia M01–M17 y defectos |
| 6.0 | Retest, regresión y consolidación del informe | 8 h | 4.0 y 5.0 | Informe de cierre y evidencia consolidada |
| **Total** |  | **87 h** |  |  |

La estimación de **87 horas-persona** es una propuesta para las actividades de prueba, no incluye volver a desarrollar el prototipo de inicio de sesión ya existente. Entre tres integrantes equivale a un promedio de **29 horas-persona por integrante** durante el periodo; el reparto real puede variar según la responsabilidad. Esfuerzo-persona y duración calendario no son intercambiables.

## 7. Personal

| Rol | Responsabilidades |
|---|---|
| Coordinación de pruebas | Mantener alcance, prioridades, riesgos, trazabilidad e informe |
| Diseño de pruebas | Especificar casos, datos, resultados y criterios de aceptación |
| Ejecución QA | Ejecutar casos, conservar evidencia, registrar defectos y hacer retest |
| Automatización | Programar, mantener y ejecutar los seis casos automatizados y el script de carga local |
| Desarrollo | Entregar versión identificada, corregir defectos y describir cambios |
| Docente / revisor | Evaluar el cumplimiento académico y aprobar o solicitar ajustes |

Distribución propuesta para la copia nueva:

- **Eduardo Deossa:** `src/`, `public/` y configuración de la aplicación.
- **Estefanía Montoya:** `tests/manual/casos-de-prueba.md` y los documentos de `Solucion/`.
- **Santiago Castaño:** pruebas automatizadas A01–A06, `scripts/`, `playwright.config.ts`, comandos de prueba y `README.md`.

La distribución corresponde a la copia nueva del proyecto y no modifica el commit existente `2f3b054`. Ese commit conserva la aplicación y las pruebas en un solo cambio. Los nombres, mensajes y archivos de la secuencia propuesta están en `Guia_Colaboracion_Git.md`; se registrarán los hashes cuando se creen los commits.

## 8. Cronograma

El periodo reportado por el equipo fue del **09/11/2026 al 17/11/2026**. La siguiente distribución reconstruye las actividades de prueba y sus estimaciones dentro de esas fechas; los esfuerzos por actividad y responsables son una propuesta y deben contrastarse con la bitácora real. El 14 y 15 de noviembre fueron fin de semana y no se asigna esfuerzo.

| Fecha | Actividades y responsables propuestos | Esfuerzo / salida prevista |
|---|---|---|
| 09/11/2026 | Revisar el prototipo propio existente, identificar versión y preparar entorno/datos. Responsables: Eduardo y Estefanía. | 8 h — AMB-01, DAT-01 y alcance inicial |
| 10/11/2026 | Revisar talleres, acordar alcance y reglas, analizar riesgos y derivar condiciones. Responsables: Eduardo y Estefanía. | 10 h — riesgos priorizados y CP-01–CP-09 |
| 11/11/2026 | Diseñar los 17 casos manuales, datos, pasos, resultados y trazabilidad. Responsable: Estefanía. | 12 h — catálogo manual |
| 12/11/2026 | Preparar y ejecutar pruebas unitarias e integración A01–A04. Responsable: Santiago. | 18 h — resultados técnicos y defectos |
| 13/11/2026 | Preparar E2E A05 y carga A06; ejecutar el ciclo automatizado inicial. Responsables: Santiago y Eduardo. | 16 h — evidencia y mediciones |
| 14–15/11/2026 | Fin de semana; sin actividades planificadas. | 0 h |
| 16/11/2026 | Ejecutar casos manuales priorizados y registrar resultados/evidencia. Responsables: Estefanía y Santiago. | 15 h — estado M01–M17 y defectos |
| 17/11/2026 | Retest, regresión, revisar trazabilidad y cerrar informe. Responsables: los tres integrantes. | 8 h — cierre y entregables |
| **Total estimado** |  | **87 h** |

La ejecución manual se mantiene pendiente cuando no exista evidencia registrada. La medición A06 informada el 18/11/2026 se realizó después del periodo de trabajo y se registra como seguimiento, no como una actividad concluida dentro del cronograma.

## Anexo A. Registro mínimo de defectos

Cada defecto debe incluir: identificador, versión/commit, caso asociado, entorno, pasos para reproducir, resultado esperado/obtenido, evidencia sin secretos, severidad, prioridad, responsable, estado, corrección y resultado del retest.

## Anexo B. Límites de interpretación

Este plan y el prototipo son recursos académicos. El cumplimiento de los casos no certifica el sistema, no demuestra que esté libre de vulnerabilidades y no sustituye revisión profesional, pruebas de seguridad autorizadas ni controles de operación. Los umbrales de aceptación de rendimiento y la duración del bloqueo deben ser ratificados por el equipo antes de presentarse como requisitos definitivos.
