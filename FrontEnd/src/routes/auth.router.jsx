import { createRoute, redirect, lazyRouteComponent } from "@tanstack/react-router";
import { rootRoute } from "./router.jsx";
import { store } from "../store/store";

export const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/auth',
    beforeLoad: () => {
        const { isAuthenticated } = store.getState().auth;
        if (isAuthenticated) {
            throw redirect({ to: '/dashboard' });
        }
    },
    component: lazyRouteComponent(() => import('../pages/AuthPage.jsx')),
});
