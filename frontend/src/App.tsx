import { Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Missing from './pages/Missing';
import Register from './pages/Register';
import AllBooks from './pages/AllBooks';
import UserBooksForSale from './pages/UserBooksForSale';
import BookDetail from './pages/BookDetail';
import BookAddition from './pages/BookAddition';
import PurchaseForm from './pages/PurchaseForm';
import PaymentInfo from './pages/PaymentInfo';
import OrderConfirmation from './pages/OrderConfirmation';

export const App = () => {
  return (
    <>
      <header>
        <nav className="border-gray-200 bg-primary-main text-white">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <a href="https://flowbite.com/" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center whitespace-nowrap text-2xl font-semibold">
                Flowbite
              </span>
            </a>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
              aria-controls="navbar-default"
              aria-expanded="false"
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
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-primary-500 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 text-xl">
                <li>
                  <a
                    href="#"
                    className="block rounded bg-primary-500 py-2 pl-3 pr-4 text-zinc-200 md:bg-transparent md:p-0"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded py-2 pl-3 pr-4 text-gray-900 md:border-0 md:p-0 md:hover:bg-transparent hover:text-primary-light"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded py-2 pl-3 pr-4 text-gray-900 md:border-0 md:p-0 md:hover:bg-transparent hover:text-primary-light"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded py-2 pl-3 pr-4 text-gray-900 md:border-0 md:p-0 md:hover:bg-transparent hover:text-primary-light"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded py-2 pl-3 pr-4 text-gray-900 md:border-0 md:p-0 md:hover:bg-transparent hover:text-primary-light"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<AllBooks />} />
        <Route path="/:bookId" element={<BookDetail />} />
        <Route path="/userBooks/:userId" element={<UserBooksForSale />} />
        <Route path="/bookAddition" element={<BookAddition />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/purchase" element={<PurchaseForm />} />
        <Route path="/paymentInfo" element={<PaymentInfo />} />
        <Route path="/orderConfirmation" element={<OrderConfirmation />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
};

export default App;
