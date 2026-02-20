import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { LikedProvider } from './context/LikedContext';
import SearchMeals from './pages/SearchMeals';
import MealDetails from './pages/MealDetails';
import LikedMeals from './pages/LikedMeals';
import Categories from './pages/Categories';
import CategoryMeals from './pages/CategoryMeals';

function App() {
  return (
    <LikedProvider>
      <BrowserRouter>
        <Navbar />
        <main className="page-wrapper container">
          <Routes>
            <Route path="/" element={<SearchMeals />} />
            <Route path="/meal/:id" element={<MealDetails />} />
            <Route path="/liked" element={<LikedMeals />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:name" element={<CategoryMeals />} />
          </Routes>
        </main>
      </BrowserRouter>
    </LikedProvider>
  );
}

export default App;
