import './App.css';
import { Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Missing from './pages/Missing';
import Register from './pages/Register';
import AllBooks from './pages/AllBooks';
import UserBooksForSale from './pages/UserBooksForSale';
import Detail from './pages/Detail';
import BookAddition from './pages/BookAddition';
import PurchaseForm from './pages/PurchaseForm';
import PaymentInfo from './pages/PaymentInfo';
import OrderConfirmation from './pages/OrderConfirmation';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AllBooks />}>
        <Route path="/:bookId" element={<Detail />} />
      </Route>
      <Route path="/userBooks/:userId" element={<UserBooksForSale />} />
      <Route path="/bookAddition" element={<BookAddition />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/purchase" element={<PurchaseForm />} />
      <Route path="/paymentInfo" element={<PaymentInfo />} />
      <Route path="/orderConfirmation" element={<OrderConfirmation />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Missing />} />
    </Routes>
  );
};

export default App;
