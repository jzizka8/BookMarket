import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { bookId } = useParams();
  return <div>Book with id: {bookId} Detail</div>;
};
export default BookDetail;
