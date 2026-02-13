import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./router.jsx";
import LandingPage from "../pages/LandingPage.jsx";

export const landingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: LandingPage,
});