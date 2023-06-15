import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useCart from '../hooks/UseCart';
import { Book, Genre, Lang } from '../types/prismaTypes';

const BookDetail = () => {
  const { bookId } = useParams();
  // TODO: dynamic fetch it using bookId
  const book = {
    id: '518028f7-9ab5-43wd-b4a4-1db640c69eda',
    createdAt: new Date(),
    soldBy: '',
    category: Genre.Mystery,
    seller: {
      id: '5452fa3f-7a0c-446d-96f8-3c86476f58b8',
      username: 'joe26',
      hashedPassword: '081d6e498fabb341f5d06ed1f83d089d',
      createdAt: new Date(),
    },
    title: 'Harry Potter and the deathly hallows',
    author: 'Joanne Kathleen Rowling ',
    price: 18.9,
    publicationYear: 2023,
    language: Lang.EN,
    photo: 'https://picsum.photos/600/900',
    description:
      'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry' +
      'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry' +
      'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry' +
      'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry',
  };

  useEffect(() => {
    document.title = `${book.title} - book detail`;
  }, [bookId]);

  const bookAttributes = [
    ['Genre', book.category],
    ['Language', book.language],
    ['Publication Year', book.publicationYear],
    ['Seller', book.seller.username],
    ['Listing created', book.seller.createdAt.toDateString()],
    // Add more attributes as needed
  ];

  return (
    <div className="flex justify-center">
      <div className="grid max-w-7xl gap-x-4 gap-y-2 p-4 sm:grid-cols-2 md:flex-col">
        {/* book heading */}
        <div className="mb-4 sm:col-start-2 sm:mb-0">
          <h1 className="mt-2  text-xl font-bold tracking-tight text-gray-900">
            {book.title}
          </h1>
          <h2 className="text-l mb-2 font-semibold tracking-tight text-gray-600">
            {book.author}
          </h2>
        </div>
        {/* book img with badge */}
        <div className="relative sm:col-start-1 sm:row-span-3 sm:row-start-1">
          <span className="absolute right-0 rounded-sm bg-yellow-100 px-2.5 py-0.5  text-lg font-medium ">
            {book.category}
          </span>

          <img
            className=" min-h-72 max-h-[30rem] w-[100cqw] rounded-md object-contain"
            src={book.photo}
            alt=""
          />
        </div>
        {/* book description with buttons */}
        <div className="">
          <p>{book.description}</p>
          <p className="my-2 text-right text-2xl text-gray-700">
            {book.price.toFixed(2)}&nbsp;&euro;
          </p>
          <div className="flex-between flex flex-wrap justify-end gap-5">
            <BookDetailButtons book={book} />
          </div>
        </div>
        {/* additional data table */}
        <div className="">
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
    </div>
  );
};

interface IBookDetailButtonsProps {
  book: Book;
}

function BookDetailButtons(props: IBookDetailButtonsProps) {
  // TODO: retrieve from auth
  // change the number to see the version for regular customer
  const userId = '5452fa3f-7a0c-446d-96f8-3c86476f58b';

  const { addToCart } = useCart();
  const addToCartWrapper = () => {
    addToCart(props.book);
  };
  if (userId === props.book.seller.id) {
    return (
      <>
        <button
          type="button"
          className="text-md inline-flex items-center rounded-lg border border-blue-700 px-5 py-2.5 text-center font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          {/* Raw svg to allow styling with tailwind and css */}
          <svg className="mr-2 h-6 w-6 fill-current " viewBox="0 0 24.00 24.00">
            <g id="SVGRepo_iconCarrier">
              {' '}
              <path d="M3.99512 17.2072V19.5C3.99512 19.7761 4.21897 20 4.49512 20H6.79289C6.9255 20 7.05268 19.9473 7.14645 19.8536L16.5942 10.4058L13.5935 7.40518L4.14163 16.8535C4.04782 16.9473 3.99512 17.0745 3.99512 17.2072Z"></path>{' '}
              <path d="M14.8322 6.16693L17.8327 9.16734L19.2929 7.7071C19.6834 7.31658 19.6834 6.68341 19.2929 6.29289L17.707 4.70697C17.3165 4.3165 16.6834 4.31644 16.2929 4.70684L14.8322 6.16693Z"></path>{' '}
            </g>
          </svg>
          Edit book
        </button>
        <button
          type="button"
          className="text-md inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <img className="mr-2 h-6 w-6" src="/src/assets/cross.svg" alt="" />
          Remove
        </button>
      </>
    );
  }
  // Seller cannot buy their own book
  return (
    <button
      type="button"
      className="ml-auto inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
      onClick={addToCartWrapper}
    >
      <img className="mr-2 h-6 w-6" src="/src/assets/cart.svg" alt="" />
      Add to cart
    </button>
  );
}

export default BookDetail;
