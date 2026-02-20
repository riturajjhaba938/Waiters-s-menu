import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
                if (!response.ok) throw new Error('Failed to fetch categories');

                const data = await response.json();
                setCategories(data.categories || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="loading fade-in">
                <div className="loading-spinner"></div>
                <p>Loading meal categories...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error fade-in">
                <h3>Uh oh! We couldn't load the categories.</h3>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="btn btn-primary mt-2">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="categories-page fade-in">
            <div className="search-header">
                <h1>Meal Categories</h1>
                <p>Browse meals by their type to find precisely what you're craving.</p>
            </div>

            <div className="categories-grid grid">
                {categories.map((category) => (
                    <div
                        key={category.idCategory}
                        className="category-card card"
                        onClick={() => navigate(`/category/${category.strCategory}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="category-img-container">
                            <img
                                src={category.strCategoryThumb}
                                alt={category.strCategory}
                                className="category-img"
                                loading="lazy"
                            />
                        </div>
                        <div className="category-content card-content">
                            <h3 className="category-title">{category.strCategory}</h3>
                            <p className="category-desc">
                                {category.strCategoryDescription.substring(0, 100)}...
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
