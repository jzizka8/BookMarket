import { useParams } from 'react-router-dom';
import { Genre, Lang } from '../types/prismaTypes';
import { useEffect } from 'react';

const BookDetail = () => {
  const { bookId } = useParams();
  const userId = '5452fa3f-7a0c-446d-96f8-3c86476f58b8';
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
    title: 'Harry Potter and the deathly hallows and the very long title',
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

  return (
    <div className="flex justify-center">
      <div className="grid max-w-7xl gap-x-4 gap-y-2 p-4 md:grid-cols-2 md:flex-col">
        <div className="">
          <img
            className=" min-h-72 max-h-96 w-[100cqw] object-contain"
            src={book.photo}
            alt=""
          />
        </div>
        <div className=" md:pr-8">
          <h1 className="mt-2  text-xl font-bold tracking-tight text-gray-900">
            {book.title}
          </h1>
          <h2 className="text-l mb-2 font-semibold tracking-tight text-gray-600">
            {book.author}
          </h2>
          <p>{book.description}</p>
          <p className="mb-2 text-right text-2xl text-gray-700">
            {book.price.toFixed(2)}&nbsp;&euro;
          </p>
          <div className="flex-between flex justify-between">
            {userId === book.seller.id && (
              <>
                <button
                  type="button"
                  className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-lg font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <img
                    className="mr-2 h-6 w-6"
                    src="/src/assets/cross.svg"
                    alt=""
                  />
                  Remove
                </button>
              </>
            )}
            <button
              type="button"
              className="ml-auto inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <img className="mr-2 h-6 w-6" src="/src/assets/cart.svg" alt="" />
              Add to cart
            </button>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  Seller
                </th>
                <td className="px-6 py-4">{book.seller.username}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  Publication Year
                </th>
                <td className="px-6 py-4">{book.publicationYear}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  Language
                </th>
                <td className="px-6 py-4">{book.language}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default BookDetail;
