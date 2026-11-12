# Matriz de trazabilidad de requisitos (RTM)

Esta matriz conecta cada historia de usuario con los componentes que la implementan y sus pruebas de calidad.

| ID HU | Descripción del requisito | Módulo / controlador | Caso de prueba | Estado QA |
|---|---|---|---|---|
| HU-001 | Autenticar usuarios y consultar el perfil | `src/controllers/authController.js`, `src/services/authService.js` | `test_login_exitoso`, `test_login_credenciales_invalidas`, `test_ruta_protegida_sin_token` | Aprobado |
| HU-002 | Vender tiquetes de Chance y Baloto | `src/controllers/ticketController.js`, `src/services/ticketService.js` | `test_venta_chance`, `test_venta_baloto`, `test_venta_sorteo_cerrado` | Aprobado |
| HU-003 | Validar apuestas y calcular premios de Chance | `src/services/chanceService.js` | `test_premio_directo_4_cifras`, `test_premio_directo_ultimas_cifras`, `test_validacion_apuesta_invalida` | Aprobado |
| HU-004 | Validar jugadas y calcular premios de Baloto | `src/services/balotoService.js` | `test_jugada_aleatoria_valida`, `test_jugada_numeros_repetidos`, `test_premio_por_aciertos` | Aprobado |
| HU-005 | Crear sorteos y registrar resultados | `src/controllers/sorteoController.js`, `src/services/sorteoService.js` | `test_admin_crea_sorteo`, `test_resultado_y_pago_premio` | Aprobado |
| HU-006 | Consultar ventas y cerrar caja | `src/controllers/cajaController.js`, `src/services/cajaService.js` | `test_resumen_caja_diario`, `test_cierre_caja_con_faltante` | Aprobado |

## Evidencia de QA

Estado actualizado con base en la ejecución de `npm test`: las 5 suites y los 20 casos de prueba finalizaron correctamente.

Los nombres de los casos corresponden a las pruebas definidas en `tests/`.
