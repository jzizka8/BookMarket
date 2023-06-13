import cart from '../assets/cart-big.svg';
import { motion, AnimatePresence } from 'framer-motion';

const OrderConfirmation = () => {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <AnimatePresence>
          <motion.div
            key="step1"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            className="text-center"
          >
            <img
              src={cart}
              alt="Big shopping cart full of books."
              className="py-4"
            />
          </motion.div>
        </AnimatePresence>
        <div>
          <h1 className="mb-4 py-2.5 text-3xl font-bold leading-tight text-gray-900">
            Thank you for your purchase!
          </h1>
          <div className="mt-4 flex justify-center py-2.5">
            <button
              type="button"
              className="rounded-md bg-indigo-500 px-4 py-2.5 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Generate Invoice
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
