import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginIcon from '../icons/LoginIcon';
import BookIcon from '../icons/BookIcon';
import LogoutIcon from '../icons/LogoutIcon';

const Navbar = () => {
  const [userLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-gray-200 bg-primary-main">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between p-2">
        <div className="flex items-center">
          <BookIcon fill="#e4e4e7" className="mr-3 h-12" />
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="mt-4 flex flex-col items-center rounded-lg border border-gray-100 bg-primary-main p-4 text-xl font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0">
            <li>
              <Link to={`/`}>
                <span
                  className="block rounded bg-primary-main py-2 pl-3 pr-4 text-zinc-200 hover:text-primary-light md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  Browse books
                </span>
              </Link>
            </li>
            {userLoggedIn && (
              <>
                <li>
                  <Link to={`/userBooks/idPlaceholder`}>
                    <span
                      className="block rounded bg-primary-main py-2 pl-3 pr-4 text-zinc-200 hover:text-primary-light md:bg-transparent md:p-0"
                      aria-current="page"
                    >
                      My books
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={`/userOrders/idPlaceholder`}>
                    <span
                      className="block rounded bg-primary-main py-2 pl-3 pr-4 text-zinc-200 hover:text-primary-light md:bg-transparent md:p-0"
                      aria-current="page"
                    >
                      My orders
                    </span>
                  </Link>
                </li>
              </>
            )}
            <li>
              {userLoggedIn ? (
                <Link
                  to={`/`}
                  title="Logout"
                  className="flex items-center"
                >
                  <LogoutIcon fill="#e4e4e7" className="mr-3 h-12" />
                </Link>
              ) : (
                <Link
                  to={`/login`}
                  title="Login"
                  className="flex items-center"
                >
                  <LoginIcon fill="#e4e4e7" className="mr-3 h-12" />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
