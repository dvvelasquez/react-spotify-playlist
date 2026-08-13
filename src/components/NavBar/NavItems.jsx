import { NavLink } from 'react-router-dom';

export default function NavItems({ name, path, onClick, handleCloseMenu, classNavName, classLinkName }) {
    const handleClick = (event) => {
        if (onClick) {
            event.preventDefault();
            onClick();
        }

        handleCloseMenu?.();
    };
    return (
        <li
            className={classNavName}
            onClick={handleClick}
        >
            <NavLink
                to={path}
                className={classLinkName}
            >
                {name}
            </NavLink>
        </li>
    );
}

