import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./router.jsx";
import AuthPage from "../pages/AuthPage.jsx";

export const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/auth',
    component: AuthPage,
});
