import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../Image/Image';
import logo from '../../assets/logo/spotify-app-logo.png';
import { mainNavigation, profileNavigation } from '../../constants/navigationLinks';
import NavItems from './NavItems';
import navStyles from './NavBar.module.scss';
import { user } from '../../data/mockUsers';
import Icon from '../Icon/Icon';
import { mockCategories } from '../../data/mockCategories';
import { ROUTES } from '../../constants/routes';
import { fetchSpotifyAPI } from '../../api/spotify';

export default function Navbar() {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const [ isOpenProfile, setIsOpenProfile ] = useState(false);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
    const [ tracksCat, setTracksCat ] = useState([]);
    const [ error, setError ] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const menuRef = useRef(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [ offset, setOffset ] = useState(0);

    const handleCloseMenu = () => {
        if (isLoggedIn && isOpenProfile) {
            setIsOpenProfile(false);
            setIsLoggedIn(true)
            return;
        }

        if (isMenuOpen) {
            setIsMenuOpen(false);
            return;
        }
    }

    // Close menu if click happened outside the target element
    useEffect(() => {
        const handleClickOutside = ({ target }) => {
            if (menuRef.current && !menuRef.current.contains(target)) {
                setIsMenuOpen(false);

            }

            if (dropdownRef.current && !dropdownRef.current.contains(target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen || isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen, isMenuOpen]);

    useEffect(() => {
        async function fetchCats() {
            try {
                setTracksCat(mockCategories);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchCats();
    }, []);

    const handleOnChange = ({ target }) => {
        setSearchInput(target.value);
        console.log(target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchInput.trim() === '') return;
        if (searchInput.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchInput)}`);
        }
    };

    const handleSearchCategories =  async (categorySearch) => {
        if (categorySearch) {
            navigate(`/search?category=${encodeURIComponent(categorySearch)}`);
        }
    }

    const { username, avatar } = user;

    const mainNav = mainNavigation?.filter(navItem => navItem.name !== 'Get Started')

    const registerNav = mainNavigation?.filter(({ name }) => name === 'Get Started');

    return (
        <nav className="bg-gray-800 transition-all duration-300 ease-in-out sticky top-0 z-150">

            {/* Desktop */}
            <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                <div ref={menuRef} className="relative flex items-center justify-between py-5">

                    {/* Mobile menu button */}
                    <div className={`${isLoggedIn ? "absolute inset-y-0 left-0" : ""} flex items-center sm:hidden`}>
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

                    {/* nav logo/items */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                        <div className="flex shrink-0 items-center">
                            <a href={ROUTES.HOME}>
                                <Image src={logo} name="Spotify App Logo" className="h-10 w-auto" />
                            </a>
                        </div>

                        {/* Searchbar */}
                        <div className="hidden sm:block">
                            <form className="max-w-3xl mx-auto" onSubmit={handleSubmit}>
                                <div className="flex shadow-sm rounded -space-x-0.5">
                                    <div className='relative' ref={dropdownRef}>

                                        <label htmlFor="search-dropdown" className="block mb-2.5 text-sm font-medium text-gray-900 sr-only">Track</label>
                                        <button id="dropdown-button"
                                            data-dropdown-toggle="dropdown"
                                            type="button"
                                            className="inline-flex items-center shrink-0 z-10 text-gray-700 bg-gray-200 box-border border border-gray-300 hover:bg-gray-300 hover:text-gray-900 focus:ring-4 focus:ring-gray-200/50 font-medium leading-5 rounded-l text-sm px-4 py-2.5 focus:outline-none"
                                            onClick={() => setIsDropdownOpen(prev => !prev)}
                                        >
                                            <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"/></svg>
                                                Categories
                                            <svg className="w-4 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/></svg>
                                        </button>

                                        {/* Searchbar Cats Dropdown */}
                                        <div id="dropdown"
                                            className={`z-10 ${isDropdownOpen ? 'absolute top-12 left-0' : 'hidden'} bg-white border border-gray-200 rounded shadow-md w-44`}
                                        >

                                            <ul className="p-2 text-sm text-gray-700 font-medium" aria-labelledby="dropdown-button">
                                                {Object.entries(tracksCat).map(([key, catItem]) => (
                                                    <li key={key}>
                                                        <button
                                                            type='button'
                                                            className="w-full block p-2 hover:bg-gray-100 hover:text-gray-900 rounded-md text-left"
                                                            value={catItem}
                                                            onClick={() => handleSearchCategories(catItem)}
                                                        >
                                                            {catItem}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>

                                        </div>
                                    </div>

                                    {/* Search Input */}
                                    <div className='flex flex-1'>
                                        <input
                                            type="search"
                                            id="search-dropdown"
                                            className="px-3 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full placeholder:text-gray-400"
                                            placeholder="Search tracks"
                                            onChange={handleOnChange}
                                            value={searchInput}
                                        />
                                        <button
                                            type="submit"
                                            className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 box-border border border-transparent focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-r text-sm px-4 py-2.5 focus:outline-none hover:cursor-pointer"
                                        >
                                            <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
                                            Search
                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>

                        {/* Nav Items */}
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
                                    {profileNavigation?.map(({ name, path, navClass, onClick }) => (
                                        <NavItems
                                            key={`mobile-${name}`}
                                            name={name}
                                            path={path}
                                            onClick={onClick}
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
