import { createRootRoute, createRouter } from '@tanstack/react-router';
import App from '../App';
import { landingRoute } from './landingPage.router.jsx';
import { dashboardRoute } from './dashboard.router.jsx';
import { authRoute } from './auth.router.jsx';

// Root route - This is the layout wrapper for all routes
export const rootRoute = createRootRoute({
    component: App,
});

// Build the route tree
export const routeTree = rootRoute.addChildren([landingRoute, dashboardRoute, authRoute]);

// Create the router instance
export const router = createRouter({ routeTree });