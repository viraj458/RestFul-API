const express = require('express');
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
app.put("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    if(!customer) {
        res.status(404).send("customer not found");
    } 

    const {error} = validateCustomer(req.body);
    
    if(error) {
        res.status(404).send(error.details[0].message);
    }

    customer.name = req.body.name;

    res.send(customer);

})
//DELETE request handler
app.delete("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    if(!customer) {
        res.status(404).send("customer not found");
    } 

    const index = customers.indexOf(customer);
    customers.splice(index, 1);


    res.send("Customer, "+customer.name+" is deleted");

})

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