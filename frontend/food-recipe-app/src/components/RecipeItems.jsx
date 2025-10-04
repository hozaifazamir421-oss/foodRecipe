
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import foodRecipe from '../assets/biryanipng.png'
import { RxStopwatch } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa6";

function RecipeItems() {
    const allRecipes = useLoaderData()
    console.log(allRecipes)
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
                                    <FaRegHeart />
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