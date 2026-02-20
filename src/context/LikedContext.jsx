import React, { createContext, useState, useEffect, useMemo } from 'react';

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

    // Memoize the value to prevent unnecessary re-renders of consumers
    const contextValue = useMemo(() => {
        // We compute likedIds here so it updates when likedMeals changes
        const likedIds = likedMeals.map(meal => meal.id);

        return {
            likedMeals: likedIds,
            likedMealsData: likedMeals,
            toggleLike,
            isLiked,
            updateRating,
            updateNotes
        };
    }, [likedMeals]); // Recompute only when likedMeals state changes

    return (
        <LikedContext.Provider value={contextValue}>
            {children}
        </LikedContext.Provider>
    );
};
