import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import useCart from '../hooks/useCart';

const Cart = () => {
  const { cart } = useCart();
  if (cart.length === 0) {
    return (
      <div className="mx-4 my-8 flex flex-col items-center">
        <div
          className="text-md mb-4 w-full max-w-2xl rounded-lg bg-yellow-100 p-4 text-yellow-900"
          role="alert"
        >
          Your cart is empty.
        </div>
        <Link
          to="/"
          className="mx-auto inline-flex items-center rounded-lg bg-beige-main px-5 py-2.5 text-lg font-medium text-white hover:bg-beige-dark focus:outline-none focus:ring-4"
        >
          Back to shop
        </Link>
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
            className="inline-flex items-center rounded-lg border border-beige-main px-5 py-2.5 text-center font-medium text-beige-main hover:bg-beige-dark hover:text-white focus:outline-none"
          >
            Back to shop
          </Link>
          <Link
            to="/auth/order"
            className="inline-flex items-center rounded-lg bg-beige-main px-5 py-2.5  font-medium text-white hover:bg-beige-dark focus:outline-none focus:ring-4"
          >
            Proceed
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Cart;
