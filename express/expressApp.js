/*

*/

const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false}))
//parse application
app.use(bodyParser.json())
//databases
const { insertDemo } = require('../databases/realmSchemas')

app.get('/', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.send({
        status: "success",
        name: "Demo",
        sms: ""
    })
})

app.post('/insert_new_demo', (request, response) => {
    const { tokenkey } = request.headers
    const { name, email } = request.body
    
    response.setHeader('Content-Type', 'application/json')
    if (tokenkey != 'abc123456789') {
        response.send({
            status: "failed",
            message: "You sent wrong token's key"
        })    
        return
    }
    insertDemo({ name, email }).then(insertedDemo => {
        response.send({
            status: "success",
            message: `Insert new User successfully`,
            data: insertedDemo
        })
    }).catch((error) => {
        response.send({
            status: "failed",
            message: `Insert User error: ${error}`
        })  
    })    
})

module.exports = {
    app
}