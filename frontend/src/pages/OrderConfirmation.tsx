import cartIcon from '../assets/cart-big.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { usePurchaseFormData } from '../context/purchaseFormContext';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import { useEffect } from 'react';
import baseApi from '../services/baseApi';
import { PurchaseData } from '../types/CreateOrderType';

const OrderConfirmation = () => {
  const { cart, clearCart } = useCart();
  const bookIds = cart.map((book) => book.id);
  const amount = cart.length;
  const { auth } = useAuth();
  const { purchaseFormData } = usePurchaseFormData();
  // const { paymentInfoData } = usePaymentInfoFormContext();

  const combinedData = {
    shippingData: {
      ...purchaseFormData,
      // ...paymentInfoData,
    },
    bookId: bookIds,
    amount: amount,
  };

  const createOrder = async (
    data: PurchaseData,
    userId: string | undefined
  ) => {
    try {
      await baseApi.post(`/user/${userId}/order`, data);
      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  useEffect(() => {
    if (auth?.data.id) {
      console.log('userId: ' + auth.data.id);
      createOrder(combinedData, auth.data.id);
    }
  }, [auth?.data.id, combinedData]);

  return (
    <>
      <div className="mt-2 flex items-center justify-center">
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
              src={cartIcon}
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
