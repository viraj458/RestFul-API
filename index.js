const express = require('express');
const Joi = require('joi');
const joi = require('joi');
const app = express();

app.use(express.json());

const  customers = [
    {
        "id": 1,
        "name": 'John',
    },
    {
        "id": 2,
        "name": 'Sunil',
    },
    {
        "id": 3,
        "name": 'Jaye',
    }
];

//READ request handler
app.get("/", (req, res) => {
    res.send("welcome");
})

app.get("/api/customers", (req, res) => {
    res.send(customers);
})

app.get("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id)); 
    if(!customer) {
        res.status(404).send("customer not found");
    } else {
        res.send(customer);
    }
})


//CREATE request handler
app.post("/api/customers", (req, res) => {
    const {error} = validateCustomer(req.body);
    if(error) {
        res.status(404).send(error.details[0].message);
        return;
    }

    const newCustomer = {
        id: customers.length + 1,
        name: req.body.name
    }

    customers.push(newCustomer);
    res.send(newCustomer);

})

//UPDATE request handler

//DELETE request handler


//Validation Information
function validateCustomer(newCustomer){
    const schema = joi.object({name: joi.string().min(3).max(10).required()});
    const validation = schema.validate(newCustomer);
    return validation;

} 

//PORT environment variables
const port = process.env.PORT || 8800;
app.listen(port, (req, res) => {
    console.log("listening on port");
})