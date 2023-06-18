import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { Book } from '../../types/prismaTypes';
import { formatGenreName } from '../../utils/textFormattingUtils';
interface IBookCardProps {
  book: Book;
}

const BookCard: React.FC<IBookCardProps> = (props: IBookCardProps) => {
  const { addToCart } = useCart();
  const book = props.book;
  const addToCartWrapper = () => {
    addToCart(props.book);
    // TODO: popup
  };
  return (
    <div className="flex max-w-sm flex-col  rounded-lg border border-gray-200 bg-white p-3 shadow ">
      <div className="flex justify-center overflow-hidden  ">
        <Link to={`./${book.id}`}>
          <div className="relative">
            {book.invoice && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-800 bg-opacity-80 text-3xl font-semibold text-white">
                Sold
              </div>
            )}
            <span className="text-md absolute right-0 rounded-sm bg-yellow-100 px-2.5  py-0.5 font-medium ">
              {formatGenreName(book.category)}
            </span>
            <img
              className=" h-72 w-[100cqw] rounded-md object-cover "
              src={book.photo}
              alt=""
            />
          </div>
        </Link>
      </div>
      <Link to={`./${book.id}`}>
        <h1 className="my-3 text-center text-xl font-bold tracking-tight text-gray-900 hover:text-blue-600">
          {book.title}
        </h1>
      </Link>
      <Link className="mt-auto" to={`./${book.id}`}>
        <h2 className="text-l mb-1 text-center font-semibold tracking-tight text-gray-600 hover:text-blue-600">
          {book.author}
        </h2>
      </Link>
      <p className="mb-2 text-center text-2xl text-gray-700">
        {book.price.toFixed(2)}&nbsp;&euro;
      </p>
      <div className="flex justify-center ">
        <button
          type="button"
          className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={addToCartWrapper}
        >
          <img className="mr-2 h-6 w-6" src="/src/assets/cart.svg" alt="" />
          Buy now
        </button>
      </div>
    </div>
  );
};
export default BookCard;
