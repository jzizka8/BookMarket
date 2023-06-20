import BookCard from '../components/BookCard';
import { Genre, Lang } from '../types/prismaTypes';
import { useState } from 'react';
import Filter from '../components/Filter';
// import axios from 'axios';

const AllBooks = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // const allBooks = async () => {
  //   try {
  //     const response = await axios.get('https://localhost:3000/books');
  //     return response;
  //   } catch (error) {
  //     console.error('Error fetching books:', error);
  //   }
  // };
  //
  // console.log(allBooks());
  const books = [
    {
      id: '51802sf7-9ab5-437d-b4a4-1db640c69eda',
      createdAt: new Date(),
      soldBy: '',
      category: Genre.ScienceFiction,
      seller: {
        id: '5452fa3f-7a0c-4463-96f8-3c86476f58b8',
        username: 'joe26',
        hashedPassword: '081d6e498fabb341f5d06ed1f83d089d',
        createdAt: new Date(),
      },
      title: 'Harry Potter and the deathly hallows',
      author: 'Joanne Kathleen Rowling',
      price: 18.9,
      publicationYear: 2023,
      language: Lang.EN,
      photo: 'https://picsum.photos/250/300',
      description:
        'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry',
    },
    {
      id: '518028f7-9ab5-437d-b4a4-1db640c69eda',
      createdAt: new Date(),
      soldBy: '',
      category: Genre.Mystery,
      seller: {
        id: '5452fa3f-7a0c-4463-96f8-3c86476f58b8',
        username: 'joe26',
        hashedPassword: '081d6e498fabb341f5d06ed1f83d089d',
        createdAt: new Date(),
      },
      title: 'Harry Potter ',
      author: 'Joanne Kathleen Rowling',
      price: 18.9,
      publicationYear: 2023,
      language: Lang.EN,
      photo:
        'https://www.knihydobrovsky.cz/thumbs/book-detail-fancy-box/mod_eshop/produkty/398470745/59.jpg',
      description:
        'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry',
    },
    {
      id: '51802827-9ab5-437d-b4a4-1db640c69eda',
      createdAt: new Date(),
      soldBy: '',
      category: Genre.Mystery,
      seller: {
        id: '5452fa3f-7a0c-4463-96f8-3c86476f58b8',
        username: 'joe26',
        hashedPassword: '081d6e498fabb341f5d06ed1f83d089d',
        createdAt: new Date(),
      },
      title: 'Harry Potter and the deathly hallows',
      author: 'Joanne Kathleen Rowling',
      price: 18.89,
      publicationYear: 2023,
      language: Lang.EN,
      photo: 'https://picsum.photos/300/350',
      description:
        'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry',
    },
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
      title:
        'Harry Potter and the deathly hallows and the very long title title title',
      author: 'Joanne Kathleen Rowling Rowling Joanne Kathleen',
      price: 18.9,
      publicationYear: 2023,
      language: Lang.EN,
      photo: 'https://picsum.photos/1500/1000',
      description:
        'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry',
      invoice: {
        id: '46808aed-cca9-4860-b69d-bfe56852f170',
        buyer: {
          id: '5452fa3f-7a0c-446d-96f8-3c86476f58b8',
          username: 'jo',
          hashedPassword: '081d6e498fabb341f5d06ed1f83d089d',
          createdAt: new Date(),
        },
        buyerId: '5452fa3f-7a0c-446d-96f8-3c86476f58b8',
        date: new Date(),
        createdAt: new Date(),
        amount: 18.9,
        name: 'William',
        surname: 'Harrington',
        email: 'william@email.com',
        phoneNumber: '+421999008007',
        street: 'Ulica',
        city: 'Mesto',
        zipcode: '04028',
        country: 'Slovakia',
      },
    },
  ];

  // const [filteredBooks, setFilteredBooks] = useState(books);
  const [filteredBooks] = useState(books);
  const [filterQuery, setFilterQuery] = useState({});

  // const filterBooks = (query: string) => {
  //   const filtered = books.filter(
  //     (book) =>
  //       book.title.toLowerCase().includes(query.toLowerCase()) ||
  //       book.author.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setFilteredBooks(filtered);
  // };

  return (
    <>
      <div className="items-center px-2 text-center">
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center rounded-lg p-2 text-sm hover:text-primary-light focus:outline-none md:ml-3 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={toggleMenu}
        >
          <svg
            fill="none"
            className="h-6 w-6"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            ></path>
          </svg>
          Filter
        </button>
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full py-4 md:block md:w-auto`}
          id="navbar-default"
        >
          <Filter
            books={filteredBooks}
            filterQuery={filterQuery}
            setFilterQuery={setFilterQuery}
          />
        </div>
      </div>
      <div className="flex justify-center bg-slate-100">
        <div className="mt-5 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              {...{
                book,
              }}
              showRemoveButton={false}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default AllBooks;
