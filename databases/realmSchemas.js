const Realm = require('realm');
const DEMO_SCHEMA = 'Demo'
const Promise = require('promise')

const DemoSchema = {
  name: DEMO_SCHEMA,
  primaryKey: 'id',
  properties: {      
    id: 'int', //PK
    name: { type: 'string', indexed: true },
    email: 'string'
  }
}

const CarSchema = {
    name: 'Car',
    properties: {
      make:  'string',
      model: 'string'
      //miles: {type: 'int', default: 0}
    }
  };

const databaseOptions = {
    path: './Data/RealmNodeJs.realm',
    schema: [CarSchema, DemoSchema],
    schemaVersion: 0, //Optional
}

const insertDemo = newDemo => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {  
        /*let filteredUsers = realm.objects(DEMO_SCHEMA)
        .filtered(`name='${newDemo.name}' AND email='${newDemo.email}'`)
        if (filteredUsers.length > 0) {
            reject("User with the same name and email exists !")            
        }  */ 

       /* realm.write(() => {
            const myCar = realm.create('Car', {
                make: 'Honda',
                model: 'Civic'
            })            
          })*/
          //console.log(newDemo);
          
        realm.write(() => {
            newDemo.id = Math.floor(Date.now())
            realm.create(DEMO_SCHEMA, newDemo)
            resolve(newDemo)            
        })        
           
    }).catch((error) => reject(error))
})

module.exports = {
    insertDemo
}