import { createRoute, lazyRouteComponent } from "@tanstack/react-router";
import { rootRoute } from "./router.jsx";

export const landingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: lazyRouteComponent(() => import('../pages/LandingPage.jsx')),
});