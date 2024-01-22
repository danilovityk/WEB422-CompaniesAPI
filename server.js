/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Danylo Vityk Student ID: 176326213 Date: 22 Jan 2024
*  Cyclic Link: 
*
********************************************************************************/ 


const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();
require('dotenv').config(); 
const CompaniesDB = require("./modules/companiesDB.js");
const db = new CompaniesDB();
const HTTP_PORT = process.env.PORT || 8080;


app.use(cors());
app.use(bodyParser.json())
app.use(express.json())

app.get('/', (req, res) =>
{
    res.json({message: "API Listening"})
});

app.post('/api/companies', (req, res) =>
{
    db.addNewCompany(req.body).then(data =>
    {
        res.json(data)
        res.status(201).end()
    }).catch(err =>
    {
        res.send(err)
        res.status(500).end()
    })
    
});

app.get('/api/companies', (req, res) =>
{

    const { page, perPage, name } = req.query

    
    db.getAllCompanies(page, perPage, name).then(data =>
    {
        res.json(data)
        res.status(200).end()
    }).catch(err =>
    {
        res.json(err)
        res.status(500).end()
    })
  

  

});

app.get('/api/company/:id', (req, res) =>
{
    db.getCompanyById(req.params.id).then(data =>
    {
        res.json(data)
        res.status(200).end()
    }).catch(err => {
        res.send(err)
        res.status(500).end()
    })
});

app.put('/api/company/:id', (req, res) =>
{
    db.updateCompanyById(req.body, req.params.id).then(data =>
    {
        res.json(data)
        res.status(200).end()
    }).catch(err => {
        res.send(err)
        res.status(500).end()
    })
});

app.delete('/api/company/:id', (req, res) =>
{
    db.deleteCompanyById(req.params.id).then(res.status(204).end()).catch(err =>
    {
        res.send(err)
        res.status(500).end()
    })
    
});

db.initialize(process.env.MONGODB_CONN_STRING).then(() =>
{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});
