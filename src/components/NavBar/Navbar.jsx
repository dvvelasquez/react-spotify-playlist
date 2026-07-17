import { useState } from 'react';
import Image from '../Image/Image';
import logo from '../../assets/logo/spotify-app-logo.png';
import { mainNavigation, profileNavigation } from '../../constants/navigationLinks';
import NavItems from './NavItems';
import navStyles from './NavBar.module.scss';
import { user } from '../../data/mockUsers';
import Icon from '../Icon/Icon';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleCloseMenu = () => {
        if (isLoggedIn && isOpenProfile) {
            setIsOpenProfile(false);
            setIsLoggedIn(false);
            return;
        }

        if (isMenuOpen) {
            setIsMenuOpen(false);
            return;
        }
    }

    const { username, avatar } = user;

    const mainNav = mainNavigation?.filter(navItem => navItem.name !== 'Get Started')

    const registerNav = mainNavigation?.filter(({ name }) => name === 'Get Started');

    return (
        <nav className="relative bg-gray-800 transition-all duration-300 ease-in-out">
            {/* Desktop */}
            <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between py-5">
                    <div className={`${isLoggedIn ? "absolute inset-y-0 left-0" : ""} flex items-center sm:hidden`}>

                        {/* Mobile menu button */}
                        <button type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
                            onClick={() => setIsMenuOpen(prev => !prev)}
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 in-aria-expanded:hidden">
                                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                        <div className="flex shrink-0 items-center">
                            <Image src={logo} name="Spotify App Logo" className="h-10 w-auto" />
                        </div>
                        <div className="hidden sm:block">
                            <div className="flex navbar-wrapper">
                                <ul className='navItem-container flex space-x-4'>
                                    {mainNav.map((navItem) => (
                                            <NavItems
                                                key={`desktop-${navItem.name}`}
                                                {...navItem}
                                                classNavName="navItem list-none"
                                                classLinkName={({ isActive }) => isActive
                                                    ? `${navItem.navClass} rounded-md bg-gray-900 py-2 text-sm px-3 text-green-500 font-bold block`
                                                    : `${navItem.navClass} rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white block`}
                                            />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Profile dropdown */}
                    <div className={`${navStyles.loggedInProfile} ${isLoggedIn ? "absolute inset-y-0 right-0" : ""} flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0`}>
                        {isLoggedIn ? (
                            <div className="relative ml-3 text-white">
                                <button
                                    className="relative cursor-pointer flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    onClick={() => setIsOpenProfile(prev => !prev)}
                                    aria-haspopup="menu"
                                    aria-expanded={isOpenProfile}
                                    aria-controls="profile-menu"
                                >
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    <Icon icon={avatar} />
                                    <span>{username}</span>
                                </button>

                                {isOpenProfile && <div id="profile-menu" className="z-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] absolute right-0 top-10">
                                    {profileNavigation?.map(({ name, path, navClass }) => (
                                        <NavItems
                                            key={`mobile-${name}`}
                                            name={name}
                                            path={path}
                                            handleCloseMenu={handleCloseMenu}
                                            classNavName={`${navStyles.navItem} list-none px-4`}
                                            classLinkName={`${navStyles.navItemLink} ${navClass} block py-2 text-sm text-gray-700 focus:bg-gray-100 focus:outline-hidden`}
                                        />
                                    ))}
                                </div>}
                            </div>
                        ) : (
                            <ul className='navItem-container flex space-x-4'>
                                {registerNav.map(({ name, path, navClass }) => (
                                        <NavItems
                                            key={`desktop-${name}`}
                                            name={
                                                <span className="flex items-center gap-1">
                                                    <span>{name}</span>
                                                    <span className="hidden lg:inline">Today</span>
                                                </span>
                                            }
                                            path={path}
                                            classNavName="navItem list-none"
                                            classLinkName={`${navClass} group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600`}
                                        />
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div id="mobile-menu" className={`
                sm:hidden
                transition-all duration-300 ease-in-out
                overflow-hidden
                ${isMenuOpen
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-4 invisible pointer-events-none h-0"
                }
            `}>
                <div className="space-y-1 px-2 pt-2 pb-3">
                    <ul className='navItem-container'>
                        {mainNav.map((navItem) => (
                                <NavItems
                                    key={`mobile-${navItem.name}`}
                                    {...navItem}
                                    handleCloseMenu={handleCloseMenu}
                                    classNavName="navItem list-none"
                                    classLinkName={({ isActive }) => isActive
                                        ? `${navItem.navClass} rounded-md bg-gray-900 py-2 text-sm px-3 text-green-500 font-bold block`
                                        : `${navItem.navClass} rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white block`}
                                />
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}