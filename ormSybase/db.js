// This is a exemple. Production use require('node_sybase')
  const SyBase = require('node-sybase')

  module.exports = new SyBase([
    {
      name: 'DESA',
      host: '172.16.128.112',
      port: 9909,
      dbname: 'DB-RPN-502',
      username: 'dba',
      password: 'dev'
    }
  ])
