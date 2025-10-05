const Recipes = require('../models/recipe')
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

const getRecipes = async(req,res)=>{
    const recipes = await Recipes.find()
    return res.json(recipes)
}

const getRecipe = async (req,res)=>{
    const recipe = await Recipes.findById(req.params.id)
    if(!recipe){
        return res.status(404).json({message: "recipe not found"})
    }
    return res.json(recipe)
}

const  addRecipe = async (req,res)=>{
    console.log(req.user)
    const {title, ingredients, instructions, time} = req.body

    if(!title || !ingredients || !instructions){
    res.json({message: "Required fields cannot be empty"})
    }

    const newRecipe = await Recipes.create({
        title, ingredients, instructions, time, coverimage:req.file.filename,
        createdBy:req.user.id
    })

    return res.json(newRecipe)
}

const editRecipe = async(req,res)=>{
    const {title, ingredients, instructions, time} = req.body
    let recipe = await Recipes.findById(req.params.id)
    if(!recipe){
        res.status(404).json({message: "recipe not found !!!"})
    }
    try{
        if(recipe){
            let coverimage = req.file?.filename? req.file?.filename : recipe.coverimage
            await Recipes.findByIdAndUpdate(req.params.id, {...req.body,coverimage}, {new:true})
            return res.json({title, ingredients, instructions, time})
        }
    }
    catch(err){
        return res.status(404).json({message: "error"})
    }
}

const deleteRecipe = async (req,res)=>{
    let recipe = await Recipes.findById(req.params.id)
    if(!recipe){
        res.status(404).json({message: "recipe not found !!!"})
    }
    try{
        if(recipe){
        await Recipes.findByIdAndDelete(req.params.id)
        res.json({message: "the recipe is deleted !!!"})
        }
    }
    catch(err){
        return res.status(404).json({message: "error"})
    }
}

module.exports = {getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload}