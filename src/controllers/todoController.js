const { json } = require("express");
const todo = require("../models/todoModel");

const todoAdd = async (req, res) => {
    console.log(req.body);
    try {
        const sameTodo = await todo.findOne({name:req.body.name})

        if(sameTodo){
            return res.status(400).json({
                succes:false,
                message:"there is a record in this name"
            })
        }


        const todoAdd =new  todo (req.body)

        await todoAdd.save()
        .then(()=>{
            return res.status(201).json(todoAdd)
        })
        .catch((err)=>{
            return res.status(404).json({
                succes:false,message:"kayıt oluşturulamadı !!!"+err
            })
        })
    } catch (error) {
        return  res.status(500).json({
            succes:false,message:"kayıt oluşturulamadı !!!"
        })
    }
}

const todoGetOne=async (req,res)=>{
    const {id}=req.params
    try {
        const todoGetOne = await todo.findById(id)
        if(todoGetOne){
            return res.status(200).json({
                succes:true,message:"find succesful",
                data:todoGetOne
            })
        }else {
            return res.status(400).json({
                succes:false,
                message: "Find To-Do failed"
            }) 
        }

    } catch (error) {
        return res.status(500).json({
            succes:false,
            message: "Can not get ToDo's"
        })
    }
}

//Kullanımda (örnek => ?page=2) url sonuna örnek gibi eklenmesi gerekiyor 
const todoGetAll = async (req,res)=>{
    const {page}=req.query;
    const limit = 4;
    const skip = Number(page-1)*limit;
    try {
        const todoGetAll = await todo.find({}).limit(limit).skip(skip)
        return res.status(200).json ({
            succes:true,
            data:todoGetAll
        })
    } catch (error) {
        return res.status(500).json({
            succes:false,
            message: "Can not get ToDo's"
        })
        
    }
}

const todoUpdate = async(req,res)=>{
    const {id} =req.params
    try {
        const todoUpdate =await todo.findByIdAndUpdate(id,req.body)
        if(todoUpdate){
            return res.status(200).json({
                succes:true,
                message:"Update successful ",
                data:todoUpdate
            })
        }else return res.status(400).json({
            succes:false,
            message:"Update failed"
        })
    } catch (error) {
        return res.status(500).json({
            succes:false,
            message: "Can not get ToDo's"
        })
    }
}

const todoDelete = async (req,res)=>{
    const {id}=req.params
    try {
        const todoDelete = await todo.findByIdAndDelete(id,req.body)
        if(todoDelete){
        return res.status(200).json({
            succes:true,
            message:"Delete successful "
        })
    }else return res.status(400).json({
        succes:false,
        message:"Delete failed"
    })
    } catch (error) {
        return res.status(500).json({
            succes:false,
            message: "Can not get ToDo's"
        })
    }
}

module.exports = {
    todoAdd,
    todoGetOne,
    todoGetAll,
    todoUpdate,
    todoDelete
}