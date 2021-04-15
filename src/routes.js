import {MAIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE, SIGNIN_ROUTE, TEAM_ROUTE, TOURNAMENT_ROUTE} from "./utils/routes";
import Auth from "./pages/public/Auth";
import Main from "./pages/public/Main";
import Tournaments from "./pages/authorized/Tournaments";
import Teams from "./pages/authorized/Teams";
import Profile from "./pages/authorized/Profile";

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main,
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile,
    },
    {
        path: TOURNAMENT_ROUTE,
        Component: Tournaments,
    },
    {
        path: TEAM_ROUTE,
        Component: Teams,
    },
];

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main,
    },
    {
        path: SIGNIN_ROUTE,
        Component: Auth,
    },
    {
        path: REGISTER_ROUTE,
        Component: Auth,
    },
]