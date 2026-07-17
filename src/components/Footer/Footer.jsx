import { getFullYear } from "../../utils/formatters";
import { socialIcons } from "../../constants/socialIcons";
import Icon from "../Icon/Icon";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="flex flex-wrap mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                <div className="w-full sm:basis-2/3 py-4 sm:p-0">
                    <p> &copy; Copyright {getFullYear()} | React App Designed and Developed by <a href="https://github.com/dvvelasquez" className="underline text-green-500" target="_blank" rel="noopener noreferrer">Diego Velasquez</a> </p>
                </div>
                <div className="w-full sm:basis-1/3 py-4 border-t border-t-gray-500 sm:border-none sm:p-0 border-x-indigo-500">
                    <ul className="flex space-x-4 sm:justify-end">
                        {socialIcons.map((social) => (
                            <li className="list-none" key={social.name}>
                                <a href={social.url} aria-label={social.name} target='_blank' rel='noopener noreferrer'>
                                    <Icon
                                        {...social}
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
