import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import useAuth from '../hooks/useAuth';

const UserBooksForSale = () => {
  const { auth } = useAuth();

  return (
    <div className="flex flex-col justify-center bg-slate-100">
      <Link to="/auth/bookAddition" className="mx-auto sm:ml-auto sm:mr-2">
        <button
          type="button"
          className="m-2 inline-flex w-52 items-center justify-center rounded-lg bg-lime-600 px-5 py-2.5 text-lg font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <img
            className="mr-2 h-6 w-6"
            src="../../src/assets/plus.svg"
            alt=""
          />
          Add new book
        </button>
      </Link>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {auth?.data.booksForSale.map((book) => (
          <BookCard
            key={book.id}
            {...{
              book,
            }}
            showRemoveButton={true}
          />
        ))}
      </div>
    </div>
  );
};
export default UserBooksForSale;
