const SyBase = require('./db')
SyBase.use(__dirname + '/models')

SyBase.models.ormDemo.by(SyBase.DBPools.DESA)
  .create({
    id: 1,
    Nombres: 'Oscar',
    Apellidos: 'Vicente',
    Telefono: '30347341',
    Contacto: 'Prueba',
    status: 'A'
  }).then(res => {
    console.info('------- Created ', res)
    //return SyBase.models.WXUser.findByID(res.id)
  }).create({
    id: 2,
    Nombres: 'Oscar',
    Apellidos: 'Vicente',
    Telefono: '30347341',
    Contacto: 'Prueba',
    status: 'A'
  }).then(res => {
    console.info('------- Created ', res)
    //return SyBase.models.WXUser.findByID(res.id)
  })
  .catch(err => {
    console.error('********* Error :', err)
    //SyBase.models.WXUser.delete({ cardno: '90000011' })
  })

/*
  SyBase.models.ormDemo.by(SyBase.DBPools.DESA)
    .create({
      id: 2,
      Nombres: 'Oscar',
      Apellidos: 'Vicente',
      Telefono: '30347341',
      Contacto: 'Prueba',
      status: 'A'
    }).then(res => {
      console.info('------- Created ', res)
      //return SyBase.models.WXUser.findByID(res.id)
    }).catch(err => {
      console.error('********* Error :', err)
      //SyBase.models.WXUser.delete({ cardno: '90000011' })
    })
*/
/*
  SyBase.models.ormDemo.by(SyBase.DBPools.DESA)
    .delete({
      id: 2
    }).then(res => {
      console.log('---------Deleted ', res)
  })*/
