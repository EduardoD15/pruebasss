# Guía y prompt para la presentación de Modalab

Este documento reúne el contenido que debe entregarse a una IA para preparar las diapositivas. Adjunta también `Solucion/Informe_Plan_Pruebas.md`, `ContextoTrabajosEchoAntes/trabajo.md` y, si la IA puede leer código, la carpeta `proyecto-modalab`.

## Datos para la presentación

- **Proyecto:** Modalab, prototipo académico de inicio de sesión, autenticación y permisos por rol para el módulo administrativo de una tienda de ropa.
- **Alcance:** F01 inicio de sesión, F02 autenticación y sesiones, F03 autorización por roles Administrador y Vendedor. No incluye productos, ventas, entregas ni reportes.
- **Periodo informado:** 09/11/2026 al 17/11/2026. La corrida de k6 compartida más recientemente es seguimiento posterior al periodo.
- **Herramientas:** Node.js, npm, Next.js, TypeScript, SQLite local, Playwright y k6. No se requiere Docker.
- **Ejecución de k6:** se instaló con Winget. Si PowerShell no reconoce `k6`, se puede volver a abrir la terminal o invocar `C:\Program Files\k6\k6.exe` directamente.
- **Casos diseñados:** 17 manuales (M01–M17) y 6 automatizados (A01–A06). Los manuales están diseñados, pero no hay evidencia de que se hayan ejecutado.
- **Automatización:** A01 pruebas unitarias; A02–A04 integración; A05 navegador y autorización por rol; A06 50 solicitudes de inicio de sesión concurrentes con k6, solo contra localhost.
- **Matriz:** `trabajo.md` contiene una matriz inicial con códigos R-01 repetidos para riesgos de producto y proyecto. El informe final usa códigos distintos: RP-01–RP-04 para producto y RY-01–RY-04 para proyecto. Para la diapositiva, usa la matriz del informe final porque sus riesgos están vinculados a los casos de prueba; explica que parte de la matriz se elaboró en los talleres.
- **Estimación del informe:** 87 horas-persona propuestas para el ciclo de pruebas. No es un registro de horas verificadas.

### Resultados que sí se pueden presentar

1. En la salida compartida de `npm run test:all`, A01–A04 pasaron: 2 pruebas unitarias y 4 de integración. A05 pasó: 2 pruebas de navegador.
2. Lint mostró 0 errores y 1 advertencia por la importación no utilizada `isAbsolute` en `scripts/test-all.ts`.
3. La salida compartida no muestra el resultado del build ni el final del comando `test:all`; no afirmar que toda la ejecución terminó correctamente.
4. En una corrida anterior de k6, 50/50 solicitudes respondieron HTTP 200 y no hubo errores HTTP, pero el promedio fue 4.61 s y p95 5.63 s. Cumplió el envío de solicitudes, pero no el umbral de latencia promedio menor de 2 s.
5. En la corrida de k6 más reciente compartida, 0/50 checks de inicio de sesión pasaron y `http_req_failed` fue 100%. El promedio fue 1.23 s, por debajo del umbral de 2 s, pero no se cumplió el criterio funcional ni el de errores.
6. Son dos corridas diferentes y con resultados distintos. No combinarlas ni presentar A06 como aprobado. La salida más reciente no incluye el código HTTP recibido. Una contraseña de prueba ausente o distinta de `MODALAB_ADMIN_PASSWORD` es una posible causa; debe verificarse y repetirse la prueba antes de cerrar resultados.

### Riesgos para destacar

La matriz final calcula exposición como **P × I**, con probabilidad e impacto de 1 a 3:

| Riesgo final | Exposición | Qué significa | Prueba o tratamiento |
|---|---:|---|---|
| RP-01 | 9, alto | El inicio de sesión puede degradarse bajo concurrencia | A06 mide 50 solicitudes, errores y latencia en local |
| RY-01 | 9, alto | El entorno de prueba puede diferir del entorno objetivo | M01 prepara y verifica el entorno local |
| RY-02 | 9, alto | Los retrasos pueden reducir cobertura y tiempo de retest | M02 controla versión, hitos y entrada/salida |
| RP-02 / RP-03 / RP-04 | 6, medio | Fallos de flujo, acceso por rol o validación/sesión | A01–A05 y casos manuales relacionados |
| RY-03 | 4, bajo | Diferencias de conocimiento pueden demorar las pruebas | Guía, glosario y M17 |

No presentar la matriz como una auditoría de seguridad. Las pruebas revisan comportamientos definidos del prototipo y no demuestran que esté libre de vulnerabilidades ni listo para producción.

## Prompt para copiar en la IA de diapositivas

```text
Prepara una presentación académica en español sobre el proyecto Modalab y su plan de pruebas. Usa la información de este documento y los archivos adjuntos: Informe_Plan_Pruebas.md, ContextoTrabajosEchoAntes/trabajo.md y el código/README de proyecto-modalab si están disponibles.

La audiencia es el docente y el equipo. Prepara 10–12 diapositivas para una exposición de 8–10 minutos. Usa frases cortas, términos técnicos explicados y un diseño claro. Incluye notas breves para quien expone y una diapositiva final de fuentes. No inventes datos, resultados, fechas, defectos corregidos ni integrantes. Si una información no está confirmada, márcala como pendiente.

Orden sugerido:
1. Portada: Modalab, módulo de autenticación y equipo de tres integrantes.
2. Contexto: qué es Modalab y por qué se eligió el inicio de sesión como sistema bajo prueba.
3. Alcance: F01 inicio de sesión, F02 autenticación/sesiones y F03 permisos por rol; indicar qué módulos quedan fuera.
4. Cómo funciona el prototipo: cuentas sintéticas de Administrador, Vendedor e Inactiva; validación de credenciales, bloqueo temporal, sesión y autorización. Usa un diagrama sencillo, sin revelar contraseñas.
5. Estrategia: 17 casos manuales y 6 automatizados; explicar los grupos unitario, integración, navegador y carga. Señalar que los manuales todavía están pendientes de ejecución.
6. Matriz de riesgos: explicar P × I y mostrar los riesgos principales RP-01, RY-01 y RY-02 con exposición 9/alta. Añadir ejemplos de riesgos medios y cómo se trazan a casos. Usa los códigos RP/RY del informe final. Aclara que trabajo.md contiene la matriz de taller inicial con códigos R-01 repetidos para producto y proyecto.
7. Herramientas y ejecución: Node.js/npm, Next.js, SQLite local, Playwright y k6. Explicar que no se usa Docker y que k6 se instala aparte para A06. Si PowerShell no reconoce `k6`, mencionar que se reabrió la terminal o se usó `C:\Program Files\k6\k6.exe`. Mostrar el flujo npm de forma resumida.
8. Resultados de A01–A05: 2 unitarias, 4 de integración y 2 de navegador pasaron en la salida compartida. Mencionar que lint tuvo cero errores y una advertencia por una importación no utilizada.
9. A06 y rendimiento: distinguir claramente las dos corridas k6. Corrida anterior: 50/50 HTTP 200, errores 0%, promedio 4.61 s y p95 5.63 s; no alcanzó el umbral promedio <2 s. Corrida más reciente: 0/50 checks correctos, http_req_failed 100%, promedio 1.23 s; alcanzó el umbral de promedio, pero falló el criterio de respuesta exitosa y errores. No mezcles las dos corridas. La segunda salida no muestra los códigos HTTP.
10. Qué aprendimos y qué falta: verificar LOGIN_PASSWORD frente a MODALAB_ADMIN_PASSWORD, repetir A06 en una sesión con la configuración documentada, guardar la salida completa y revisar el warning de lint. No atribuyas la causa de los fallos sin confirmarla.
11. Cierre: A01–A05 tienen resultados favorables en la salida compartida; A06 sigue sin aprobarse; M01–M17 necesitan ejecución y evidencia. Los resultados corresponden al prototipo local y no a producción.
12. Fuentes: Informe_Plan_Pruebas.md, trabajo.md, README.md, pruebas de tests/ y salida de consola compartida.

Incluye una tabla o gráfico sencillo para la matriz y una tabla separada para los resultados. Usa colores con significado (por ejemplo, verde para pruebas aprobadas, amarillo para advertencias y rojo para criterios fallidos), pero no uses un color como sustituto de explicar el resultado. No describas el sistema como seguro, completo ni listo para producción. No presentes las 87 horas-persona como horas registradas; son una estimación del informe.

Entrega el contenido de cada diapositiva con: título, hasta cinco viñetas, sugerencia visual y notas para exponer. Mantén un tono directo, sin párrafos largos.
```
