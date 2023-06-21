/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { DeleteModal } from '../components/DeleteModal';
import { getBookDetail } from '../services/bookApi';
import { Book } from '../types/prismaTypes';
import { deleteBookImage } from '../utils/uploadUtils';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

const deleteBook = async (id: string) => {
  const response = await axios.delete(`http://localhost:3000/book/${id}`, {
    withCredentials: true,
  });
  return response.data.data;
};

const BookDetail = () => {
  const { bookId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();
  const { addToCart } = useCart();
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await getBookDetail(bookId!);
        if (bookData?.status === 'failure') {
          setBook(undefined);
        } else {
          setBook(bookData.data);
        }
      } catch {
        setBook(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <div>
        <span className="text-2xl">Loading...</span>
      </div>
    );
  }

  if (!book) {
    return (
      <div>
        <span className="text-2xl">Given book was not found</span>
      </div>
    );
  }

  const addToCartWrapper = () => {
    addToCart(book);
  };

  const handleDelete = () => {
    deleteBookImage(book.photo!);
    deleteBook(book.id);
  };

  book.createdAt;
  const bookAttributes = [
    ['Genre', book.genre],
    ['Language', book.language],
    ['Publication Year', book.publicationYear],
    ['Listing created', new Date(book.createdAt).toLocaleDateString()],
    // Add more attributes as needed
  ];

  return (
    <div className="flex justify-center">
      <div className="grid max-w-7xl gap-x-4 gap-y-2 p-4 sm:grid-cols-2 md:flex-col">
        {/* book heading */}
        <div className="mb-4 sm:col-start-2 sm:mb-0">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:mb-4">
            {book.title}
          </h1>
          <h2 className="mb-2 text-xl font-semibold tracking-tight text-gray-600">
            {book.author}
          </h2>
        </div>
        {/* book img with badge */}
        <div className="sm:col-start-1 sm:row-span-2 sm:row-start-1">
          <img
            className=" min-h-72 min-w-72 max-h-[30rem] w-[100cqw] rounded-md object-contain"
            src={book.photo}
            alt=""
          />
        </div>
        {/* book description with buttons */}
        <div className="">
          <p>{book.description}</p>
          <p className="my-2 text-right text-3xl font-bold text-gray-700">
            {book.price.toFixed(2)}&euro;
          </p>
          <div className="flex-between flex flex-wrap justify-end gap-5">
            {auth?.data.id === book.soldBy ? (
              <>
                <Link
                  to={`/auth/bookAddition?id=${bookId}`}
                  className="text-md inline-flex items-center rounded-lg border border-blue-700 px-5 py-2.5 text-center font-medium text-blue-700 hover:bg-blue-800 hover:text-white"
                >
                  {/* Raw svg to allow styling with tailwind and css */}
                  <svg
                    className="mr-2 h-6 w-6 fill-current "
                    viewBox="0 0 24.00 24.00"
                  >
                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <path d="M3.99512 17.2072V19.5C3.99512 19.7761 4.21897 20 4.49512 20H6.79289C6.9255 20 7.05268 19.9473 7.14645 19.8536L16.5942 10.4058L13.5935 7.40518L4.14163 16.8535C4.04782 16.9473 3.99512 17.0745 3.99512 17.2072Z"></path>{' '}
                      <path d="M14.8322 6.16693L17.8327 9.16734L19.2929 7.7071C19.6834 7.31658 19.6834 6.68341 19.2929 6.29289L17.707 4.70697C17.3165 4.3165 16.6834 4.31644 16.2929 4.70684L14.8322 6.16693Z"></path>{' '}
                    </g>
                  </svg>
                  Edit book
                </Link>
                <button
                  type="button"
                  onClick={() => setShowModal(!showModal)}
                  className="text-md inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700"
                >
                  <img
                    className="mr-2 h-6 w-6"
                    src="/src/assets/cross.svg"
                    alt=""
                  />
                  Remove
                </button>
              </>
            ) : (
              <button
                type="button"
                className="ml-auto inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={addToCartWrapper}
              >
                <img
                  className="mr-2 h-6 w-6"
                  src="/src/assets/cart.svg"
                  alt=""
                />
                Add to cart
              </button>
            )}
          </div>
        </div>
        {/* additional data table */}
        <div className="mb-2 justify-self-center text-center sm:col-span-2 sm:w-1/2">
          <h1 className="my-4 text-xl font-bold tracking-tight">
            Additional book information
          </h1>
          <table className="w-full text-left text-sm text-gray-500">
            <tbody>
              {bookAttributes.map(([attribute, value]) => (
                <tr className=" odd:bg-gray-100" key={attribute}>
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                  >
                    {attribute}
                  </th>
                  <td className="px-6 py-4 text-right">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <>
          <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50" />
          <DeleteModal
            setShowModal={setShowModal}
            handleDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default BookDetail;
