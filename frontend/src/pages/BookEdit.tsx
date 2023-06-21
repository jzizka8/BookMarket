import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import NewBookForm from '../components/NewBookForm';
import { fetchBook } from '../services/bookApi';

const BookEdit = () => {
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get('id');

  if (!bookId) {
    return <>An unexpected error occured</>;
  }

  const {
    isLoading,
    isError,
    data: book,
  } = useQuery(['book'], () => fetchBook(bookId));
  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching books.</div>;
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <div>
          <h1 className="mb-4 py-2.5 text-3xl font-bold leading-tight text-gray-900">
            Let a book live its second life
          </h1>
          <p className="mb-4 break-words text-center">
            Fill out the form below to add your book to the market.
          </p>
        </div>
        <NewBookForm book={book} id={bookId} />
      </div>
    </>
  );
};

export default BookEdit;
