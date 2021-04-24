import {
    ABOUT_ROUTE, CREATOR_ROUTE,
    INDEX_ROUTE,
    PROFILE_ROUTE,
    PROFILE_TEAMS_ROUTE,
    PROFILE_TOURNAMENTS_ROUTE,
    SIGN_IN_ROUTE,
    SIGN_UP_ROUTE,
    TOURNAMENT_CREATION
} from "./utils/constants";
import {
    Main,
    Profile,
    ProfileTournaments,
    ProfileTeams,
    TournamentCreation
} from "./pages"
import About from "./pages/about/About";
import Creator from "./pages/creator/Creator";

export const authRoutes = [
    {
        path: INDEX_ROUTE,
        Component: Main,
    },
    {
        path: ABOUT_ROUTE,
        Component: About,
    },
    {
        path: CREATOR_ROUTE,
        Component: Creator,
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
    {
        path: TOURNAMENT_CREATION,
        Component: TournamentCreation,
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
    {
        path: ABOUT_ROUTE,
        Component: About,
    },
    {
        path: CREATOR_ROUTE,
        Component: Creator,
    },
]