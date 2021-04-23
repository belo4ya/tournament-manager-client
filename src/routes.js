import {
    INDEX_ROUTE,
    PROFILE_ROUTE,
    PROFILE_TEAMS_ROUTE,
    PROFILE_TOURNAMENTS_ROUTE,
    SIGN_IN_ROUTE,
    SIGN_UP_ROUTE
} from "./utils/constants";
import {
    Main,
    Profile,
    ProfileTournaments,
    ProfileTeams
} from "./pages"

export const authRoutes = [
    {
        path: INDEX_ROUTE,
        Component: Main,
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile,
    },
    {
        path: PROFILE_TOURNAMENTS_ROUTE,
        Component: ProfileTournaments,
    },
    {
        path: PROFILE_TEAMS_ROUTE,
        Component: ProfileTeams,
    },
];

export const publicRoutes = [
    {
        path: INDEX_ROUTE,
        Component: Main,
    },
    {
        path: SIGN_IN_ROUTE,
        Component: Main,
    },
    {
        path: SIGN_UP_ROUTE,
        Component: Main,
    },
]