import { useState } from 'react';
import { Link } from 'react-router-dom';

type AccordionItemProps = {
  id: number;
  title: string;
  content: {
    price: number;
    books: {
      name: string;
      author: string;
      price: number;
    }[];
  };
};

const AccordionItem = ({ id, title, content }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`w-[300px] border border-b-0 border-gray-200 first:rounded-t-xl last:rounded-b-xl last:border-b hover:bg-gray-100 ${
        isOpen && 'bg-gray-100'
      } focus:ring-4 focus:ring-gray-200 sm:w-[500px] md:w-[600px] lg:w-[800px] xl:w-[900px]`}
    >
      <h2 id={`accordion-collapse-heading-${id}`}>
        <button
          type="button"
          className="flex w-full items-center justify-between p-5 text-left font-medium text-gray-600"
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls={`accordion-collapse-body-${id}`}
        >
          <span className="text-lg">{title}</span>
          <div>
            <span>{content.price.toFixed(2)}€</span>
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
        id={`accordion-collapse-body-${id}`}
        className={`${isOpen ? '' : 'hidden'} bg-white`}
        aria-labelledby={`accordion-collapse-heading-${id}`}
      >
        <div className="border-b-0 border-gray-200 p-5">
          <ul className="mx-auto max-w-xl list-inside list-disc space-y-1 text-gray-500">
            {content.books.map((book) => (
              <Link
                to={'/'}
                className=" hover:text-black"
                key={`${id}-${book.name}`}
              >
                <li className="flex justify-around py-2">
                  <span className="font-medium">{`${book.name}`}</span>
                  <span className="hidden sm:inline">{book.author}</span>
                  <span>{book.price.toFixed(2)}€</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const UserOrders = () => {
  const accordionItems = [
    {
      id: 1,
      title: 'Order from 10.05.2023',
      content: {
        price: 33.5,
        books: [
          {
            name: 'Harry Potter',
            author: 'J.K.Rowling',
            price: 12.9,
          },
          {
            name: 'The Beach',
            author: 'Alex Garland',
            price: 8.9,
          },
        ],
      },
    },
    {
      id: 2,
      title: 'Order from 07.04.2023',
      content: {
        price: 15.0,
        books: [
          {
            name: 'Harry Potter',
            author: 'J.K.Rowling',
            price: 12.9,
          },
          {
            name: 'The Beach',
            author: 'Alex Garland',
            price: 8.9,
          },
        ],
      },
    },
    {
      id: 3,
      title: 'Order from 27.03.2023',
      content: {
        price: 27.9,
        books: [
          {
            name: 'Harry Potter',
            author: 'J.K.Rowling',
            price: 12.9,
          },
          {
            name: 'The Beach',
            author: 'Alex Garland',
            price: 8.9,
          },
        ],
      },
    },
  ];

  return (
    <div className="mx-auto flex h-screen w-[300px] justify-center sm:w-[500px] md:w-[600px] lg:w-[800px] xl:w-[900px]">
      <div>
        <h1 className="flex justify-center p-4 text-3xl">My orders</h1>
        <div id="accordion-collapse" data-accordion="collapse">
          {accordionItems.map((item) => (
            <AccordionItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
