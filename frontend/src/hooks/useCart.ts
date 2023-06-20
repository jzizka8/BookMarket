import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { Book } from '../types/prismaTypes';

const cartAtom = atom<Book[]>({
  key: 'cartAtom',
  default: [],
});

const useCart = () => {
  const [cart, setCart] = useRecoilState(cartAtom);

  const addToCart = (book: Book) => {
    if (cart.find((item) => item.id === book.id)) {
      return;
    }
    const updatedCart = [...cart, book];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const removeFromCart = (bookId: string) => {
    const updatedCart = cart.filter((item) => item.id !== bookId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };
  const clearCart = () => {
    const emptyCart: Book[] = [];
    localStorage.setItem('cart', JSON.stringify(emptyCart));
    setCart(emptyCart);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return { cart, addToCart, removeFromCart, clearCart };
};

export default useCart;
