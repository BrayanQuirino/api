/**
 * @param Router metodo de express para generar rutas
 * @param router objeto router como tal
 * @param endpoint directorio
 * @param _ manejador de datos
 * @param fetch hacer peticiones a otros servicios/apis
 * @param employees json que simula la base de datos
 */

const {Router} = require('express');
const router=Router();
const endpoint='/api/sps/helloworld/v1'
const employees=require("../database.json");
const _= require("underscore");
const fetch= require('node-fetch');

//get database
router.get(endpoint,(req,res)=>{
    //res.send('Hello world');
    res.json(employees);
})

//push new element at database
router.post(endpoint,(req,res)=>{
    console.log(req.body);
    const {name, age}= req.body;
    if(name && age){
        const newEmploye={...req.body};
        const id= employees.employees.length;
        newEmploye.id=id;
        employees.employees.push(newEmploye);
        res.send(employees.employees);
        //res.send('saved');
    }else{
        res.status(500).json({error:"Something was wrong"})
        //res.send('Error');
    }
})

//detele a row from database with id
router.delete(endpoint+'/:id',(req,res)=>{
    const {id}=req.params;
    _.each(employees.employees, (employe,i)=>{
        if(employe!=undefined){
            if(employe.id==id){
                employees.employees.splice(i,1);
            }
        }
    });
    res.json(employees.employees);
});

//put a element in a database
router.put(endpoint+'/:id',(req,res)=>{
    const {id}=req.params;
    const {age,name}=req.body;
    if(age && name){
        _.each(employees.employees, (employe,i)=>{
            if(employe.id==id){
                employe.age=age;
                employe.name=name;
            }
        });
        res.send(employees.employees);
    }else{
        req.status(500).json({error:"Something was wrong"});
    }
});

//get json data from another API
router.get(endpoint+'/jsonplaceholder', async (req,res)=>{
    const r=await fetch('https://jsonplaceholder.typicode.com/todos');
    const resp=await r.json();
    res.json(resp);
})

module.exports=router;