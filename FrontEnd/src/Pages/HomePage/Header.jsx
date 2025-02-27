import React, { useState } from 'react'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';



export default function Header({favorites, setFavorites, add_fav, showinfo, setShowinfo, showfav, setShowfav}) {

    const { isLoggedIn, userId, logout } = useAuth();
    const navigate = useNavigate();


    const loginNotification = () => {
            toast.error('Please Log in to get your favorites.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
    };



    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login page
    };


    const handleShowFav  = () =>{
        isLoggedIn 
        ?
        setShowfav(!showfav)
        :
        loginNotification()
    }

  return (
    <div>


    <header class="header">
        <nav class="navbar navbar-expand-lg  container">
            <a class="title fw-bold" href="#">Nifty Bubbles</a>

            {/* <div className='input'>
                            <i className="fa fa-search"></i>
                            <input type="text" name="" placeholder="Search Nifty 50 Companies" className='searchbar'/>
            </div> */}



            <div className="dropdown d1">

                    <button className={`settingsbtn ${(showfav) ? "selectedbtn" : ""}`} onClick={handleShowFav}>
                        <i class="fa-solid fa-heart"></i>
                    </button>

            </div>
            
            <div className="totable" >
                <a href='#tbl'><button className="totablebtn" type="button" >
                    <i class="fa-solid fa-bars"></i>
                </button></a>
            </div>
            <div className="settings">
                <div className="dropdown">
                    <button class="btn btn-secondary settingsbtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-user"></i>
                    </button>


                    <ul className='dropdown-menu d21'>
                        {isLoggedIn ? (
                            <span onClick={handleLogout}>Logout</span>
                        ) : (
                            <Link to='/login' className='lgn'>
                                    <span>Login</span>
                            </Link>
                        )}
                    </ul>

                </div>          
            </div>
        </nav>
        <ToastContainer />
    </header>
    

    

    </div>
  )
}
