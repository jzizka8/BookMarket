import { useParams } from 'react-router-dom';

const Detail = () => {
  const { bookId } = useParams();
  return <div>Book with id: {bookId} Detail</div>;
};
export default Detail;
