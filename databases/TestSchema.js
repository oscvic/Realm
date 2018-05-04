const DEMO_SCHEMA = 'Demo'

const DemoSchema = {
  name: DEMO_SCHEMA,
  primaryKey: 'id',
  properties: {      
    id: 'int', //PK
    name: { type: 'string', indexed: true },
    email: 'string'
  }
}

module.exports = { 
    DEMO_SCHEMA,
    DemoSchema
}