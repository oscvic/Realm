const Realm = require('realm');
const Promise = require('promise')

const CarSchema = {
    name: 'Car',
    properties: {
      make:  'string',
      model: 'string'
      //miles: {type: 'int', default: 0}
    }
  };

const CLIENTE_SCHEMA = 'Cliente'
const ClienteSchema = {
    name: CLIENTE_SCHEMA,
    properties: {
        pais_cliente: 'string',
        codigo_cliente: 'string',
        nombre: 'string'
    }
}

const { DEMO_SCHEMA, DemoSchema } = require('./TestSchema') 

const databaseOptions = {
    path: './Data/RealmNodeJs.realm',
    schema: [DemoSchema, ClienteSchema],
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

const selectData = resData => new Promise((resolve, reject) =>{
    var Sybase = require('sybase'),
    logTiming = true,
    javaJarPath = './node_modules/sybase/JavaSybaseLink/dist/JavaSybaseLink.jar',
    db = new Sybase('172.16.128.112', 9909, 'DB-RPN-502', 'dba', 'dev', logTiming, javaJarPath);

    console.log("Luego de las var")

    db.connect(function (err) {    
        if (err) return console.log(err);

        console.log("antes del select")

        db.query("select Pais_Cliente, Codigo_Cliente, Nombre from dev.Cliente", function (err, data) {
            if (err) {
                console.log(err);
                reject(err)        
            }             
            
            Realm.open(databaseOptions).then(realm => {  
                realm.write(() => {
                    data.forEach(element => {
                        realm.create(CLIENTE_SCHEMA, {
                            pais_cliente: element.Pais_Cliente.toString(),
                            codigo_cliente: element.Codigo_Cliente.toString(),
                            nombre : element.Nombre                            
                        },true);
                    });
                });
                
                let resData = {
                    results: {
                        Clientes: realm.objects(CLIENTE_SCHEMA).length
                    }
                }

                resolve(resData)
                
            }).catch((error) => reject(error))           

            db.disconnect();

            console.log("Desconetada")

        });    
    });    

     /*var mysql      = require('mysql');
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
    
    resolve(newData)*/

});

module.exports = {
    insertDemo,
    selectData
}