import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LikedContext } from '../context/LikedContext';
import { Heart, Info, ArrowLeft } from 'lucide-react';

const IngredientMeals = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { toggleLike, isLiked } = useContext(LikedContext);

    useEffect(() => {
        const fetchMealsByIngredient = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
                if (!response.ok) throw new Error('Failed to fetch ingredient meals');

                const data = await response.json();
                setMeals(data.meals || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMealsByIngredient();
    }, [name]);

    return (
        <div className="search-page fade-in">
            <button onClick={() => navigate(-1)} className="btn back-btn" style={{ marginBottom: '2rem', alignSelf: 'flex-start' }}>
                <ArrowLeft size={20} /> Back
            </button>

            <div className="search-header">
                <h1>Meals with {name}</h1>
                <p>Explore all delicious recipes featuring {name.toLowerCase()}.</p>
            </div>

            {loading && (
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Loading {name} meals...</p>
                </div>
            )}

            {error && (
                <div className="error">
                    <h3>Oops! Something went wrong.</h3>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className="btn btn-primary mt-2">
                        Try Again
                    </button>
                </div>
            )}

            {!loading && !error && meals.length === 0 && (
                <div className="empty-state">
                    <h3>No meals found</h3>
                    <p>We couldn't find any meals featuring {name}.</p>
                </div>
            )}

            {!loading && !error && meals.length > 0 && (
                <div className="grid">
                    {meals.map((meal) => (
                        <div key={meal.idMeal} className="card">
                            <img
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                className="card-img"
                                loading="lazy"
                            />
                            <div className="card-content">
                                <span className="card-category">Features {name}</span>
                                <h3 className="card-title" title={meal.strMeal}>{meal.strMeal}</h3>

                                <div className="card-actions">
                                    <Link to={`/meal/${meal.idMeal}`} className="btn btn-primary">
                                        <Info size={18} /> View Details
                                    </Link>
                                    <button
                                        onClick={() => toggleLike(meal.idMeal)}
                                        className={`btn-icon ${isLiked(meal.idMeal) ? 'active' : ''}`}
                                        aria-label="Toggle Like"
                                    >
                                        <Heart size={20} fill={isLiked(meal.idMeal) ? 'currentColor' : 'none'} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default IngredientMeals;
