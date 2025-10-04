const express = require("express")
const { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe,upload } = require("../controller/recipe")
const verifytoken = require("../middleware/auth")
const router = express.Router()

router.get('/',getRecipes)//this is to get all the recipe
router.get('/:id',getRecipe) //to get the recipe by id
router.post('/', upload.single('file'), verifytoken, addRecipe) //to add the recipe
router.put('/:id', editRecipe) // to edit the recipe
router.delete('/:id', deleteRecipe) //to delete the recipe

module.exports = router