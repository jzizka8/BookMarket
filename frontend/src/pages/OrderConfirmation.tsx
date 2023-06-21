import cartIcon from '../assets/cart-big.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { usePurchaseFormData } from '../context/purchaseFormContext';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import { useEffect } from 'react';
import baseApi from '../services/baseApi';
import { PurchaseData } from '../types/CreateOrderType';
import { Link } from 'react-router-dom';

const createOrder = async (data: PurchaseData, userId: string | undefined) => {
  try {
    return await baseApi.post(`/user/${userId}/order`, data);
  } catch (error) {
    console.error('Error creating order:', error);
  }
};

const OrderConfirmation = () => {
  const { cart } = useCart();
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

  console.log(combinedData);

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
          <div className="mt-4 py-2.5">
            <Link
              className="flex-inline mb-2 mr-2 items-center rounded-lg bg-primary-main px-5 py-2.5 text-xl font-medium text-white hover:bg-primary-light focus:ring-4  focus:ring-blue-300"
              to="/auth/userOrders"
            >
              My orders
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
