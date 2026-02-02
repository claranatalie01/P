/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import Home from './pages/Home';
import KYBStep1 from './pages/KYBStep1';
import KYBStep2 from './pages/KYBStep2';
import KYBStep3 from './pages/KYBStep3';
import KYCStep1 from './pages/KYCStep1';
import KYCStep2 from './pages/KYCStep2';
import KYCStep3 from './pages/KYCStep3';
import Welcome from './pages/Welcome';


export const PAGES = {
    "Home": Home,
    "KYBStep1": KYBStep1,
    "KYBStep2": KYBStep2,
    "KYBStep3": KYBStep3,
    "KYCStep1": KYCStep1,
    "KYCStep2": KYCStep2,
    "KYCStep3": KYCStep3,
    "Welcome": Welcome,
}

export const pagesConfig = {
    mainPage: "Welcome",
    Pages: PAGES,
};