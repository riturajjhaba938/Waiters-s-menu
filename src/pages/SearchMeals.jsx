import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LikedContext } from '../context/LikedContext';
import { Search, Heart, Info, X, Filter, ArrowDownAZ, ArrowUpZA } from 'lucide-react';
import './SearchMeals.css';

const SearchMeals = () => {
    const [meals, setMeals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { toggleLike, isLiked } = useContext(LikedContext);

    // Advanced Filtering and Sorting States
    const [filterArea, setFilterArea] = useState('All');
    const [sortOrder, setSortOrder] = useState('default'); // 'default', 'az', 'za'

    const fetchMeals = async (query = '') => {
        setLoading(true);
        setError(null);
        try {
            const url = query
                ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
                : 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';

            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch data');

            const data = await response.json();
            setMeals(data.meals || []);
            // Reset filters on new search
            setFilterArea('All');
            setSortOrder('default');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMeals();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchMeals(searchTerm);
    };

    const clearSearch = () => {
        setSearchTerm('');
        fetchMeals();
    };

    // Extract unique areas for the filter dropdown
    const availableAreas = useMemo(() => {
        if (!meals || meals.length === 0) return [];
        const areas = meals.map(meal => meal.strArea).filter(Boolean);
        return [...new Set(areas)].sort();
    }, [meals]);

    // Apply filtering and sorting
    const processedMeals = useMemo(() => {
        if (!meals || meals.length === 0) return [];

        let result = [...meals];

        // Apply Area Filter
        if (filterArea !== 'All') {
            result = result.filter(meal => meal.strArea === filterArea);
        }

        // Apply Alphabetical Sorting
        if (sortOrder === 'az') {
            result.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
        } else if (sortOrder === 'za') {
            result.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
        }

        return result;
    }, [meals, filterArea, sortOrder]);

    return (
        <div className="search-page fade-in">
            <div className="search-header">
                <h1>Waiter's Menu</h1>
                <p>Serving to Chefs</p>

                <form onSubmit={handleSearch} className="search-bar">
                    <div className="search-input-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search for a meal (e.g., Chicken, Pasta...)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button type="button" onClick={clearSearch} className="clear-btn">
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary search-btn">
                        Find Meals
                    </button>
                </form>

                {/* Advanced Filters */}
                {!loading && !error && meals.length > 0 && (
                    <div className="filters-container">
                        <div className="filter-group">
                            <label><Filter size={16} /> Area:</label>
                            <select
                                value={filterArea}
                                onChange={(e) => setFilterArea(e.target.value)}
                                className="filter-select"
                            >
                                <option value="All">All Regions</option>
                                {availableAreas.map(area => (
                                    <option key={area} value={area}>{area}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Sort By:</label>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="filter-select"
                            >
                                <option value="default">Relevance</option>
                                <option value="az">A to Z</option>
                                <option value="za">Z to A</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {loading && (
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Cooking up some delicious results...</p>
                </div>
            )}

            {error && (
                <div className="error">
                    <h3>Oops! Something went wrong.</h3>
                    <p>{error}</p>
                    <button onClick={() => fetchMeals(searchTerm)} className="btn btn-primary mt-2">
                        Try Again
                    </button>
                </div>
            )}

            {!loading && !error && meals.length === 0 && (
                <div className="empty-state">
                    <h3>No meals found</h3>
                    <p>We couldn't find any meals matching "{searchTerm}". Try another ingredient!</p>
                    <button onClick={clearSearch} className="btn btn-primary mt-2">
                        Clear Search
                    </button>
                </div>
            )}

            {!loading && !error && meals.length > 0 && processedMeals.length === 0 && (
                <div className="empty-state">
                    <h3>No meals match these filters</h3>
                    <p>Try changing your Area selection.</p>
                    <button onClick={() => setFilterArea('All')} className="btn btn-primary mt-2">
                        Reset Filters
                    </button>
                </div>
            )}

            {!loading && !error && processedMeals.length > 0 && (
                <div className="grid">
                    {processedMeals.map((meal) => (
                        <div key={meal.idMeal} className="card">
                            <img
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                className="card-img"
                                loading="lazy"
                            />
                            <div className="card-content">
                                <span className="card-category">{meal.strArea} • {meal.strCategory}</span>
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

export default SearchMeals;
