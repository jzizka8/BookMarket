import { useState } from 'react';
import BookCard from '../components/BookCard/BookCard';
import { Genre, Lang } from '../types/prismaTypes';

const AllBooks = () => {
  const filteredBooks = [
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
  const SHOWN_ITEMS_COUNT = 20;
  const [shownItems, setShownItems] = useState(SHOWN_ITEMS_COUNT);
  const showMore = () => {
    setShownItems(shownItems + SHOWN_ITEMS_COUNT);
  };
  return (
    <div className="mx-4 my-9 flex flex-col items-center">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredBooks.slice(0, shownItems).map((book) => (
          <BookCard
            key={book.id}
            {...{
              book,
            }}
          />
        ))}
      </div>
      <div className="flex justify-center">
        {filteredBooks.length > shownItems && (
          <button
            type="button"
            className="m-8 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-2xl font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={showMore}
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
};
export default AllBooks;
