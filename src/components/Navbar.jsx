import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LikedContext } from '../context/LikedContext';
import { Utensils, Heart, LayoutGrid, Search } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const { likedMeals } = useContext(LikedContext);

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
                            <span>Search</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/categories" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                            <LayoutGrid size={18} />
                            <span>Categories</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/liked" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                            <div className="heart-container">
                                <Heart size={18} />
                                {likedMeals.length > 0 && <span className="badge">{likedMeals.length}</span>}
                            </div>
                            <span>Liked</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
