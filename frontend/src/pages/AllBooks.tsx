import BookCard from '../components/BookCard/BookCard';
import { Genre, Lang } from '../types/prismaTypes';

const AllBooks = () => {
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

  return (
    <div className="flex justify-center bg-slate-100">
      <div className="mt-5 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard
            key={book.id}
            {...{
              book,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default AllBooks;
