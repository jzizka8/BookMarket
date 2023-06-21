import NewBookForm from '../components/NewBookForm';
const BookAddition = () => {
  return (
    <>
      <div className="m-auto flex min-h-fit flex-col items-center justify-center text-center">
        <div>
          <h1 className="mb-4 py-2.5 text-3xl font-bold leading-tight text-gray-900">
            Let a book live its second life
          </h1>
          <p className="mb-4 break-words text-center">
            Fill out the form below to add your book to the market.
          </p>
        </div>
        <NewBookForm />
      </div>
    </>
  );
};

export default BookAddition;
