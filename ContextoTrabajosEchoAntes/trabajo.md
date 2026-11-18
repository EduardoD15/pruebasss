**Plan de Pruebas de Software – Actividad de Clase 2** | **ISO/IEC/IEEE 29119-3**

# ACTIVIDAD DE CLASE 2
## Identificación del Objeto de Prueba (*Test Items*)
**Norma:** ISO/IEC/IEEE 29119-3:2013 | **Duración:** 60 minutos

---

| EQUIPO DE TRABAJO (Desarrolladores) | EQUIPO REVISOR (Evaluadores) |
| :--- | :--- |
| **Sistema:** Madelah | **Equipo No.:** |
| **Fecha:** 24/03/2026 | |
| **Integrantes:**<br>1. Esteban Deosa<br>2. Estefania Montoya<br>3. Santiago Castaño<br>4. |

---

### 1. Propósito y Marco Teórico

En la Actividad 1 se definieron la metodología, el objetivo y el alcance general del plan de pruebas. En esta actividad se avanza a identificar los elementos concretos del sistema que serán objeto de prueba (*test items*).

De acuerdo con la norma ISO/IEC/IEEE 29119-3:2013, los *test items* corresponden a los módulos, componentes o funcionalidades susceptibles de ser evaluados. En esta fase no se diseñan casos de prueba detallados; se delimita qué se probará, bajo qué condiciones y con qué prioridad.

### 2. Identificación y Delimitación del Objeto de Prueba

*Retomen el sistema de la Actividad 1 e identifiquen entre 6 y 7 funcionalidades clave. Indiquen qué hace cada elemento, quién interactúa con él, si se incluye en el alcance y la razón técnica.*

| ID | Elemento / Funcionalidad | ¿Qué hace? / Actor Principal | ¿En Alcance? | Justificación de Selección o Exclusión |
| :--- | :--- | :--- | :--- | :--- |
| **F01** | Inicio de sesión | Verificar entradas | [x] Sí / [ ] No | Es un módulo clave en seguridad |
| **F02** | Autenticación | Valida entradas con base de datos | [x] Sí / [ ] No | Módulo clave para seguridad |
| **F03** | Control de acceso | Verifica roles | [x] Sí / [ ] No | Clave en seguridad |
| **F04** | Gestión de productos | Agrega productos | [ ] Sí / [x] No | No se usa en login |
| **F05** | Gestión ventas | Valida saldo y precios | [ ] Sí / [x] No | Módulo operativo del sistema |
| **F06** | Entregas | Valida distancia y tiempo | [ ] Sí / [x] No | No hace parte del alcance |
| **F07** | Reportes | Ventas en el mes | [ ] Sí / [x] No | No hace parte del alcance |

---

**Plan de Pruebas de Software – Actividad de Clase 2** | **ISO/IEC/IEEE 29119-3**

# ACTIVIDAD DE CLASE 2: Condición y Priorización de Pruebas

---

### 3. Condiciones de Prueba: Precondiciones y Criterios de Aceptación

*Seleccionen tres funcionalidades incluidas en el alcance y describan las condiciones iniciales de entrada y el resultado esperado que validaría su correcto funcionamiento.*

| ID | Precondiciones / Datos de Entrada | Resultado Esperado / Criterio de Aceptación |
| :--- | :--- | :--- |
| **F01** | Verificar datos del login | Con datos correctos ingresan a la página |
| **F02** | Validación en base de datos | Verifica si los usuarios existen y sus roles |
| **F03** | El usuario entra solo a módulos de su rol | Lo rechaza los módulos que no corresponden a su rol |

---

### 4. Priorización del Objeto de Prueba

*Identifiquen tres elementos prioritarios para el proceso de pruebas. Justifiquen su elección según criterios técnicos o de negocio: Criticidad para el usuario, Complejidad técnica/integración, Frecuencia de uso o Impacto ante fallas.*

| Prioridad | Elemento (ID y Nombre) | Justificación del Criterio de Priorización |
| :--- | :--- | :--- |
| **1 (Alta)** | 03 | Módulo crítico debido a sus funcionalidades |
| **2 (Media)** | 01 | Módulos críticos en seguridad |
| **3 (Media)** | 02 | Módulo crítico en seguridad |

---
# INICIO DEL PLAN DE PRUEBAS

### 1. Identificación del Proyecto y Equipo

| Campo | Detalle |
| :--- | :--- |
| **Nombre del Sistema** | Modalab -> Aplicativo de administración |
| **Fecha** | 17/03/2026 |
| **Descripción Breve** | Aplicación de administración de una tienda de ropa para hacer solicitudes de pedidos y parte analítica de la tienda. |
| **Integrantes** | • Eduardo Deossa<br>• Estefanía Montoya<br>• Santiago Castaño |

---

### 2. Metodología de Desarrollo

| Campo | Detalle |
| :--- | :--- |
| **Enfoque** | [ ] Tradicional (Fases/Etapas) \| [x] Ágil (Iteraciones/Incrementos) |
| **Justificación** | Para abarcar varios módulos del sistema a la vez y de forma ordenada la distribución de tareas y así mismo el buen manejo del tiempo y la entrega de los objetivos. |

---

### 3. Título y Objetivo General

| Campo | Detalle |
| :--- | :--- |
| **Título Propuesto** | Plan de pruebas de Autenticación, control de acceso y gestión de permisos del módulo Administrativo de una tienda de ropa (Moda lab) |
| **Preguntas Guía** | • ¿Qué se va a probar y evaluar?<br>• ¿Por qué se realizan las pruebas?<br>• ¿Qué módulo/versión abarca? |
| **Objetivo General** | Evaluar la autenticación, el control de acceso y los permisos de usuario del módulo administrativo de una tienda de ropa (Moda lab), mediante pruebas que verifiquen el acceso a las funciones según cada tipo de usuario. (Playwright, Postman, Jest) |

### 4. Alcance Preliminar

| 4.1 Elementos Incluidos (Módulos / Funcionalidades) | 4.2 Elementos Excluidos y Razón |
| :--- | :--- |
| • **Inicio de sesión:** Ingreso mediante usuario y contraseña.<br>• **Autenticación:** Validación de credenciales y manejo de accesos no autorizados.<br>• **Control de acceso:** Acceso a los módulos según el tipo de usuario. | • **Gestión de productos:** No se relaciona directamente con la autenticación, acceso o permisos.<br>• **Gestión de ventas y créditos:** Corresponde a funcionalidades operativas del sistema.<br>• **Gestión de entregas y envíos:** No hace parte del alcance.<br>• **Reportes y cálculos:** No hace parte del módulo definido. |

**Ingeniería de Software / Pruebas de Software** | **Taller ISO/IEC/IEEE 29119-3**

* **Cobertura (R-01):** 100% de combinaciones de reglas de negocio. Cero defectos críticos abiertos.
* **Cobertura (R-02):** 100% de casos diseñados ejecutados. Máximo 2 defectos cosméticos abiertos.
* **Entorno (R-01):** Sandbox de pasarela de pagos con datos sintéticos multimoneda.

---

### 3. Desarrollo Práctico: Definición de la Estrategia de Pruebas

A partir de la Matriz de Riesgos previamente desarrollada para su proyecto, complete las siguientes secciones conforme a la cláusula 6.2.7 de ISO/IEC/IEEE 29119-3.

#### 3.1. Selección y Priorización de Riesgos

*Seleccione dos riesgos de alta exposición y un riesgo de baja exposición de su matriz. Defina la prioridad y el nivel de prueba requerido.*

| ID Riesgo | Módulo / Funcionalidad Afectada | Exposición | Prioridad | Nivel de Prueba |
| :--- | :--- | :--- | :--- | :--- |
| **R1** | Inicio de Sesión | Alta | P1 (Temprana) | Rendimiento de las APIs |
| **R2** | Entorno de prueba | Alta | P1 (Temprana) | Configuración del entorno |
| **R3** | Documentación | Baja | P3 (Tardía) | Pruebas estáticas |

#### 3.2. Técnicas de Diseño de Pruebas (Cláusula 6.2.7.3)

*Asigne la técnica de diseño correspondiente según el nivel de riesgo y justifique técnicamente su selección.*

**A) Para la funcionalidad de Mayor Riesgo (ID: R1)**
* **Técnica seleccionada:** Valores límites, Tablas de decisión y Transición de estados
* **Justificación técnica (límites o combinaciones críticas a evaluar):** Ya que es una exposición alta se debe tener mayor cobertura pues exige el máximo rigor técnico de las rutas y requerimientos; esto se hará mediante combinaciones críticas de acceso e intentos simultáneos al sistema, con la técnica de valores límites para definir los umbrales de usuarios concurrentes.

**B) Para la funcionalidad de Menor Riesgo (ID: R3)**
* **Técnica seleccionada:** Pruebas exploratorias, *error guessing*, lista de chequeo
* **Justificación técnica (eficiencia de recursos frente al riesgo):** 

---

**Ingeniería de Software / Pruebas de Software** | **Taller ISO/IEC/IEEE 29119-3**

*(Continuación 3.2 B - Justificación técnica)*
> Al ser una exposición baja, debido a la falta de conocimiento del personal, no justifica realizar pruebas exhaustivas. Por lo tanto se utilizarán pruebas exploratorias y listas de chequeo que permiten optimizar el tiempo y validar la comprensión de los términos.

---

### 3.3. Criterios de Finalización y Cobertura (Cláusula 6.2.7.4)

*Establezca métricas cuantitativas para determinar la culminación de la fase de pruebas.*

**A) Criterios para módulos críticos (cobertura y defectos tolerados):**
* **Cobertura:** Debe ser del 100% ya que se trata de funcionalidades críticas.
* **Defectos:** 0 defectos de severidad alta; en caso tal que se encuentren defectos que sean de severidad baja, máximo 2.

**B) Criterios para módulos secundarios:**
* **Cobertura:** Mínimo el 80% de los requerimientos funcionales entregados.
* **Defectos:** 0 defectos de severidad alta, máximo 2 de media y 5 de severidad baja.

---

### 3.4. Estimación de Esfuerzo (Cláusula 6.2.8)

*Estime el tiempo en horas requerido para las actividades del ciclo de pruebas en las semanas restantes del proyecto.*

| Actividad (WBS de Pruebas) | Horas | Descripción del trabajo a realizar |
| :--- | :--- | :--- |
| **1. Diseño de Casos de Prueba (Cl. 7.3)** | 24 | Elaboración de tablas y pruebas para todos los casos con scripts |
| **2. Preparación de Entorno y Datos** | 10 | Configurar el entorno de pruebas y sus datos con herramientas |
| **3. Ejecución (Ciclo 1) y Reporte de Defectos** | 20 | Ejecución de pruebas y categorizar defectos encontrados |
| **4. Pruebas de Regresión y Retest** | 12 | Corregir defectos y repetir pruebas |
| **5. Informe de Cierre de Pruebas (Cl. 6.4)** | 6 | Redacción de documento final del cierre de pruebas |
| **Total Estimado:** | **72** | |

---


# Matriz de riesgo


| ID  | Categoría | Descripción del riesgo  | P | I | R  | Nivel  | Estrategia de Mitigación  | Riesgo residual |
| :---- | :---- | :---- | :---: | :---: | :---: | :---: | :---- | :---- |
| R-01  | Riesgo de Producto (6.2.6.1) | Ralentización del tiempo de respuesta debido a la alta concurrencia de usuarios. | 3 | 3 | 9 | Alto | Realizar pruebas de carga y estrés, utilizando un ambiente similar al de producción | Sobrecarga en los escenarios no probados o con dependencias a producción |
| R-02 | Riesgo de Producto (6.2.6.1) | Fallas en los principales flujos de negocio | 2  | 3 | 6 | Medio | Automatizar las pruebas de regresión y priorizar los casos de pruebas críticos | Posibilidad de errores en escenarios no contemplados o cambios funcionales después de las pruebas |
| R-03 | Riesgo de Producto (6.2.6.1) | Fugas de información o vulnerabilidades en la autenticación  | 2 | 3 | 6 | Medio | Verificar los controles de acceso mediante pruebas de seguridad | Vulnerabilidades de día 0 o amenazas que no pudieron detectarse en las pruebas |
| R-04 | Riesgo de Producto (6.2.6.1) | Falta de responsividad del producto  | 3 | 2 | 6 | Medio | Definir los navegadores soportados y dispositivos soportados para ejecutar pruebas | Problemas frente a las resoluciones o versiones de navegador fuera de las definidas en las pruebas |
| R-01  | Riesgo de Proyecto (6.2.6.2)  | Ambiente de pruebas desactualizado con el de producción | 3 | 3 | 9 | Alto | Preparar scripts de para general datos para el ambiente de pruebas | Retrasos por la generación y regeneración de los datos para los casos de pruebas |
| R-02  | Riesgo de Proyecto (6.2.6.2) | Retraso de avances de pruebas por falta de actualizaciones por parte del área de desarrollo | 3 | 3 | 9 | Alto | Priorizar pruebas de humo además de dejar claro los criterios de entrada y salida para las pruebas | Cobertura parcial de las pruebas únicamente de baja prioridad |
| R-03 | Riesgo de Proyecto (6.2.6.2) | Falta de conocimiento técnico  | 2 | 2 | 4  | Bajo | Documentar los términos técnicos además de realizar jornadas en las cuales se expliquen estos términos | Retraso en los primeros días de capacitación o cuando entre personal nuevo debido a la necesidad de enseñar los términos |
| R-04 | Riesgo de Proyecto (6.2.6.2) | Modificaciones y creaciones de nuevos módulos descontrolados | 3 | 2 | 6 | Medio | Controlar los cambios en el alcance del producto para actualizar la matriz | Retraso y reajuste en las pruebas debido a los nuevos módulos |

# Taller Guiado: Planificación y Estrategia de Pruebas
## Transición de la Matriz de Riesgos al Plan de Pruebas

**Asignatura:** Ingeniería de Software / Pruebas de Software  
**Norma:** ISO/IEC/IEEE 29119-3, Cláusula 6.2 | **Duración:** 2 horas  
**Nombres:** Eduardo Deossa, Estefanía Montoya, Santiago Castaño  
**Fecha:** 24/03/2026  
**Grupo:** Proyecto Modalab (Módulo Administrativo)  

### Objetivos de aprendizaje
Al finalizar este taller el estudiante será capaz de:
* Traducir los riesgos priorizados de la matriz a decisiones técnicas de prueba.
* Seleccionar técnicas de diseño (ISO 29119-4) proporcionales a la exposición al riesgo.
* Definir criterios de finalización medibles y verificables.
* Estimar el esfuerzo del ciclo de pruebas para las semanas restantes del proyecto.

---

## 1. Fundamento Teórico: Trazabilidad entre Riesgo y Estrategia

En ISO/IEC/IEEE 29119, el nivel de exposición al riesgo determina el enfoque técnico y el rigor de las pruebas. La asignación de técnicas y criterios de cobertura debe ser proporcional a dicha exposición:

$$E = \text{Probabilidad} \times \text{Impacto}$$

| Exposición | Prioridad de Ejecución | Técnica Sugerida (ISO 29119-4) | Criterio de Cobertura Base |
| :--- | :--- | :--- | :--- |
| **Alta / Crítica** | P1 (Ejecución temprana) | Valores Límite, Tablas de Decisión, Transición de Estados | 100% requerimientos, 100% ramas. Independencia de QA |
| **Media** | P2 (Ejecución intermedia) | Partición de Equivalencia, Pruebas de Casos de Uso | 80% requerimientos, 80% sentencias. Pruebas cruzadas |
| **Baja** | P3 (Ejecución tardía) | Pruebas Exploratorias, Error Guessing, Listas de chequeo | Cobertura funcional básica (60%). Autopruebas permitidas |

---

## 2. Caso de Estudio Resuelto (Ejemplo de Referencia)

**Contexto:** Sistema de comercio electrónico. Se presentan dos riesgos ya traducidos al plan de pruebas, como modelo para el ejercicio de la Sección 3.

**Riesgos identificados en la matriz:**
* **R-01 (Producto):** Discrepancias en el cálculo total en compras multimoneda. Exposición: Crítica (30).
* **R-02 (Producto):** Fallo al actualizar la fotografía de perfil del usuario. Exposición: Baja (4).

**Traducción al Plan de Pruebas (Estrategia):**
* **Técnicas (R-01):** Análisis de Valores Límite (topes transaccionales) y Tablas de Decisión (tipos de usuario, cupones, moneda).
* **Técnicas (R-02):** Partición de Equivalencia (formatos permitidos vs. no permitidos).
* **Cobertura (R-01):** 100% de combinaciones de reglas de negocio. Cero defectos críticos abiertos.
* **Cobertura (R-02):** 100% de casos diseñados ejecutados. Máximo 2 defectos cosméticos abiertos.
* **Entorno (R-01):** Sandbox de pasarela de pagos con datos sintéticos multimoneda.

---

## 3. Desarrollo Práctico: Definición de la Estrategia de Pruebas

A partir de la Matriz de Riesgos previamente desarrollada para su proyecto, complete las siguientes secciones conforme a la cláusula 6.2.7 de ISO/IEC/IEEE 29119-3.

### 3.1. Selección y Priorización de Riesgos
Seleccione dos riesgos de alta exposición y un riesgo de baja exposición de su matriz. Defina la prioridad y el nivel de prueba requerido.

| ID Riesgo | Módulo / Funcionalidad Afectada | Exposición | Prioridad | Nivel de Prueba |
| :--- | :--- | :--- | :--- | :--- |
| **RP-01 (Prod.)** | F01/F02: Inicio de sesión y Autenticación (Concurrencia) | Alta (9) | P1 (Temprana) | Integración / API (Postman) y Carga |
| **RPR-01 (Proy.)** | F01 / F03: Entorno y Datos de Autenticación / Roles | Alta (9) | P1 (Temprana) | Sistema / E2E (Playwright) y Unitaria (Jest) |
| **RPR-03 (Proy.)** | Documentación técnica y términos de QA (Modalab) | Baja (4) | P3 (Tardía) | Pruebas estáticas (Revisión / Checklist) |

### 3.2. Técnicas de Diseño de Pruebas (Cláusula 6.2.7.3)
Asigne la técnica de diseño correspondiente según el nivel de riesgo y justifique técnicamente su selección.

**A) Para la funcionalidad de Mayor Riesgo (ID: RP-01)**
* **Técnica seleccionada:** Valores Límite, Tablas de Decisión y Transición de Estados (ISO 29119-4).
* **Justificación técnica (límites o combinaciones críticas a evaluar):**
  * **Valores Límite:** Evaluación de umbrales de peticiones simultáneas en el endpoint de autenticación (Postman) para prevenir degradación por concurrencia (RP-01), longitud mínima/máxima en campos de usuario y contraseña (F01/F02), y umbral exacto de 3 intentos fallidos consecutivos antes del bloqueo temporal de cuenta.
  * **Tablas de Decisión y Transición de Estados:** Cobertura del 100% de combinaciones críticas entre estado de cuenta (activo/inactivo), validez de credenciales y rol asignado (Administrador vs. Vendedor en F03), verificando las transiciones de sesión ($\text{No autenticado} \rightarrow \text{Autenticado} \rightarrow \text{Bloqueado / Sesión expirada}$) con Jest y Playwright.

**B) Para la funcionalidad de Menor Riesgo (ID: RPR-03)**
* **Técnica seleccionada:** Listas de chequeo (Checklists), Revisión guiada y Pruebas Exploratorias.
* **Justificación técnica (eficiencia de recursos frente al riesgo):**
  Dado que el riesgo RPR-03 (falta de conocimiento técnico / documentación) presenta exposición Baja ($2 \times 2 = 4$), no se justifica invertir esfuerzo en automatización compleja ni diseño exhaustivo. Mediante pruebas estáticas con listas de chequeo y revisiones guiadas de las especificaciones de roles de Modalab (complementadas con sesiones acotadas de *error guessing*), se optimiza el tiempo del equipo sin restar recursos a los módulos críticos de seguridad.

### 3.3. Criterios de Finalización y Cobertura (Cláusula 6.2.7.4)
Establezca métricas cuantitativas para determinar la culminación de la fase de pruebas.

**A) Criterios para módulos críticos (cobertura y defectos tolerados):**
* **Cobertura de pruebas y código:** 100% de ejecución de los casos diseñados para los módulos críticos del alcance (F01 Inicio de sesión, F02 Autenticación y F03 Control de acceso por roles), alcanzando 100% de cobertura de requerimientos de seguridad y reglas de decisión mediante Jest, Postman y Playwright.
* **Defectos tolerados:** 0 defectos críticos o de severidad alta abiertos (cero fallas de autenticación o escalamiento de privilegios entre Vendedor y Administrador); máximo 2 defectos de severidad baja/cosmética documentados.

**B) Criterios para módulos secundarios:**
* **Cobertura funcional:** Mínimo 80% de cobertura sobre flujos secundarios y validaciones complementarias (mensajes informativos de interfaz, cierre voluntario de sesión, navegación general y documentación técnica de apoyo).
* **Defectos tolerados:** 0 defectos de severidad alta, máximo 2 defectos de severidad media (sin impacto en seguridad ni bloqueo operativo) y máximo 5 defectos de severidad baja abiertos al cierre del ciclo.

### 3.4. Estimación de Esfuerzo (Cláusula 6.2.8)
Estime el tiempo en horas requerido para las actividades del ciclo de pruebas en las semanas restantes del proyecto.

| Actividad (WBS de Pruebas) | Horas | Descripción del trabajo a realizar |
| :--- | :---: | :--- |
| 1. Diseño de Casos de Prueba (Cl. 7.3) | 24 h | Elaboración de tablas de decisión, transición de estados y scripts en Jest, Postman y Playwright para F01, F02 y F03. |
| 2. Preparación de Entorno y Datos | 10 h | Configuración del entorno de pruebas de Modalab, base de datos aislada y datos sintéticos (usuarios Admin/Vendedor y tokens). |
| 3. Ejecución (Ciclo 1) y Reporte de Defectos | 20 h | Ejecución de pruebas unitarias, de API y E2E por rol; registro, categorización por severidad y trazabilidad de defectos. |
| 4. Pruebas de Regresión y Retest | 12 h | Verificación de correcciones (retest) y ejecución de suite automatizada de regresión sobre autenticación y control de acceso. |
| 5. Informe de Cierre de Pruebas (Cl. 6.4) | 6 h | Consolidación de métricas de cobertura, evaluación de criterios de finalización y redacción del informe de cierre (Cl. 6.4). |
| **Total Estimado:** | **72 h** | **Esfuerzo total estimado para el ciclo de pruebas del módulo administrativo (Modalab).** |

# TALLER: ESPECIFICACIÓN Y PROCEDIMIENTOS DE PRUEBAS[cite: 1]
**De la estrategia a los casos, procedimientos y recursos**[cite: 1]

* **Norma:** ISO/IEC/IEEE 29119-3 (Cláusulas 7.2 a 7.6)[cite: 1]
* **Modalidad:** 2 horas presenciales + trabajo autónomo[cite: 1]
* **Sistema:** Modalab (Módulo Administrativo)[cite: 1]

---

### ESTUDIANTES E IDENTIFICACIÓN DEL PROYECTO[cite: 1]

| Campo | Detalle | Campo | Detalle |
| :--- | :--- | :--- | :--- |
| **Estudiante 1** | Eduardo Deossa[cite: 1] | **Estudiante 2** | Estefanía Montoya[cite: 1] |
| **Estudiante 3** | Santiago Castaño[cite: 1] | **Estudiante 4** | (No aplica)[cite: 1] |
| **Proyecto / Sistema** | Modalab Aplicativo de Administración (Tienda de Ropa)[cite: 1] | **Alcance Evaluado** | F01 Inicio de sesión, F02 Autenticación y F03 Control de acceso[cite: 1] |

---

## 1. Objetivos y metodología[cite: 1]

**Objetivos.** Al finalizar el taller el estudiante estará en capacidad de:[cite: 1]
1. Derivar condiciones y casos de prueba aplicando las técnicas de diseño del Taller 4 (ISO 29119-4).[cite: 1]
2. Estructurar procedimientos de prueba (Cláusula 7.4) con preparación, secuencia y cierre.[cite: 1]
3. Especificar requisitos de datos (7.5) y de entorno (7.6) asociados a la ejecución.[cite: 1]

**Metodología.** El taller se organiza en tres momentos:[cite: 1]
* **Modelo de referencia (Sección 3):** caso resuelto del riesgo R-01 del Taller 4.[cite: 1]
* **Fase 1, práctica guiada (Sección 4):** construcción del caso piloto para el riesgo P1 propio, con acompañamiento del docente (90 min).[cite: 1]
* **Fase 2, práctica autónoma (Sección 5):** escalamiento de la especificación a los riesgos P1, P2 y P3 restantes.[cite: 1]

---

## 2. Fundamento teórico: trazabilidad en la Cláusula 7[cite: 1]

**Flujo de trazabilidad:**  
`Conjunto de características (7.2.4)` → `Condición de prueba (7.2.5)` → `Caso de prueba (7.3.5)` → `Procedimiento de prueba (7.4.5)` → `Datos y entorno (7.5 / 7.6)`[cite: 1]

* **Conjunto de características:** funcionalidad o módulo objeto de prueba.[cite: 1]
* **Condición de prueba:** regla de negocio verificable dentro de la funcionalidad.[cite: 1]
* **Caso de prueba:** precondiciones, entradas o pasos y resultado esperado.[cite: 1]
* **Procedimiento de prueba:** secuencia ordenada de casos con preparación y cierre.[cite: 1]
* **Datos y entorno:** insumos (rangos, volúmenes, reinicios) e infraestructura técnica.[cite: 1]

---

## 3. Caso de estudio resuelto (modelo de referencia)[cite: 2]

El siguiente caso articula los cuatro artefactos de la Cláusula 7 para el riesgo R-01 identificado en el Taller 4.[cite: 2] Constituye la referencia estructural para el ejercicio de la Sección 4.[cite: 2]

> **R-01:** Cálculo en compras multimoneda.[cite: 2] **Técnica aplicada:** análisis de valores límite (ISO 29119-4).[cite: 2] **Exposición:** Crítica (30). \| **Prioridad:** P1.[cite: 2]

### 3.1. Especificación del caso de prueba (7.2 y 7.3)[cite: 2]
* **Conjunto de características (7.2.4):** CC-01: Procesamiento de pagos multimoneda.[cite: 2]
* **Condición de prueba (7.2.5):** CP-01: Verificación de límites transaccionales ($1.00 USD mínimo, $5,000.00 USD máximo).[cite: 2]
* **Caso de prueba (7.3.5):**[cite: 2]
  * **ID:** TC-PAG-01 \| **Prioridad:** P1.[cite: 2]
  * **Precondiciones (7.3.5.6):** usuario autenticado con carrito de $0.99 USD.[cite: 2]
  * **Entradas y pasos (7.3.5.7):** clic en el botón "Confirmar y pagar".[cite: 2]
  * **Resultado esperado (7.3.5.8):** mensaje "Monto mínimo de compra: $1.00 USD". Transacción rechazada.[cite: 2]

### 3.2. Especificación del procedimiento de prueba (7.4)[cite: 2]
* **ID:** PROC-PAG-01 \| **Prioridad:** P1.[cite: 2]
* **Preparación:** iniciar el simulador de pasarela en modo aislado multimoneda y limpiar caché.[cite: 2]
* **Secuencia:** TC-PAG-01 → TC-PAG-02 ($1.00) → TC-PAG-03 ($5,000).[cite: 2]
* **Cierre:** restaurar la base de datos al estado inicial y cerrar la sesión activa.[cite: 2]

### 3.3. Requisitos de datos y entorno (7.5 y 7.6)[cite: 2]
* **Datos (DAT-01):** un usuario activo con tarjeta habilitada para compras internacionales en USD.[cite: 2]
* **Entorno (AMB-01):** servidor de preproducción versión 2.1.0 con el simulador de pasarela activo.[cite: 2]

---

## 4. Fase 1: práctica guiada en clase (caso piloto P1)[cite: 2]

Especificación completa del riesgo P1 prioritario del proyecto Modalab (RP-01: concurrencia y control de intentos fallidos en inicio de sesión y autenticación), aplicando Valores Límite y Transición de Estados (ISO 29119-4) según el modelo de la Sección 3.[cite: 2]

### 4.1. Diseño del caso piloto (7.2 y 7.3)[cite: 3]

| Ficha del caso piloto TC-01 | Proyecto Modalab[cite: 3] |
| :--- | :--- |
| **Conjunto de características (7.2.4)**<br>*funcionalidad o módulo afectado por el riesgo*[cite: 3] | CC-01: Módulos F01 (Inicio de sesión) y F02 (Autenticación) del aplicativo administrativo de Modalab, responsables de la validación de credenciales y del control de bloqueo temporal de cuentas ante intentos fallidos.[cite: 3] |
| **Condición de prueba (7.2.5)**<br>*regla de negocio verificable*[cite: 3] | CP-01: Verificación del umbral límite de intentos fallidos consecutivos de autenticación (máximo 3 intentos fallidos permitidos; al 3.er intento fallido consecutivo la cuenta transiciona de estado Activo a Bloqueado temporalmente).[cite: 3] |
| **Identificación y trazabilidad**[cite: 3] | **ID:** TC-01 \| **Riesgo asociado:** RP-01 (Exposición Alta: 9) \| **Prioridad:** P1[cite: 3] |
| **Precondiciones (7.3.5.6)**<br>*estado del sistema y datos previos requeridos*[cite: 3] | Base de datos de pruebas aislada de Modalab inicializada con el usuario administrador sintético `admin_test@modalab.com` en estado Activo y contador de intentos fallidos en 0.[cite: 3] Servicio de autenticación activo y sin sesión ni token JWT previo en el navegador (Playwright) o cliente API (Postman).[cite: 3] |
| **Entradas y pasos (7.3.5.7)**<br>*acciones del ejecutor, en orden*[cite: 3] | 1. Ingresar a la vista de inicio de sesión administrativa de Modalab (`/admin/login`).[cite: 3]<br>2. Introducir el usuario válido `admin_test@modalab.com` y contraseña errónea `ClaveErronea#1`, y pulsar "Iniciar sesión" (Intento 1).[cite: 3]<br>3. Repetir el envío con contraseña errónea `ClaveErronea#2` (Intento 2, límite previo al umbral).[cite: 3]<br>4. Enviar un tercer intento consecutivo con contraseña errónea `ClaveErronea#3` (Intento 3, valor límite crítico).[cite: 3]<br>5. Ejecutar un cuarto intento inmediato ingresando la contraseña válida `AdminModalab2026*` para verificar la retención del bloqueo.[cite: 3] |
| **Resultado esperado (7.3.5.8)**<br>*resultado observable y medible*[cite: 3] | En los intentos 1 y 2, el sistema rechaza el acceso (HTTP 401), muestra "Credenciales inválidas" sin revelar existencia del usuario y mantiene la cuenta en estado Activo.[cite: 3] En el intento 3, el sistema cambia el estado de la cuenta a Bloqueado y muestra "Cuenta bloqueada temporalmente por superar el límite de 3 intentos fallidos".[cite: 3] En el intento 4, aun con clave correcta, el acceso es denegado (HTTP 423 / 403).[cite: 3] |

### 4.2. Procedimiento y requisitos (7.4, 7.5 y 7.6)[cite: 3]

| Procedimiento PROC-01 | Autenticación, Límites y Concurrencia (Modalab)[cite: 3, 4] |
| :--- | :--- |
| **Identificación y objetivo**[cite: 3] | **ID:** PROC-01 \| **Objetivo:** Ejecutar en secuencia controlada las pruebas de prioridad P1 sobre F01 y F02 para verificar el bloqueo por umbral de intentos, la validación de estado de cuenta en base de datos y la estabilidad del endpoint de login bajo carga concurrente (riesgos RP-01 y RPR-01).[cite: 3] |
| **Preparación**<br>*acondicionamiento del entorno previo a la ejecución*[cite: 3] | Ejecutar el script de reinicio de datos sintéticos en la base de datos de pruebas de Modalab para cargar usuarios activos e inactivos con contador de fallos en 0; limpiar cookies y almacenamiento local en Playwright; cargar la colección de Postman y verificar disponibilidad del endpoint `POST /api/auth/login`.[cite: 3] |
| **Secuencia de casos**[cite: 3] | 1. TC-01 (Umbral de 3 intentos fallidos y bloqueo temporal) → 2. TC-02 (Tabla de decisión: credenciales válidas en usuario Inactivo vs. Activo) → 3. TC-03 (Valores límite de concurrencia: 50 peticiones simultáneas en API de login).[cite: 3] |
| **Cierre**<br>*limpieza y restauración del estado inicial*[cite: 4] | Restaurar el snapshot inicial de la base de datos de pruebas (desbloqueo de cuentas y reinicio de contadores a 0), revocar tokens JWT emitidos durante la prueba, exportar los reportes de ejecución de Postman/Playwright y cerrar todas las sesiones activas.[cite: 4] |

| Cláusula | Especificación para PROC-01[cite: 4] |
| :--- | :--- |
| **Datos (7.5)**[cite: 4] | **ID:** DAT-01[cite: 4]<br>**Valores y volúmenes:** 2 cuentas sintéticas activas (`admin_test@modalab.com` con rol Administrador y `vendedor_test@modalab.com` con rol Vendedor), 1 cuenta en estado Inactivo (`inactivo_test@modalab.com`), 4 contraseñas inválidas para pruebas de umbral y 1 lote CSV/JSON de 50 registros sintéticos de autenticación para concurrencia en Postman.[cite: 4]<br>**Reinicio requerido:** Sí; reinicio transaccional de contadores de intentos fallidos a 0, limpieza de tabla de sesiones/tokens y restauración del estado de cuentas antes de TC-01 y al concluir TC-03.[cite: 4] |
| **Entorno (7.6)**[cite: 4] | **ID:** AMB-01[cite: 4]<br>**Hardware y red:** Estación de pruebas con CPU de 4 núcleos, 8 GB de RAM mínimo, red local aislada de baja latencia (< 20 ms hacia el servidor de preproducción) y puertos HTTP/HTTPS habilitados.[cite: 4]<br>**Software, versiones y simuladores:** Entorno aislado de preproducción de Modalab (Frontend Administrativo + API REST de Autenticación + Base de Datos relacional de pruebas sincronizada con esquema productivo), Node.js v20 LTS, Jest v29, Postman v11 (Runner de carga de 50 hilos) y Playwright v1.42 (Chromium).[cite: 4] |

---

## 5. Fase 2: práctica autónoma (escalamiento)[cite: 4]

Aplicando las técnicas asignadas en el Taller 4 (Valores Límite, Tablas de Decisión, Transición de Estados, Partición de Equivalencia y Listas de Chequeo / Pruebas Exploratorias), se escalan los casos y procedimientos para los riesgos P1, P2 y P3 del módulo administrativo de Modalab.[cite: 4]

### 5.1. Matriz de casos de prueba (7.3.5)[cite: 4]

| ID | Riesgo / Prioridad | Condición (7.2.5) | Precondiciones | Entradas y datos | Resultado esperado[cite: 4, 5] |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01**[cite: 4] | RP-01 (caso piloto)<br>**P1**[cite: 4] | CP-01 (F01/F02): Límite de 3 intentos fallidos consecutivos y transición Activo → Bloqueado (Valores Límite y Estados).[cite: 4] | Usuario `admin_test@modalab.com` en estado Activo, contador de fallos en 0 y sin sesión activa.[cite: 4] | Correo válido + clave errónea en 3 intentos seguidos, seguidos de un 4.° intento con clave válida.[cite: 4] | HTTP 401 en intentos 1-2; bloqueo temporal en intento 3 y denegación (HTTP 423/403) en intento 4.[cite: 4] |
| **TC-02**[cite: 5] | RPR-01 (Prod./Proy.)<br>**P1**[cite: 5] | CP-02 (F02): Validación de combinación cuenta Inactiva con credenciales válidas en BD sincronizada (Tabla de Decisión).[cite: 5] | BD de pruebas sincronizada con producción; usuario `inactivo_test@modalab.com` en estado Inactivo.[cite: 5] | Envío en `/admin/login` de `inactivo_test@modalab.com` con contraseña válida registrada.[cite: 5] | Acceso denegado (HTTP 403), sin emisión de token JWT y mensaje "Usuario inactivo, contacte al administrador".[cite: 5] |
| **TC-03**[cite: 5] | RP-01 (Concurrencia)<br>**P1**[cite: 5] | CP-03 (F01/F02): Umbral de concurrencia en endpoint `POST /api/auth/login` con 50 peticiones simultáneas (Valores Límite).[cite: 5] | Entorno AMB-01 operativo; Runner de Postman configurado con 50 hilos simultáneos y dataset CSV DAT-01.[cite: 5] | Ejecución concurrente de 50 solicitudes `POST /api/auth/login` con credenciales sintéticas válidas en 10 s.[cite: 5] | 100% de respuestas HTTP 200 con token válido, 0% errores HTTP 500 y tiempo promedio de respuesta ≤ 2,000 ms.[cite: 5] |
| **TC-04**[cite: 5] | R-03 (Seguridad)<br>**P2**[cite: 5] | CP-04 (F03): Control de acceso por rol (RBAC) entre perfil Vendedor y rutas exclusivas de Administrador (Partición de Equivalencia).[cite: 5] | Usuario `vendedor_test@modalab.com` (rol Vendedor) autenticado con sesión y token JWT vigentes.[cite: 5] | Acceso directo en Playwright a `/admin/usuarios/permisos` y petición `GET /api/admin/roles` con token Vendedor.[cite: 5] | Bloqueo de acceso en UI (vista "Acceso denegado") y respuesta HTTP 403 Forbidden en API, evitando escalamiento.[cite: 5] |
| **TC-05**[cite: 5] | R-02 (Flujo Login)<br>**P2**[cite: 5] | CP-05 (F01/F02): Particiones inválidas de entrada en formulario de login y rechazo de token expirado (Partición y Estados).[cite: 5] | Formulario `/admin/login` activo; lote de datos fuera de dominio y token JWT expirado preparados en Jest/Playwright.[cite: 5] | Envío de campo vacío, correo sin `@`, cadena > 255 caracteres, patrón `OR '1'='1` y consumo de API con token expirado.[cite: 5] | Validación preventiva (HTTP 400/401) sin exponer errores de servidor y redirección automática al login ante token expirado.[cite: 5] |
| **TC-06**[cite: 5] | RPR-03 (Documentación)<br>**P3**[cite: 5] | CP-06 (F01/F02/F03): Coherencia de mensajes de interfaz visuales y permisos frente a la documentación técnica de Modalab (Checklist).[cite: 5] | Lista de chequeo de mensajes/roles de Modalab disponible; perfiles Administrador y Vendedor habilitados en AMB-01.[cite: 5] | Sesión exploratoria guiada de 30 min recorriendo login, logout y menús visibles según rol con lista de chequeo.[cite: 5] | 100% de mensajes de error claros y consistentes con la matriz de roles documentada, sin ambigüedades para el usuario.[cite: 5] |

### 5.2. Procedimientos adicionales (7.4)[cite: 5]

Los casos de prioridad P2 y P3 anteriores se agrupan en procedimientos ejecutables con la misma estructura del modelo PROC-PAG-01:[cite: 5]

#### PROC-02 | Prioridad: P2 — Verificación de Control de Acceso por Roles (RBAC) y Validación de Entradas[cite: 6]
* **Objetivo del procedimiento:** Validar la correcta segregación de permisos entre los roles Administrador y Vendedor (F03), así como el rechazo seguro de particiones inválidas de entrada y sesiones expiradas en el módulo administrativo de Modalab (mitigación de riesgos R-02 y R-03).[cite: 6]
* **Preparación:** Inicializar el conjunto de datos DAT-01 en el entorno AMB-01 asegurando la existencia de ambos perfiles activos (`admin_test@modalab.com` y `vendedor_test@modalab.com`); configurar las pruebas unitarias de validación de tokens en Jest y los scripts de navegación en Playwright.[cite: 6]
* **Casos incluidos, en secuencia:** TC-04 (Verificación de restricción RBAC del rol Vendedor frente a rutas y endpoints administrativos) → TC-05 (Validación de particiones inválidas en formulario de inicio de sesión y manejo de expiración de sesión).[cite: 6]
* **Cierre:** Cerrar las sesiones activas de ambos roles, limpiar cookies y almacenamiento local del navegador de pruebas, restaurar los registros de auditoría en base de datos y consolidar el reporte de ejecución de Jest y Playwright.[cite: 6]

#### PROC-03 | Prioridad: P3 — Revisión Estática y Exploración Guiada de Mensajes y Permisos[cite: 6]
* **Objetivo del procedimiento:** Comprobar mediante inspección estática y pruebas exploratorias acotadas que los mensajes de autenticación, alertas de bloqueo y menús habilitados por rol correspondan exactamente con la documentación técnica de Modalab (mitigación de riesgo RPR-03).[cite: 6]
* **Preparación:** Disponer de la guía de roles y matriz de permisos de Modalab junto con la lista de chequeo de validación de interfaz; habilitar el entorno AMB-01 con las cuentas de prueba de Administrador y Vendedor.[cite: 6]
* **Casos incluidos, en secuencia:** TC-06 (Ejecución de lista de chequeo y recorrido exploratorio guiado de 30 minutos sobre flujos de inicio de sesión, cierre voluntario y navegación por rol).[cite: 6]
* **Cierre:** Registrar observaciones de mejora textual o visual en la bitácora de QA, cerrar las sesiones abiertas y archivar la lista de chequeo firmada por el equipo evaluador.[cite: 6]

---

> **Continuidad del taller:** Los casos (TC-01 a TC-06) y procedimientos (PROC-01 a PROC-03) especificados en este documento constituyen el insumo directo para el Taller 6, correspondiente a las Cláusulas 7.7 a 7.9 y 8.x de ISO/IEC/IEEE 29119-3 (ejecución de pruebas, gestión de defectos e informe de cierre del proyecto Modalab).[cite: 6]
