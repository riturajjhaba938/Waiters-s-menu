import React, { createContext, useState, useEffect } from 'react';

export const LikedContext = createContext();

export const LikedProvider = ({ children }) => {
    const [likedMeals, setLikedMeals] = useState(() => {
        const saved = localStorage.getItem('likedMeals');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('likedMeals', JSON.stringify(likedMeals));
    }, [likedMeals]);

    const toggleLike = (mealId) => {
        setLikedMeals((prev) => {
            if (prev.includes(mealId)) {
                return prev.filter((id) => id !== mealId);
            }
            return [...prev, mealId];
        });
    };

    const isLiked = (mealId) => likedMeals.includes(mealId);

    return (
        <LikedContext.Provider value={{ likedMeals, toggleLike, isLiked }}>
            {children}
        </LikedContext.Provider>
    );
};
