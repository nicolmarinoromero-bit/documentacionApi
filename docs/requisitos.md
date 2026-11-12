# Requerimientos e historias de usuario

Este documento describe las historias de usuario funcionales identificadas para Puesto de Chance API. La implementación relacionada y las pruebas asociadas se detallan por separado en la [matriz de trazabilidad](matriz-trazabilidad.md).

## HU-001: Autenticación de usuarios

**Como** usuario registrado, **quiero** iniciar sesión y consultar mi perfil, **para** acceder de forma segura a las funciones autorizadas según mi rol.

## HU-002: Venta de tiquetes

**Como** vendedor, **quiero** registrar ventas de tiquetes de Chance y Baloto para sorteos abiertos, **para** emitir un comprobante con el detalle de la jugada y el valor pagado.

## HU-003: Validación y premios de Chance

**Como** vendedor o administrador, **quiero** que el sistema valide las apuestas de Chance y calcule sus premios frente al resultado registrado, **para** aplicar las reglas de juego de forma consistente.

## HU-004: Validación y premios de Baloto

**Como** vendedor o administrador, **quiero** que el sistema valide las jugadas de Baloto y calcule los premios según el resultado, **para** identificar correctamente los tiquetes ganadores.

## HU-005: Administración de sorteos y resultados

**Como** administrador, **quiero** crear sorteos y registrar sus resultados, **para** controlar la apertura de ventas y liquidar los tiquetes asociados.

## HU-006: Consulta y cierre de caja

**Como** vendedor, **quiero** consultar el resumen de mi caja y registrar el efectivo contado al cierre, **para** comparar el saldo esperado con el dinero reportado e identificar diferencias.
