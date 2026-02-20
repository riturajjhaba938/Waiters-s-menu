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

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <LikedProvider>
        <BrowserRouter>
          <Navbar />
          <main className="page-wrapper container" style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<SearchMeals />} />
              <Route path="/meal/:id" element={<MealDetails />} />
              <Route path="/liked" element={<LikedMeals />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:name" element={<CategoryMeals />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </LikedProvider>
    </div>
  );
}

export default App;
