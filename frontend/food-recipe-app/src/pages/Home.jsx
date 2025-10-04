import React, { useState } from 'react'
import foodRecipe from '../assets/profile.png'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RecipeItems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'
import InputForm from '../components/InputForm'
import Modal from '../components/Modal'

function Home() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const addRecipe =()=>{
        let token = localStorage.getItem("token")
        if(token){
            navigate("/addRecipe")
        }
        else{
            setIsOpen(true)
        }
    }
  return (
    <>
    
    <section className='home'>
        <div className='left'>
            <h1>Food Recipe</h1>
            <h5>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</h5>
            <button onClick={addRecipe}>Share your Recipe</button>
        </div>
        <div className='right'>
            <img src={foodRecipe} width= "320px" height = "300px" />
        </div>
    </section>
    <div className='bg'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,160L24,160C48,160,96,160,144,170.7C192,181,240,203,288,181.3C336,160,384,96,432,101.3C480,107,528,181,576,192C624,203,672,149,720,160C768,171,816,245,864,282.7C912,320,960,320,1008,277.3C1056,235,1104,149,1152,138.7C1200,128,1248,192,1296,208C1344,224,1392,192,1416,176L1440,160L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path></svg>
    </div>
    <div className='recipe'>
        <RecipeItems/>
    </div>
    {(isOpen) && <Modal onClose = {()=>setIsOpen(false)}> <InputForm setIsOpen ={ ()=>{ setIsOpen(false)}} /> </Modal>}
    </>
  )
}

export default Home