import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LikedContext } from '../context/LikedContext';
import { Heart, Info, HeartOff } from 'lucide-react';

const LikedMeals = () => {
    const { likedMeals, toggleLike, isLiked } = useContext(LikedContext);
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLikedDetails = async () => {
            if (likedMeals.length === 0) {
                setMeals([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const promises = likedMeals.map(id =>
                    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                        .then(res => {
                            if (!res.ok) throw new Error('Network response was not ok');
                            return res.json();
                        })
                );

                const results = await Promise.all(promises);
                const validMeals = results.map(r => r.meals ? r.meals[0] : null).filter(Boolean);
                setMeals(validMeals);
            } catch (err) {
                setError('Failed to load your liked meals. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLikedDetails();
    }, [likedMeals]);

    return (
        <div className="liked-page fade-in">
            <div className="search-header">
                <h1>Your Liked Meals</h1>
                <p>All your carefully selected favorites in one place.</p>
            </div>

            {loading && (
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Retrieving your saved meals...</p>
                </div>
            )}

            {error && (
                <div className="error">
                    <h3>Oops! Something went wrong.</h3>
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && meals.length === 0 && (
                <div className="empty-state">
                    <HeartOff size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem' }} />
                    <h3>No liked meals yet</h3>
                    <p>You haven't saved any recipes yet. Go back to search and find something delicious!</p>
                    <Link to="/" className="btn btn-primary mt-2">
                        Explore Meals
                    </Link>
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
                                <span className="card-category">{meal.strCategory}</span>
                                <h3 className="card-title" title={meal.strMeal}>{meal.strMeal}</h3>

                                <div className="card-actions">
                                    <Link to={`/meal/${meal.idMeal}`} className="btn btn-primary">
                                        <Info size={18} /> View Details
                                    </Link>
                                    <button
                                        onClick={() => toggleLike(meal.idMeal)}
                                        className={`btn-icon ${isLiked(meal.idMeal) ? 'active' : ''}`}
                                        aria-label="Remove Like"
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

export default LikedMeals;
