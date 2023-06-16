import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LoginIcon from '../icons/LoginIcon';
import BookIcon from '../icons/BookIcon';
import LogoutIcon from '../icons/LogoutIcon';
import ShoppingCartIcon from '../icons/ShoppingCartIcon';

const Navbar = () => {
  const [userLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-gray-200 bg-primary-main text-zinc-200">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between p-2 md:flex-row">
        <div className="flex w-full flex-row justify-between md:w-auto">
          <div className="flex items-center">
            <Link to="/books">
              <BookIcon className="h-12 w-12 md:mr-3" />
            </Link>
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center rounded-lg p-2 text-sm hover:text-primary-light focus:outline-none md:ml-3 md:hidden"
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
        </div>
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="flex flex-col items-center rounded-lg bg-primary-main text-xl font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0">
            <li>
              <NavLink
                to={`/books`}
                style={({ isActive }) => (isActive ? { color: '#c08992' } : {})}
              >
                <span
                  className="block rounded bg-primary-main py-2 pl-3 pr-4 hover:text-primary-light md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  Browse books
                </span>
              </NavLink>
            </li>
            {userLoggedIn && (
              <>
                <li>
                  <NavLink
                    to={`/userBooks/idPlaceholder`}
                    style={({ isActive }) =>
                      isActive ? { color: '#c08992' } : {}
                    }
                  >
                    <span
                      className="block rounded bg-primary-main py-2 pl-3 pr-4 hover:text-primary-light md:bg-transparent md:p-0"
                      aria-current="page"
                    >
                      My books
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/userOrders/idPlaceholder`}
                    style={({ isActive }) =>
                      isActive ? { color: '#c08992' } : {}
                    }
                  >
                    <span
                      className="block rounded bg-primary-main py-2 pl-3 pr-4 hover:text-primary-light md:bg-transparent md:p-0"
                      aria-current="page"
                    >
                      My orders
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/cart`}
                    style={({ isActive }) =>
                      isActive ? { color: '#c08992' } : {}
                    }
                    className="hover:text-primary-light"
                  >
                    <ShoppingCartIcon className="m-2 h-9 md:m-0"></ShoppingCartIcon>
                  </NavLink>
                </li>
              </>
            )}
            <li>
              {userLoggedIn ? (
                <Link
                  to={`/`}
                  title="Logout"
                  className="flex items-center hover:text-primary-light"
                >
                  <LogoutIcon className="h-9" />
                </Link>
              ) : (
                <Link
                  to={`/login`}
                  title="Login"
                  className="flex items-center hover:text-primary-light"
                >
                  <LoginIcon className="h-9" />
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
