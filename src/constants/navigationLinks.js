import { ROUTES } from "./routes"

export const mainNavigation  = [
    {
        name: 'Home',
        path: ROUTES.HOME,
        navClass: "navHomeLink"
    },
    {
        name: 'Saved Songs',
        path: ROUTES.SAVED_SONGS,
        navClass: "savedSongsLink"
    },
    {
        name: 'Login',
        path: ROUTES.LOGIN,
        navClass: "loginLink"
    },
    {
        name: "Get Started",
        path: ROUTES.REGISTER,
        navClass: "registerLink"
    }
]

export const profileNavigation = [
    {
        name: 'Profile',
        path: '#',
        navClass: "profileLink"
    },
    {
        name: 'Settings',
        path: '#',
        navClass: "settingsLink"
    },
    {
        name: 'Sign Out',
        path: '#',
        navClass: "signOutLink"
    }
]
