const express = require('express');
const { Category } = require('../models/category.js');
const router = express.Router();

router.get(`/`, async(req, res) => {
    const categoryList = await Category.find();

    if(!categoryList){
        res.status(500).json({success:false})
    }
    res.status(200).send(categoryList);
})

router.get(`/:id`, async(req, res) => {
    const category = await Category.findById(req.params.id);

    if(!category){
        res.status(500).json({success:false, message:'The Category by the given id is not available!'})
    }
    res.status(200).send(category);
})

router.put(`/:id`, async(req, res) =>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon || category.icon,
            color: req.body.color
        },
        {new: true}
    )
    if(!category){
        res.status(400).json({success:false, message:'The Category cannot be created!'})
    }
    res.status(200).send(category);

})

router.post('/', async(req,res)=>{
    const category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    await category.save();
    if(!category){
        return res.status(404).send('The category cannot be created!')
    }
    res.send(category);
})

router.delete('/:id', async(req,res)=>{
    await Category.findByIdAndDelete(req.params.id)
    .then(category => {
        if(category){
            return res.status(200).json({success:true, message:'The category has been deleted!'})
        } else{
            return res.status(404).json({success:false, message:'No category exists!'})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error:err})
    })
})

module.exports = router;