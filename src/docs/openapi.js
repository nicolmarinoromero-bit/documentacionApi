module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Puesto de Chance API',
    version: '1.0.0',
    description: 'Documentación interactiva de los endpoints de autenticación, sorteos, tiquetes y caja.',
  },
  servers: [{ url: 'http://localhost:3000', description: 'Servidor local' }],
  tags: [
    { name: 'Estado' },
    { name: 'Autenticación' },
    { name: 'Sorteos' },
    { name: 'Tiquetes' },
    { name: 'Caja' },
  ],
  components: {
    securitySchemes: { BearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
    schemas: {
      Error: { type: 'object', properties: { error: { type: 'string', example: 'Mensaje de error' } } },
      LoginRequest: {
        type: 'object', required: ['usuario', 'password'],
        properties: {
          usuario: { type: 'string', example: 'vendedor1' },
          password: { type: 'string', format: 'password', example: 'vende123' },
        },
      },
      ApuestaChance: {
        type: 'object', required: ['numero', 'valor'],
        properties: {
          numero: { type: 'string', example: '1234' },
          modalidad: { type: 'string', enum: ['DIRECTO', 'COMBINADO'], example: 'DIRECTO' },
          valor: { type: 'integer', example: 2000 },
        },
      },
      JugadaBaloto: {
        type: 'object',
        properties: {
          numeros: { type: 'array', items: { type: 'integer' }, example: [1, 2, 3, 4, 5] },
          superbalota: { type: 'integer', example: 6 },
          aleatoria: { type: 'boolean', example: false },
        },
      },
      SorteoRequest: {
        type: 'object', required: ['tipo', 'nombre', 'fecha'],
        properties: {
          tipo: { type: 'string', enum: ['CHANCE', 'BALOTO'] },
          nombre: { type: 'string', example: 'Sorteo de ejemplo' },
          fecha: { type: 'string', format: 'date-time', example: '2030-12-31T20:00:00.000Z' },
          acumulado: { type: 'integer', example: 0 },
        },
      },
    },
  },
  paths: {
    '/health': { get: { tags: ['Estado'], summary: 'Verificar estado del servidor', security: [], responses: { 200: { description: 'Servidor activo' } } } },
    '/api/v1/auth/login': {
      post: {
        tags: ['Autenticación'], summary: 'Iniciar sesión', security: [],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } } },
        responses: { 200: { description: 'Token y perfil del usuario' }, 401: { description: 'Credenciales inválidas' } },
      },
    },
    '/api/v1/auth/perfil': {
      get: { tags: ['Autenticación'], summary: 'Consultar perfil del usuario', security: [{ BearerAuth: [] }], responses: { 200: { description: 'Perfil del usuario' }, 401: { description: 'Token ausente o inválido' } } },
    },
    '/api/v1/sorteos': {
      get: {
        tags: ['Sorteos'], summary: 'Listar sorteos', security: [{ BearerAuth: [] }],
        parameters: [
          { in: 'query', name: 'tipo', schema: { type: 'string', enum: ['CHANCE', 'BALOTO'] } },
          { in: 'query', name: 'estado', schema: { type: 'string', enum: ['ABIERTO', 'JUGADO'] } },
        ],
        responses: { 200: { description: 'Listado de sorteos' }, 401: { description: 'Token ausente o inválido' } },
      },
      post: {
        tags: ['Sorteos'], summary: 'Crear sorteo (ADMIN)', security: [{ BearerAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/SorteoRequest' } } } },
        responses: { 201: { description: 'Sorteo creado' }, 403: { description: 'Permisos insuficientes' } },
      },
    },
    '/api/v1/sorteos/{id}': {
      get: {
        tags: ['Sorteos'], summary: 'Consultar sorteo', security: [{ BearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Detalle del sorteo' }, 404: { description: 'Sorteo no encontrado' } },
      },
    },
    '/api/v1/sorteos/{id}/resultado': {
      post: {
        tags: ['Sorteos'], summary: 'Registrar resultado (ADMIN)', security: [{ BearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['resultado'], properties: { resultado: { oneOf: [{ type: 'string', example: '1234' }, { $ref: '#/components/schemas/JugadaBaloto' }] } } } } } },
        responses: { 200: { description: 'Resultado registrado y tiquetes liquidados' }, 403: { description: 'Permisos insuficientes' } },
      },
    },
    '/api/v1/tickets/chance': {
      post: {
        tags: ['Tiquetes'], summary: 'Vender tiquete de Chance (VENDEDOR)', security: [{ BearerAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['sorteoId', 'apuestas'], properties: { sorteoId: { type: 'integer', example: 1 }, apuestas: { type: 'array', minItems: 1, maxItems: 5, items: { $ref: '#/components/schemas/ApuestaChance' } }, cliente: { type: 'string' } } } } } },
        responses: { 201: { description: 'Tiquete de Chance creado' }, 403: { description: 'Permisos insuficientes' } },
      },
    },
    '/api/v1/tickets/baloto': {
      post: {
        tags: ['Tiquetes'], summary: 'Vender tiquete de Baloto (VENDEDOR)', security: [{ BearerAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['sorteoId', 'jugadas'], properties: { sorteoId: { type: 'integer', example: 3 }, jugadas: { type: 'array', minItems: 1, maxItems: 10, items: { $ref: '#/components/schemas/JugadaBaloto' } }, cliente: { type: 'string' } } } } } },
        responses: { 201: { description: 'Tiquete de Baloto creado' }, 403: { description: 'Permisos insuficientes' } },
      },
    },
    '/api/v1/tickets': {
      get: {
        tags: ['Tiquetes'], summary: 'Listar tiquetes', security: [{ BearerAuth: [] }],
        parameters: [
          { in: 'query', name: 'fecha', schema: { type: 'string', example: '2030-12-31' } },
          { in: 'query', name: 'estado', schema: { type: 'string', example: 'ACTIVO' } },
        ],
        responses: { 200: { description: 'Listado de tiquetes' }, 401: { description: 'Token ausente o inválido' } },
      },
    },
    '/api/v1/tickets/{codigo}': {
      get: {
        tags: ['Tiquetes'], summary: 'Consultar tiquete', security: [{ BearerAuth: [] }],
        parameters: [{ in: 'path', name: 'codigo', required: true, schema: { type: 'string', example: 'CH-AB12CD34' } }],
        responses: { 200: { description: 'Detalle del tiquete, sorteo y premio' }, 404: { description: 'Tiquete no encontrado' } },
      },
    },
    '/api/v1/tickets/{codigo}/anular': {
      post: {
        tags: ['Tiquetes'], summary: 'Anular tiquete', security: [{ BearerAuth: [] }],
        parameters: [{ in: 'path', name: 'codigo', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['motivo'], properties: { motivo: { type: 'string', example: 'Error al ingresar la apuesta' } } } } } },
        responses: { 200: { description: 'Tiquete anulado' }, 403: { description: 'No autorizado' }, 409: { description: 'No se puede anular el tiquete' } },
      },
    },
    '/api/v1/tickets/{codigo}/pagar': {
      post: {
        tags: ['Tiquetes'], summary: 'Pagar premio (VENDEDOR)', security: [{ BearerAuth: [] }],
        parameters: [{ in: 'path', name: 'codigo', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Pago registrado' }, 403: { description: 'Permisos insuficientes' }, 409: { description: 'El premio no se puede pagar' } },
      },
    },
    '/api/v1/caja/resumen': {
      get: {
        tags: ['Caja'], summary: 'Consultar resumen de caja', security: [{ BearerAuth: [] }],
        parameters: [
          { in: 'query', name: 'fecha', schema: { type: 'string', example: '2030-12-31' } },
          { in: 'query', name: 'vendedorId', description: 'Solo para ADMIN', schema: { type: 'integer' } },
        ],
        responses: { 200: { description: 'Resumen diario de ventas, pagos y saldo' }, 401: { description: 'Token ausente o inválido' } },
      },
    },
    '/api/v1/caja/cierre': {
      post: {
        tags: ['Caja'], summary: 'Registrar cierre de caja (VENDEDOR)', security: [{ BearerAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['efectivoReportado'], properties: { efectivoReportado: { type: 'integer', minimum: 0, example: 10000 }, fecha: { type: 'string', example: '2030-12-31' } } } } } },
        responses: { 201: { description: 'Cierre registrado con diferencia y estado' }, 409: { description: 'La caja ya fue cerrada' } },
      },
    },
  },
};
