import React, { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Popup from './Popup.jsx';
import api from '../../api/axios';
import { useAuth } from '../AuthContext';
import { ToastContainer, toast } from 'react-toastify';

export default function HomePage() {
    const { userId } = useAuth();
    const [favorites, setFavorites] = useState([]);

    const addedNotification = (comp) => {
        toast.success('Successfully Added ' + comp, {
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

    const loginNotification = () => {
        toast.error('Please Log in to add personalized favorites.', {
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

    const otherNotification = (error) => {
        toast.error(error, {
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

    const delNotification = (comp) => {
        toast.error(comp + " has been removed from Favorites", {
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

    const fetchFavorites = async () => {
      console.log(userId)
        if (userId === 0) return; // Don't fetch if not logged in
        try {
            const response = await api.get(`https://13.61.33.80/user/favorites/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            if (response.status === 200) {
                setFavorites(response.data);
            } else {
                throw new Error(`Failed to fetch favorites. Status: ${response.status}`);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        fetchFavorites();
        console.log(favorites)
    }, [userId]); // Add userId to the dependency array

    const add_fav = async (comp) => {
        if (userId === 0) {
            loginNotification();
            return;
        }
        let input = {
            company: comp,
            user_id: userId,
        };
        try {
            await api.post('/user/favorites', input, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            fetchFavorites(); // Re-fetch favorites after adding
            addedNotification(comp);
            console.log(favorites)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.detail) {
                otherNotification(error.response.data.detail);
            } else {
                otherNotification("An unexpected error occurred");
            }
        }
    };

    const del_fav = async (comp) => {
        if (userId === 0) {
            loginNotification();
            return;
        }
    
        try {
            await api.delete('/user/favorites', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
                data: {
                    company: comp,
                    user_id: userId,
                }, 
            });
    
            fetchFavorites(); 
            delNotification(comp);
            console.log(favorites);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.detail) {
                otherNotification(error.response.data.detail);
            } else {
                otherNotification("An unexpected error occurred");
            }
        }
    };
    



    return (
        <div>
            <Popup favorites={favorites} setFavorites={setFavorites} add_fav={add_fav} del_fav = {del_fav}/>
            <ToastContainer />
        </div>
    );
}