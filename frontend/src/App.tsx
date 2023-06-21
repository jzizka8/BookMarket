import { Routes, Route, Navigate } from 'react-router-dom';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Missing from './pages/Missing';
import Register from './pages/Register';
import AllBooks from './pages/AllBooks';
import UserBooksForSale from './pages/UserBooksForSale';
import BookAddition from './pages/BookAddition';
import PurchaseForm from './pages/PurchaseForm';
import PaymentInfo from './pages/PaymentInfo';
import OrderConfirmation from './pages/OrderConfirmation';
import Navbar from './components/Navbar';
import UserOrders from './pages/UserOrders';
import { FC } from 'react';
import useAuth from './hooks/useAuth';
import Footer from './components/Footer';
import BookDetail from './pages/BookDetail';
import BookEdit from './pages/BookEdit';

export const App: FC = () => {
  return (
    <div className="bg-zinc-50 font-primary">
      {/* TODO: we may move all the page padding here to keep it consistent */}
      <div className="flex min-h-screen flex-col">
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} index />
          <Route path="books" element={<AllBooks />} />
          <Route path="/books/:bookId" element={<BookDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/auth/*" Component={PrivateRoute} />
          <Route path="/*" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

const PrivateRoute: FC = () => {
  const { auth, isLoading, isError } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!auth || isError) return <Navigate to="/login" />;

  return (
    <Routes>
      <Route path="/userBooks" element={<UserBooksForSale />} />
      <Route path="/userOrders" element={<UserOrders />} />
      <Route path="/bookAddition" element={<BookAddition />} />
      <Route path="/bookEdit" element={<BookEdit />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/purchase" element={<PurchaseForm />} />
      <Route path="/paymentInfo" element={<PaymentInfo />} />
      <Route path="/orderConfirmation" element={<OrderConfirmation />} />
      <Route path="/*" element={<Missing />} />
    </Routes>
  );
};
export default App;
