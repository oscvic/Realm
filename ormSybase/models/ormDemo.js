const SyBase = require('../db')

module.exports = () => {
  const { STRING, INTEGER, DATE, DECIMAL } = SyBase

  return SyBase.define('ormDemo', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true
      //autoInc: true
    },
    Nombres: {
      type: STRING
    },
    Apellidos: {
      type: STRING
    },
    Telefono: {
      type: STRING
    },
    Contacto: {
      type: STRING
    },
    status: {
      type: STRING
    },
  }, {
      tableName: 'dev.OrmDemo'
    })
}
