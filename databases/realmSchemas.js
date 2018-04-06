const Realm = require('realm');
const DEMO_SCHEMA = 'Demo'
const Promise = require('promise')

const DemoSchema = {
  name: DEMO_SCHEMA,
  primaryKey: 'id',
  properties: {      
    id: 'int', //PK
    name: { type: 'string', indexed:true },
    email: 'string'
  }
}

const databaseOptions = {
    path: 'RealmNodeJs.realm',
    schema: DEMO_SCHEMA,
    schemaVersion: 0, //Optional
}

const insertDemo = newDemo => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {  
        let filteredUsers = realm.objects(DEMO_SCHEMA)
        .filtered(`name='${newDemo.name.trim()}' AND email='${newDemo.email.trim()}'`)
        if (filteredUsers.length > 0) {
            reject("User with the same name and email exists !")            
        }    
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