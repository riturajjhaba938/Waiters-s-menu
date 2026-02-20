import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { LikedProvider } from './context/LikedContext';
import SearchMeals from './pages/SearchMeals';
import MealDetails from './pages/MealDetails';
import LikedMeals from './pages/LikedMeals';
import Categories from './pages/Categories';
import CategoryMeals from './pages/CategoryMeals';
import IngredientMeals from './pages/IngredientMeals';
import ShoppingList from './pages/ShoppingList';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LikedProvider>
        <BrowserRouter>
          <Navbar />
          <main className="page-wrapper container flex-1 w-full" style={{ flexGrow: 1, width: '100%' }}>
            <Routes>
              <Route path="/" element={<SearchMeals />} />
              <Route path="/meal/:id" element={<MealDetails />} />
              <Route path="/liked" element={<LikedMeals />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:name" element={<CategoryMeals />} />
              <Route path="/ingredient/:name" element={<IngredientMeals />} />
              <Route path="/shopping-list" element={<ShoppingList />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </LikedProvider>
    </div>
  );
}

export default App;
