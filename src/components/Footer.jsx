import React from 'react';
import { Utensils, Github, Twitter, Instagram } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <Utensils className="logo-icon" />
                        <span>Waiter's Menu</span>
                    </div>
                    <p className="footer-slogan">Serving to Chefs</p>
                    <div className="footer-socials">
                        <a href="#" aria-label="GitHub"><Github size={20} /></a>
                        <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                        <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <div className="footer-column">
                        <h3>Explore</h3>
                        <ul>
                            <li><a href="/">Search Meals</a></li>
                            <li><a href="/categories">Categories</a></li>
                            <li><a href="/liked">Liked Recipes</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">Our Story</a></li>
                            <li><a href="#">The Team</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>Legal</h3>
                        <ul>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Waiter's Menu. All rights reserved.</p>
                    <p className="api-credit">Data powered by <a href="https://www.themealdb.com/" target="_blank" rel="noreferrer">TheMealDB API</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
