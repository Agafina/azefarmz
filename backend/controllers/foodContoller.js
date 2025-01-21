const foodModel  = require('../models/foodModel')
const fs = require('fs')


// add food
const addFood = async(req, res) => {
    let image_filename = `${req.file.filename}`
    const food  = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category: req.body.category,
        image:image_filename
    })
    
    try{
            await food.save();
            res.json({success:true,mssg:"Food Added"})
    }catch(error){
        res.json({success:false, mssg:error})
    }
    
}

const listFood = async(req, res) => {
    try{
      const foods =   await foodModel.find({})
      res.json({success:true, data:foods})
    }catch(error){
        console.log(error)
        res.json({success:false, mssg:error})
    }
}

const removeFood = async(req, res) => {
    const { id } = req.body
    try{
        const food = await foodModel.findById(id)
        fs.unlink(`uploads/${food.image}`, (err) => {
            if(err){
                console.log("error in deleting image", err)
            }
        })

        await foodModel.findByIdAndDelete(id)
        res.json({success:true, mssg: "item removed"})
    }catch(error){
        console.log(error)
        res.json({success:false, mssg:error})
    }
}

module.exports = {
    addFood,
    listFood,
    removeFood
}