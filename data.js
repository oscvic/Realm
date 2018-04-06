const Realm = require('realm');

const DemoSchema = {
  name: 'Demo',
  properties: {
    Dato1:  'string',
    Dato2: 'string',
    Dato3: {type: 'int', default: 0},
  }
};

Realm.open({schema: [DemoSchema]})
  .then(realm => {
    
    realm.write(() => {
      const demo = realm.create('Demo', {
        Dato1: 'Prueba',
        Dato2: 'Demo',
        Dato3: 1450,
      });
      demo.Dato3 += 2; 
    });
 
    realm.write(() => {
      const myCar = realm.create('Demo', {
        Dato1: 'Test',
        Dato2: 'Demo',
        Dato3: 1010,
      });
    });
   
  })
  .catch(error => {
    console.log(error);
  });