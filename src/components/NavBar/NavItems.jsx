import { NavLink } from 'react-router-dom';

export default function NavItems({ name, path, handleCloseMenu, classNavName, classLinkName }) {
    return (
        <li
            className={classNavName}
            onClick={handleCloseMenu}
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

