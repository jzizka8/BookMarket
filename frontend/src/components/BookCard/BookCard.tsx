import { Book } from '../../types/prismaTypes';
import { Link } from 'react-router-dom';
interface IBookCardProps {
  book: Book;
}

const BookCard = (props: IBookCardProps) => {
  const book = props.book;
  return (
    <div className="flex max-w-sm flex-col  rounded-lg border border-gray-200 bg-white p-3 shadow ">
      <div className="flex justify-center overflow-hidden ">
        <Link to={`./${book.id}`}>
          <img
            className=" w-[100cqw] h-72 object-cover "
            src={book.photo}
            alt=""
          />
        </Link>
      </div>
      {/* <div className="mt-auto px-5 flex flex-col gap-3"> */}
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
      <p className="text-center text-2xl text-gray-700">&euro;{book.price}</p>
      {/* </div> */}
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
