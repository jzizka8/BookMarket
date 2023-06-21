import BookCard from '../components/BookCard';
import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import { useQuery } from '@tanstack/react-query';
import { Book } from '../types/prismaTypes';
import { fetchBooks } from '../services/bookApi';
import filterSchema from '../schemas/FilterSchema';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AllBooks = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState({});
  const [books, setBooks] = useState<Book[]>([]);
  const { auth } = useAuth();

  const location = useLocation();
  const BOOKS_COUNT = 5;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParams = Object.fromEntries(searchParams.entries());
    setFilterQuery(filterSchema.parse(queryParams));

    // reset offset and collected books
    setOffset(0);
    setBooks([]);
  }, [location.search]);

  const moveOffset = () => {
    setOffset(offset + BOOKS_COUNT);
  };

  const { isLoading, isError } = useQuery(
    ['books', filterQuery, offset],
    () => {
      console.log({
        count: BOOKS_COUNT,
        offset,
        ...filterQuery,
        auth,
      });

      return fetchBooks({
        count: BOOKS_COUNT,
        offset,
        ...filterQuery,
        userId: auth?.data.id,
      });
    },
    {
      onSuccess: (data) => {
        const newBooks = data.filter(
          (book: Book) => !books?.some((prevBook) => prevBook.id === book.id)
        );
        setBooks((prevBooks) => [...prevBooks, ...newBooks]);
        console.log(newBooks);
        console.log(data);
      },
    }
  );
  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }
  if (isError) {
    return <div>Error occurred while fetching books.</div>;
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="items-center px-2 text-center">
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center rounded-lg p-2 text-sm hover:text-primary-light focus:outline-none md:ml-3 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={toggleMenu}
        >
          <svg
            fill="none"
            className="h-6 w-6"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            ></path>
          </svg>
          Filter
        </button>
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full py-4 md:block md:w-auto`}
          id="navbar-default"
        >
          <Filter />
        </div>
      </div>
      {books.length === 0 ? (
        <div
          className="text-md mx-auto mb-4 w-full max-w-2xl rounded-lg bg-yellow-100 p-4 text-yellow-900"
          role="alert"
        >
          No book with these criteria were found
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <div className="mt-5 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {books.map((book: Book) => (
                <BookCard
                  key={book.id}
                  {...{
                    book,
                  }}
                  showRemoveButton={false}
                />
              ))}
            </div>
          </div>
          <div className="my-4 flex justify-center">
            {books.length % BOOKS_COUNT === 0 && (
              <button
                type="button"
                className="mb-2 mr-2 rounded-lg bg-primary-main px-5 py-2.5 text-lg font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={moveOffset}
              >
                Show more books
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default AllBooks;
