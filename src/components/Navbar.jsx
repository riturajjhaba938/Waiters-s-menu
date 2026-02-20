import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LikedContext } from '../context/LikedContext';
import { Utensils, Heart, LayoutGrid, Search, ShoppingCart, Dices } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const { likedMeals } = useContext(LikedContext);
    const navigate = useNavigate();

    const handleSurpriseMe = async () => {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json();
            if (data.meals && data.meals.length > 0) {
                navigate(`/meal/${data.meals[0].idMeal}`);
            }
        } catch (error) {
            console.error("Failed to fetch random meal:", error);
            alert("Oops! Couldn't find a surprise meal right now.");
        }
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <NavLink to="/" className="nav-logo">
                    <Utensils className="logo-icon" />
                    <span>Waiter's Menu</span>
                </NavLink>

                <ul className="nav-links">
                    <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end>
                            <Search size={18} />
                            <span className="nav-text">Search</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/categories" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                            <LayoutGrid size={18} />
                            <span className="nav-text">Categories</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/liked" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                            <div className="heart-container">
                                <Heart size={18} />
                                {likedMeals.length > 0 && <span className="badge">{likedMeals.length}</span>}
                            </div>
                            <span className="nav-text">Liked</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/shopping-list" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                            <ShoppingCart size={18} />
                            <span className="nav-text">List</span>
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={handleSurpriseMe} className="nav-link surprise-btn">
                            <Dices size={18} />
                            <span className="nav-text">Surprise</span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
