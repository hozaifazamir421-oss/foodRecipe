
import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { RxStopwatch } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function RecipeItems() {
    const allRecipes = useLoaderData()
    let path = window.location.pathname === "/myRecipe"? true: false
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
                                    {(!path)?<FaRegHeart /> :
                                    <div className='action'>
                                    <Link to = {`/editRecipe/${item._id}`} className='editIcon'><MdEdit /></Link>
                                    <MdDelete className='deleteIcon'/>
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