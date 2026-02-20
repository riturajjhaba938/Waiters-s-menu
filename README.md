# 🍽️ Waiter's Menu

Welcome to **Waiter's Menu** – Serving to Chefs!
A dynamic, highly responsive single-page Recipe application built using React and Vite, powered by [TheMealDB API](https://www.themealdb.com/).

![App Workflow Demonstration](./app_workflow_demo.webp)

This application is designed with pure Vanilla CSS, prioritizing elegant designs, smooth transitions, and state-of-the-art UI paradigms over standard frontend styling frameworks.

## ✨ Features

- **Categorical Exploration**: Browse dozens of meal categories retrieved live (such as Seafood, Vegetarian, Breakfast).
- **Deep Search Functionality**: Look up specific meals dynamically using text input keywords.
- **Advanced Sorting & Filtering**: Filter meals by Region (Italian, Mexican) and sort them Alphabetically (A-Z or Z-A).
- **Video Embeds**: Full recipe pages automatically integrate and embed responsive YouTube guide videos for the meal when available.
- **Save Liked Meals**: Click the heart icon anywhere in the app to save favorites locally. These persist directly in your browser!
- **User Annotations**: Personalize your Liked Meals list by leaving 1 to 5 Star ratings and a custom note field for every saved recipe.
- **Ingredient Navigation**: In any active Recipe page, click on a Key Ingredient link to instantly route to a list of *every other* meal that utilizes that same ingredient!
- **Smart Shopping List**: Access your Shopping List via the Navbar. It will scan all your Liked Meals, extract the individual ingredient measurements, deduplicate identical items, and generate a streamlined grocery checklist!
- **"Surprise Me" Module**: Click the dice icon in the top Navbar for a completely randomized meal discovery experience.

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) via [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Styling**: Pure CSS (CSS Modules & Global Variables) - *No external UI frameworks like Tailwind CSS were used.*
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API (`LikedContext`) + `localStorage`
- **Data Source**: [TheMealDB](https://www.themealdb.com/api.php)

## 🚀 Local Development Setup

To get this project running on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/riturajjhaba938/Waiters-s-menu.git
   cd Waiters-s-menu
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for Production:**
   To create an optimized build ready for hosting:
   ```bash
   npm run build
   ```

## 🏗️ Project Architecture

```
src/
├── components/       # Reusable UI parts (Navbar, Footer, etc.)
├── context/          # React Context providers (LikedContext for global state)
├── pages/            # Main application views (Search, Liked, Categories, Details, ShoppingList)
├── App.jsx           # Main routing component
├── index.css         # Global design system variables and layout styling
└── main.jsx          # React entry point
```

## 🌐 Deployment (Vercel)

This project has been configured for easy deployment on **Vercel** with Client-Side Routing. A `vercel.json` file is included in the root directory which properly redirects all path fallbacks to `index.html`.

---
*Built with ❤️ for culinary exploration.*
