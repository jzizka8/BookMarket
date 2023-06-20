import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import useCart from '../hooks/useCart';

const Cart = () => {
  const { cart } = useCart();
  if (cart.length === 0) {
    return (
      <div className="my-8 flex justify-center">
        <div className="mx-4 w-full max-w-xl">
          <div
            className="text-md mb-4 w-48 w-full rounded-lg bg-yellow-100 p-4 text-yellow-900"
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
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <div className="mx-4">
        {cart.map((product) => (
          <CartItem product={product} key={product.id} />
        ))}
        <p className="mb-4 mt-6 text-right text-xl">
          Total:{' '}
          <span className="font-semibold">
            {cart.reduce((sum, current) => sum + current.price, 0).toFixed(2)}
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
            to="/auth/purchase"
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
