import React, { createContext, useState, useEffect } from 'react';

export const LikedContext = createContext();

export const LikedProvider = ({ children }) => {
    const [likedMeals, setLikedMeals] = useState(() => {
        const saved = localStorage.getItem('likedMeals');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Backward compatibility: Convert array of strings to array of objects
                if (parsed.length > 0 && typeof parsed[0] === 'string') {
                    return parsed.map(id => ({ id, rating: 0, notes: '' }));
                }
                return parsed;
            } catch (e) {
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('likedMeals', JSON.stringify(likedMeals));
    }, [likedMeals]);

    const toggleLike = (id) => {
        setLikedMeals(prev => {
            const exists = prev.find(meal => meal.id === id);
            if (exists) {
                return prev.filter(meal => meal.id !== id);
            } else {
                return [...prev, { id, rating: 0, notes: '' }];
            }
        });
    };

    const isLiked = (id) => {
        return likedMeals.some(meal => meal.id === id);
    };

    const updateRating = (id, rating) => {
        setLikedMeals(prev => prev.map(meal =>
            meal.id === id ? { ...meal, rating } : meal
        ));
    };

    const updateNotes = (id, notes) => {
        setLikedMeals(prev => prev.map(meal =>
            meal.id === id ? { ...meal, notes } : meal
        ));
    };

    // For ShoppingList and legacy ID arrays
    const getLikedIds = () => likedMeals.map(meal => meal.id);

    return (
        <LikedContext.Provider value={{
            likedMeals: getLikedIds(),
            likedMealsData: likedMeals,
            toggleLike,
            isLiked,
            updateRating,
            updateNotes
        }}>
            {children}
        </LikedContext.Provider>
    );
};
