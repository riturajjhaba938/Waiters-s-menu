import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { LikedContext } from '../context/LikedContext';
import { ArrowLeft, Heart, Globe, UtensilsCrossed } from 'lucide-react';
import './MealDetails.css';

const MealDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { toggleLike, isLiked } = useContext(LikedContext);

    useEffect(() => {
        const fetchMealDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                if (!response.ok) throw new Error('Failed to fetch meal details');

                const data = await response.json();
                if (data.meals && data.meals.length > 0) {
                    setMeal(data.meals[0]);
                } else {
                    throw new Error('Meal not found');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMealDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="loading">
                <div className="loading-spinner"></div>
                <p>Loading meal details...</p>
            </div>
        );
    }

    if (error || !meal) {
        return (
            <div className="error">
                <h3>Uh oh! We couldn't find that meal.</h3>
                <p>{error}</p>
                <button onClick={() => navigate(-1)} className="btn btn-primary mt-2">
                    Go Back
                </button>
            </div>
        );
    }

    // Extract ingredients
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push({ name: ingredient, measure: measure });
        }
    }

    // Instructions formatting
    const formattedInstructions = meal.strInstructions
        .split('.')
        .filter(sentence => sentence.trim().length > 0)
        .slice(0, 10); // Display a shortened, manageable list of instructions

    // Extract YouTube ID
    let youtubeId = null;
    if (meal.strYoutube) {
        const urlPattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = meal.strYoutube.match(urlPattern);
        if (match && match[1]) {
            youtubeId = match[1];
        }
    }

    return (
        <div className="meal-details fade-in">
            <button onClick={() => navigate(-1)} className="btn back-btn">
                <ArrowLeft size={20} /> Back
            </button>

            <div className="details-header">
                <div className="details-image-container">
                    <img src={meal.strMealThumb} alt={meal.strMeal} className="details-image" />
                    <button
                        onClick={() => toggleLike(meal.idMeal)}
                        className={`like-fab ${isLiked(meal.idMeal) ? 'active' : ''}`}
                        aria-label="Toggle Like"
                    >
                        <Heart size={28} fill={isLiked(meal.idMeal) ? 'currentColor' : 'none'} />
                    </button>
                </div>

                <div className="details-info">
                    <h1 className="details-title">{meal.strMeal}</h1>

                    <div className="details-tags">
                        <span className="tag"><UtensilsCrossed size={16} /> {meal.strCategory}</span>
                        <span className="tag"><Globe size={16} /> {meal.strArea}</span>
                    </div>

                    <div className="ingredients-section">
                        <h3>Key Ingredients (Click to Explore)</h3>
                        <ul className="ingredients-list">
                            {ingredients.map((ing, idx) => (
                                <li key={idx}>
                                    <Link to={`/ingredient/${ing.name}`} className="ingredient-link">
                                        <strong>{ing.measure}</strong> {ing.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {youtubeId && (
                <div className="video-section">
                    <h2>Recipe Video</h2>
                    <div className="video-container">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            <div className="instructions-section">
                <h2>Instructions</h2>
                <div className="instructions-list">
                    {formattedInstructions.map((step, idx) => (
                        <p key={idx} className="instruction-step">
                            <span className="step-number">{idx + 1}</span>
                            {step.trim()}.
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MealDetails;
