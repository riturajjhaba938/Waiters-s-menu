import React, { useState, useEffect, useContext } from 'react';
import { LikedContext } from '../context/LikedContext';
import { ShoppingCart, CheckCircle, Circle, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ShoppingList.css';

const ShoppingList = () => {
    const { likedMeals } = useContext(LikedContext);
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const generateShoppingList = async () => {
            if (likedMeals.length === 0) {
                setIngredients([]);
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

                // Extract and deduplicate ingredients
                const ingredientMap = new Map();

                validMeals.forEach(meal => {
                    for (let i = 1; i <= 20; i++) {
                        const ing = meal[`strIngredient${i}`];
                        const measure = meal[`strMeasure${i}`];

                        if (ing && ing.trim() !== '') {
                            const name = ing.trim().toLowerCase();
                            const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
                            const measureStr = measure ? measure.trim() : '';

                            if (ingredientMap.has(formattedName)) {
                                const existing = ingredientMap.get(formattedName);
                                if (measureStr && !existing.measures.includes(measureStr)) {
                                    existing.measures.push(measureStr);
                                }
                            } else {
                                ingredientMap.set(formattedName, {
                                    name: formattedName,
                                    measures: measureStr ? [measureStr] : [],
                                    checked: false,
                                    id: `${meal.idMeal}-${i}`
                                });
                            }
                        }
                    }
                });

                setIngredients(Array.from(ingredientMap.values()).sort((a, b) => a.name.localeCompare(b.name)));
            } catch (err) {
                setError('Failed to generate shopping list from liked meals.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        generateShoppingList();
    }, [likedMeals]);

    const toggleCheck = (name) => {
        setIngredients(prev => prev.map(ing =>
            ing.name === name ? { ...ing, checked: !ing.checked } : ing
        ));
    };

    const clearChecked = () => {
        setIngredients(prev => prev.filter(ing => !ing.checked));
    };

    const checkedCount = ingredients.filter(i => i.checked).length;
    const totalCount = ingredients.length;

    return (
        <div className="shopping-page fade-in">
            <button onClick={() => navigate(-1)} className="btn back-btn" style={{ marginBottom: '2rem', alignSelf: 'flex-start' }}>
                <ArrowLeft size={20} /> Back
            </button>

            <div className="search-header">
                <h1>Smart Shopping List</h1>
                <p>Auto-generated from your {likedMeals.length} liked recipes.</p>
            </div>

            {loading && (
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Compiling your ultimate shopping list...</p>
                </div>
            )}

            {error && (
                <div className="error">
                    <h3>Oops! Something went wrong.</h3>
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && ingredients.length === 0 && (
                <div className="empty-state">
                    <ShoppingCart size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem' }} />
                    <h3>Your list is empty</h3>
                    <p>Like some meals to automatically generate a grocery list!</p>
                </div>
            )}

            {!loading && !error && ingredients.length > 0 && (
                <div className="shopping-container">
                    <div className="shopping-stats">
                        <span>{checkedCount} / {totalCount} items collected</span>
                        {checkedCount > 0 && (
                            <button className="btn btn-icon clear-btn-inline" onClick={clearChecked} aria-label="Clear checked">
                                <Trash2 size={18} />
                            </button>
                        )}
                    </div>

                    <ul className="shopping-list">
                        {ingredients.map(ing => (
                            <li
                                key={ing.name}
                                className={`shopping-item ${ing.checked ? 'checked' : ''}`}
                                onClick={() => toggleCheck(ing.name)}
                            >
                                <div className="checkbox">
                                    {ing.checked ? <CheckCircle className="check-icon" size={24} /> : <Circle className="uncheck-icon" size={24} />}
                                </div>
                                <div className="item-details">
                                    <span className="item-name">{ing.name}</span>
                                    {ing.measures.length > 0 && (
                                        <span className="item-measure">({ing.measures.join(' + ')})</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ShoppingList;
