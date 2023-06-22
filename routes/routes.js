const express = require('express');
const router = express.Router();

const Model= require('../models/model');
//Post method
router.post('/post', async(req,res)=>{
   
 const data = new Model({
        name: req.body.name,
        age: req.body.age
    })
try{
    const savedData = await data.save();
    res.status(201).json(savedData)
} catch(error){
    res.status(400).json({message: error.message})
}
})
//get all

router.get('/getData',async(req,res)=>{
    try{
        const data = await Model.find();
       res.json(data)
     
    }
    catch(error){
        res.status(500).json({message: error.message})

    }
    // res.send("GET DATA API");

})

//get the data by id
router.get('/getOne/:id',async(req,res)=>{
    try{
        const data = await Model.findById(req.params.id);
        res.json(data);

    }
    catch(error){
        res.status(500).json({message: error.message})

    }
    // res.send("GET DATA  BY ID API");

})

//update the data using update
router.patch('/update/:id',async(req,res)=>{
    try{
       const id = req.params.id;
       const updatedData=req.body;
       const options = {new:true};

       const result = await Model.findByIdAndUpdate(id , updatedData, options)
        res.send(result);

    }
    catch(error){
        res.status(400).json({message: error.message})

    }
    // res.send("UPDATE BY ID API");

})

//delete the data by using id


router.delete('/delete/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const result = await Model.findByIdAndDelete(id);
        res.send("Deleted Successfully", result);

    }
    catch(error){
        res.status(400).json({message: error.message})

    }


    // res.send("DELETE API BY ID");

})
module.exports= router;