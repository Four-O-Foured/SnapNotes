import { createRoute, Link, Outlet, redirect, lazyRouteComponent } from "@tanstack/react-router";
import { rootRoute } from "./router.jsx";
import BubbleMenu from "@/components/layout/BubbleMenu";
import { navItems } from "../lib/utils";
import { store } from "../store/store";
import { setLoading } from "../store/slices/authSlice.js";
import { setSnapNotes } from "../store/slices/snapNotesSlice.js";
import { fetchSnapNotes } from "../hooks/useSnapNotes.js";
import { queryClient } from "../lib/react-query";
import { LucideBookPlus } from "lucide-react";

// 1. The Parent (Layout) Route
// This defines the shared structure (Navbar/Sidebar) for all /dashboard/* pages
export const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    beforeLoad: async () => {
        const { dispatch } = store;
        const { isAuthenticated } = store.getState().auth;

        if (!isAuthenticated) {
            dispatch(setLoading(true));
            throw redirect({ to: '/auth' });
        }

        // Prefetch data and sync to Redux
        try {
            const data = await queryClient.ensureQueryData({
                queryKey: ['snapnotes'],
                queryFn: fetchSnapNotes,
            });

            if (data?.snapNotes) {
                dispatch(setSnapNotes(data.snapNotes));
            }
        } catch (error) {
            console.error("Router prefetch error:", error);
        }
    },
    component: () => (
        <div className="min-h-screen bg-snap-bg-main pt-20 sm:pt-12 md:-mt-18 overflow-x-hidden relative">
            <BubbleMenu
                items={navItems}
                logo="snap"
                useFixedPosition={true}
                className="px-6 md:px-12"
            />
            <main className="flex-1 pt-20 md:pt-32 pb-12 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
                <Outlet />
            </main>
        </div>
    ),
});

// 2. The Index Route (Default page when at /dashboard)
export const dashboardIndexRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/',
    component: lazyRouteComponent(() => import('../pages/DashboardPage.jsx')),
});

// 3. The SnapNotes Route (/dashboard/snapnotes)
export const snapNotesRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/snapnotes',
    component: () => <>
        <Outlet />
    </>
});

export const snapNotesIndexRoute = createRoute({
    getParentRoute: () => snapNotesRoute,
    path: '/',
    component: lazyRouteComponent(() => import('../pages/SnapNotePage.jsx')),
});

// 4. The SnapNote Details Route (/dashboard/snapnotes/$noteId)
export const snapNoteDetailsRoute = createRoute({
    getParentRoute: () => snapNotesRoute,
    path: '/$noteId',
    component: lazyRouteComponent(() => import('../pages/SnapNoteDetailsPage.jsx')),
});

export const examRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/exam',
    component: lazyRouteComponent(() => import('../pages/ExamPage.jsx')),
});

export const libraryRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/library',
    component: () => <>
        <div className='flex justify-between items-center mb-10'>
            <h1 className='text-4xl md:text-7xl julius-sans-one-regular tracking-tight'>Library</h1>
            <Link to="/dashboard/library/upload" className='bg-transparent border border-snap-bg-cyan/50 flex items-center gap-2 text-white hover:border-snap-cyan/60 hover:scale-105 transition-all duration-300 px-4 py-2 rounded-full text-xs group/upload md:text-base'><LucideBookPlus className="w-4 h-4 md:w-6 md:h-6 group-hover/upload:text-snap-cyan" />Upload Book</Link>
        </div>
        <Outlet />
    </>,
});

export const libraryIndexRoute = createRoute({
    getParentRoute: () => libraryRoute,
    path: '/',
    component: lazyRouteComponent(() => import('../pages/LibraryPage.jsx')),
});

export const libraryUploadRoute = createRoute({
    getParentRoute: () => libraryRoute,
    path: '/upload',
    component: lazyRouteComponent(() => import('../pages/UploadBookPage.jsx')),
});

export const ttbRoute = createRoute({
    getParentRoute: () => dashboardRoute,
    path: '/library/book/talktobook/$bookId',
    component: lazyRouteComponent(() => import('../pages/TTB.jsx')),
});

