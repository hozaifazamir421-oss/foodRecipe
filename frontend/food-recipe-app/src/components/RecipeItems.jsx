
import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { RxStopwatch } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'

function RecipeItems() {
    const recipes = useLoaderData()
    const [allRecipes,setRecipeData] = useState()
    let path = window.location.pathname === "/myRecipe"? true: false
    console.log(allRecipes)
    let favItem = JSON.parse(localStorage.getItem("fav")) ?? []
    const [isFavRecipe, setIsFavRecipe] = useState(false)

    useEffect(()=>{
        setRecipeData(recipes)
    },[recipes])

    const onDelete = async(id)=>{
        await axios.delete(`http://localhost:5000/recipe/${id}`)
        .then((res)=>{console.log(res)})
        setRecipeData(recipes=>recipes.filter(recipe => recipe._id !== id))
        let filterItem = favItem.filter(recipe=>recipe._id !== id)
        localStorage.setItem("fav",JSON.stringify(filterItem))
    }

    const favRecipe = (item)=>{
        let filterItem = favItem.filter(recipe=>recipe._id !== item._id)
        favItem = favItem.filter(recipe => recipe._id === item._id).length === 0? [...favItem,item]: filterItem
        localStorage.setItem("fav",JSON.stringify(favItem))
        setIsFavRecipe(pre=>!pre)
    }
  return (
    <>
    <div className='card-container'>
            {
                allRecipes?.map((item, index)=>{
                    return(
                        <div key={index} className='card'>
                            <img src={`http://localhost:5000/images/${item.coverimage}`} width ="120px" height = "100px" />
                            <div className='card-body'>
                                <div className='title'>{item.title}</div>
                                <div className='icons'>
                                    <div className='timer'><RxStopwatch />{item.time}</div>
                                    {(!path)?<FaRegHeart onClick={()=>favRecipe(item)}
                                        style={{color: (favItem).some(res => res._id === item._id)? "red" : ""}}/> :
                                    <div className='action'>
                                    <Link to = {`/editRecipe/${item._id}`} className='editIcon'><MdEdit /></Link>
                                    <MdDelete onClick={()=>{onDelete(item._id)}} className='deleteIcon'/>
                                    </div>}
                                </div>

                            </div>
                        </div>
                    )
                })
            }
    </div>
    </>
  )
}

export default RecipeItems