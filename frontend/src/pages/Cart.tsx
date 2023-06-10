import { Link } from 'react-router-dom';
import { Genre, Lang } from '../types/prismaTypes';

const Cart = () => {
  const products = [
    {
      id: '51802sf7-9ab5-437d-b4a4-1db640c69eda',
      createdAt: new Date(),
      soldBy: '',
      category: Genre.Mystery,
      seller: {
        id: '5452fa3f-7a0c-4463-96f8-3c86476f58b8',
        username: 'joe26',
        hashedPassword: '081d6e498fabb341f5d06ed1f83d089d',
        createdAt: new Date(),
      },
      title: 'Harry Potter and the deathly hallows',
      author: 'Joanne Kathleen Rowling',
      price: 18.9,
      publicationYear: 2023,
      language: Lang.EN,
      photo: 'https://picsum.photos/250/300',
      description:
        'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry',
    },
    {
      id: '518028f7-9ab5-437d-b4a4-1db640c69eda',
      createdAt: new Date(),
      soldBy: '',
      category: Genre.Mystery,
      seller: {
        id: '5452fa3f-7a0c-4463-96f8-3c86476f58b8',
        username: 'joe26',
        hashedPassword: '081d6e498fabb341f5d06ed1f83d089d',
        createdAt: new Date(),
      },
      title: 'Harry Potter ',
      author: 'Joanne Kathleen Rowling',
      price: 18.9,
      publicationYear: 2023,
      language: Lang.EN,
      photo:
        'https://www.knihydobrovsky.cz/thumbs/book-detail-fancy-box/mod_eshop/produkty/398470745/59.jpg',
      description:
        'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry',
    },
    {
      id: '51802827-9ab5-437d-b4a4-1db640c69eda',
      createdAt: new Date(),
      soldBy: '',
      category: Genre.Mystery,
      seller: {
        id: '5452fa3f-7a0c-4463-96f8-3c86476f58b8',
        username: 'joe26',
        hashedPassword: '081d6e498fabb341f5d06ed1f83d089d',
        createdAt: new Date(),
      },
      title: 'Harry Potter and the deathly hallows and the very long title',
      author: 'Joanne Kathleen Rowling',
      price: 118.89,
      publicationYear: 2023,
      language: Lang.EN,
      photo: 'https://picsum.photos/1300/1850',
      description:
        'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry',
    },
  ];
  if (products.length === 0) {
    return (
      <div className="m-4">
        <div
          className="text-md mb-4 w-48 rounded-lg bg-yellow-50 p-4 text-yellow-900"
          role="alert"
        >
          Your cart is empty.
        </div>
        <Link
          to="/"
          className="ml-auto inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Back to shop
        </Link>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <div className="mx-4">
        {products.map((product) => (
          <div
            className="cart-grid my-3 rounded-lg border border-gray-200 p-2 shadow hover:bg-gray-50  sm:items-center"
            key={product.id}
          >
            <div className="cart-grid__photo w-32  ">
              <img
                className="rounded-md"
                src={product.photo}
                alt={product.title}
              />
            </div>
            <div className="cart-grid__title font-semibold text-gray-900 ">
              {product.title}
            </div>
            <div className="cart-grid__price mr-2 text-right font-semibold text-gray-900">
              {product.price.toFixed(2)}&nbsp;&euro;
            </div>
            <div className="cart-grid__cancel  mr-2 text-right">
              <button className="font-medium text-red-600 hover:underline">
                Remove
              </button>
            </div>
          </div>
        ))}
        <p className="mb-4 mt-6 text-right text-xl">
          Total:{' '}
          <span className="font-semibold">
            {products.reduce((sum, current) => sum + current.price, 0)}
            &nbsp;&euro;
          </span>{' '}
        </p>
        <div className="mb-6 flex justify-between">
          <Link
            to="/"
            className="inline-flex items-center rounded-lg border border-blue-700 px-5 py-2.5 text-center font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Back to shop
          </Link>
          <Link
            to="/purchase"
            className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5  font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Proceed
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Cart;
