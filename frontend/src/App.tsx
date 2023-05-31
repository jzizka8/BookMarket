import './App.css';
import { Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import Login from './components/Login';
import Missing from './components/Missing';
import Homepage from './components/Homepage';
import { ProtectedLayout } from './components/ProtectedLayout';
import Register from './components/Register';
import AllBooks from './components/AllBooks';
import UserBooksForSale from './components/UserBooksForSale';
import Detail from './components/Detail';
import BookAddition from './components/BookAddition';
import PurchaseForm from './components/PurchaseForm';
import PaymentInfo from './components/PaymentInfo';
import OrderConfirmation from './components/OrderConfirmation';
import MainLayout from './components/MainLayout';

export const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index path="/" element={<Homepage />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route path="/allBooks" element={<AllBooks />} />
        <Route path="/userBooks" element={<UserBooksForSale />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/bookAddition" element={<BookAddition />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/purchase" element={<PurchaseForm />} />
        <Route path="/paymentInfo" element={<PaymentInfo />} />
        <Route path="/orderConfirmation" element={<OrderConfirmation />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Missing />} />
    </Routes>
  );
};

export default App;
