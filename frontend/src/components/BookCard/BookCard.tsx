import { Book } from '../../types/prismaTypes';
import { Link } from 'react-router-dom';
interface IBookCardProps {
  book: Book;
}

const BookCard = (props: IBookCardProps) => {
  const book = props.book;
  return (
    <div className="flex max-w-sm flex-col  rounded-lg border border-gray-200 bg-white p-3 shadow ">
      <div className="flex justify-center overflow-hidden  ">
        <Link to={`./${book.id}`}>
          <div className="relative">
            {book.invoice && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-800 bg-opacity-80 text-3xl font-semibold text-white">
                <img className=" h-12 w-12" src="/src/assets/tick.svg" alt="" />
                Sold
              </div>
            )}
            <img
              className=" h-72 w-[100cqw] object-cover "
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
        >
          <img className="mr-2 h-6 w-6" src="/src/assets/cart.svg" alt="" />
          Buy now
        </button>
      </div>
    </div>
  );
};
export default BookCard;
