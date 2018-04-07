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

const selectData = newData => new Promise((resolve, reject) =>{
    console.log('entro a este metodo')

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : '127.0.0.1',
      user     : 'user',
      password : '12345',
      database : 'lav',
      port     : '3306'    
    });
     
    connection.connect();
     
    connection.query('SELECT id, name from users', function (error, results, fields) {
      if (error) throw error;
      console.log('The name is: ', results[0].name);      
      newdata = results[0].name
    });
     
    connection.end();
    
    resolve(newData)
   
    console.log('entro a este metodo')
});

module.exports = {
    insertDemo,
    selectData
}