import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Order } from '../types/prismaTypes';
import { BlobProvider } from '@react-pdf/renderer';
import { Invoice } from '../components/Invoice';
import { DocumentIcon } from '../icons/DocumentIcon';
const AccordionItem = ({ item, title }: { item: Order; title: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`w-[300px] border border-b-0 border-gray-200 first:rounded-t-xl last:rounded-b-xl last:border-b hover:bg-gray-100 ${
        isOpen && 'bg-gray-100'
      } mb-4 focus:ring-4 focus:ring-gray-200 sm:w-[500px] md:w-[600px] lg:w-[800px] xl:w-[900px]`}
    >
      <h2 id={`accordion-collapse-heading-${item.id}`}>
        <button
          type="button"
          className="flex w-full items-center justify-between p-5 text-left font-medium text-gray-600"
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls={`accordion-collapse-body-${item.id}`}
        >
          <span className="text-lg">{title}</span>
          <div>
            <span>{item.amount.toFixed(2)}&nbsp;€</span>
            <svg
              data-accordion-icon
              className={`inline h-6 w-6 shrink-0 transition duration-200 ease-in-out ${
                isOpen && 'rotate-180'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </button>
      </h2>
      <div
        id={`accordion-collapse-body-${item.id}`}
        className={`${isOpen ? '' : 'hidden'} bg-white`}
        aria-labelledby={`accordion-collapse-heading-${item.id}`}
      >
        <div className="border-b-0 border-gray-200 p-5">
          <ul className="mx-auto max-w-xl list-inside list-disc space-y-1 text-gray-500">
            {item.books.map((book) => (
              <li
                className="flex justify-around py-2"
                key={`${item.id}-${book.title}`}
              >
                <span className="font-medium">{`${book.title}`}</span>
                <span className="hidden sm:inline">{book.author}</span>
                <span>{book.price.toFixed(2)}&nbsp;€</span>
              </li>
            ))}
          </ul>
          {item && (
            <BlobProvider document={<Invoice order={item} />}>
              {({ url }) => (
                <div className="mt-2 flex justify-center">
                  <button
                    onClick={() => {
                      window.open(url ?? '#', '_blank');
                    }}
                    className="flex-inline mb-2 mr-2 items-center rounded-lg bg-primary-main px-5 py-2.5 text-xl font-medium text-white hover:bg-primary-light focus:ring-4  focus:ring-blue-300"
                    rel="noreferrer"
                  >
                    <DocumentIcon className="mr-4 inline h-8 w-8" />
                    See Invoice
                  </button>
                </div>
              )}
            </BlobProvider>
          )}
        </div>
      </div>
    </div>
  );
};

const UserOrders = () => {
  const { auth } = useAuth();
  return (
    <div className="mx-auto flex h-screen w-[300px] justify-center sm:w-[500px] md:w-[600px] lg:w-[800px] xl:w-[900px]">
      <div>
        <h1 className="flex justify-center p-4 text-3xl">My orders</h1>
        <div id="accordion-collapse" data-accordion="collapse">
          {auth?.data.orders.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              title={`Order from ${new Date(
                item.createdAt
              ).toLocaleDateString()}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
