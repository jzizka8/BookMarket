import cart from '../assets/cart-big.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { Order, Genre, Lang } from '../types/prismaTypes';
import { BlobProvider } from '@react-pdf/renderer';
import { Invoice } from '../components/Invoice';
import { DocumentIcon } from '../icons/DocumentIcon';
const InvoiceProps: Order = {
  id: '46808aed-cca9-4860-b69d-bfe56852f170',
  createdAt: new Date(),
  buyer: {
    id: '08767ab4-e849-4f78-9418-65343ed4efa7',
    username: 'josefson26',
    hashedPassword: '081d6e498fabb341f5d06ed1f83d089d',
    createdAt: new Date(),
  },
  amount: 180.9,
  shippingInfo: {
    id: 'ab25a2f0-a0f0-4f78-a8db-dd706804e131',
    name: 'William',
    surname: 'Harrington',
    email: 'william@email.com',
    phoneNumber: '+421999008007',
    street: 'Ulica',
    city: 'Mesto',
    zipcode: '04028',
    country: 'Slovakia',
  },
  books: [
    {
      id: '518028f7-9ab5-43wd-b4a4-1db640c69eda',
      createdAt: new Date(),
      soldBy: '',
      category: Genre.Mystery,
      seller: {
        id: '5452fa3f-7a0c-446d-96f8-3c86476f58b8',
        username: 'joe26',
        hashedPassword: '081d6e498fabb341f5d06ed1f83d089d',
        createdAt: new Date(),
      },
      title: 'Harry Potter and the deathly hallows',
      author: 'Joanne Kathleen Rowling ',
      price: 18.9,
      publicationYear: 2023,
      language: Lang.EN,
      photo: 'https://picsum.photos/600/900',
      description:
        'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry' +
        'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry' +
        'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry' +
        'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry',
    },
    {
      id: '518028f7-fdsf-43wd-b4a4-1db640c69eda',
      createdAt: new Date(),
      soldBy: '',
      category: Genre.Mystery,
      seller: {
        id: '5452fa3f-7a0c-446d-96f8-3c86476f58b8',
        username: 'joefds26',
        hashedPassword: '081d6e498fabb341f5d06ed1f83d089d',
        createdAt: new Date(),
      },
      title: 'Harry Potter ',
      author: 'Joanne Kathleen Rowling ',
      price: 128.9,
      publicationYear: 2023,
      language: Lang.EN,
      photo: 'https://picsum.photos/600/900',
      description:
        'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry' +
        'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry' +
        'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry' +
        'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry',
    },
  ],
};
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
            <BlobProvider document={<Invoice order={InvoiceProps} />}>
              {({ url }) => (
                <a
                  href={url ?? '#'}
                  className="inline-flex items-center text-xl text-blue-600 underline hover:text-red-700"
                  target="_blank"
                  rel="noreferrer"
                >
                  <DocumentIcon className="inline h-8 w-8" /> Invoice
                </a>
              )}
            </BlobProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
