import {MAIN_ROUTE, REGISTER_ROUTE, SIGNIN_ROUTE, TEAM_ROUTE, TOURNAMENT_ROUTE} from "./utils/routes";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import Tournaments from "./pages/Tournaments";
import Teams from "./pages/Teams";

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main,
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