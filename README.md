# Live Link : https://aswear.netlify.app/


# E-Comarce Frontend

A responsive React + Vite frontend for an e-commerce clothing store. This project implements product listing, authentication (Firebase), cart management, and basic profile pages.

## Features
- User authentication (signup/login/email verification) using Firebase
- Product listing, categories (Men, Women, Kids), and product details
- Shopping cart with context-based state management
- Responsive UI with carousel/slider components
- Profile pages: orders, reviews, account

## Tech Stack
- React 19 + Vite
- Firebase
- Axios for API requests
- React Router for routing
- react-slick / slick-carousel for sliders
- TailwindCSS & DaisyUI (project includes Tailwind tooling)

## Quick Start
1. Install dependencies:

	npm install

2. Add your Firebase config to `src/Authentication/Utilities/firebase.init.js` (or update the existing file with your project credentials).

3. Run the dev server:

	npm run dev

4. Build for production:

	npm run build

5. Preview the production build locally:

	npm run preview

## Project Structure (high level)
- `src/components` — UI components (Navbar, Footer, Product cards, Slider, etc.)
- `src/Authentication` — auth pages and utilities
- `src/Pages` — route pages (Home, AllClothes, Cart, Profile, About, etc.)
- `src/Context` / `src/Hook` — providers and custom hooks (auth, cart)

## Notes
- Scripts are defined in `package.json` (`dev`, `build`, `preview`).
- Keep your Firebase keys secure; do not commit sensitive credentials to version control.

## Contributing
Feel free to open issues or submit pull requests for improvements, bug fixes, or new features.

---
Small and simple README created. If you want a longer README (badges, screenshots, deploy steps), I can expand it.
