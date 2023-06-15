import BookCard from '../components/BookCard/BookCard';
import { Genre, Lang } from '../types/prismaTypes';
import { useState } from 'react';
import Filter from '../components/Filter';
// import axios from 'axios';

const AllBooks = () => {
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
      category: Genre.Mystery,
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
      title: 'Harry Potter and the deathly hallows and the very long title',
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

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [filterQuery, setFilterQuery] = useState({});

  const filterBooks = (query: string) => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  return (
    <>
      <div className="flex px-6">
        <div className="flex w-full flex-col items-center justify-between py-4 sm:flex-row">
          <div className="flex flex-col sm:ml-0 md:mb-4 md:ml-24">
            <label
              htmlFor="search"
              className="text-sm font-medium text-gray-700"
            >
              Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Title or Author"
              className="bg-search-icon h-12 rounded-md border border-gray-300 p-2 pl-10 pr-4 text-gray-800 focus:border-blue-500 focus:outline-none sm:ml-0 sm:w-8 md:w-96"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                filterBooks(e.target.value);
              }}
            />
          </div>
          <Filter
            books={filteredBooks}
            filterQuery={filterQuery}
            setFilterQuery={setFilterQuery}
          />
        </div>
      </div>
      <div className="flex justify-center bg-slate-100">
        <div className="mt-5 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              {...{
                book,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default AllBooks;
