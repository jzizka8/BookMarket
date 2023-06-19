import { Routes, Route, Navigate } from 'react-router-dom';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Missing from './pages/Missing';
import Register from './pages/Register';
import AllBooks from './pages/AllBooks';
import UserBooksForSale from './pages/UserBooksForSale';
import BookDetail from './pages/BookDetail';
import BookAddition from './pages/BookAddition';
import PurchaseForm from './pages/PurchaseForm';
import PaymentInfo from './pages/PaymentInfo';
import OrderConfirmation from './pages/OrderConfirmation';
import Navbar from './components/Navbar';
import UserOrders from './pages/UserOrders';

export const App = () => {
  return (
    <div className="font-primary">
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} index />
        <Route path="books" element={<AllBooks />} />
        <Route path="/books/:bookId" element={<BookDetail />} />
        <Route path="/userBooks/:userId" element={<UserBooksForSale />} />
        <Route path="/userOrders/:userId" element={<UserOrders />} />
        <Route path="/bookAddition" element={<BookAddition />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/purchase" element={<PurchaseForm />} />
        <Route path="/paymentInfo" element={<PaymentInfo />} />
        <Route path="/orderConfirmation" element={<OrderConfirmation />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Missing />} />
      </Routes>
    </div>
  );
};

export default App;
