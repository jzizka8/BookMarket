import { motion } from 'framer-motion';
import book from '../assets/book-map.svg';

const Missing = () => {
  return (
    <div className="grid items-center justify-center py-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ ease: 'easeInOut', duration: 0.5 }}
        className="text-center"
      >
        <img src={book} alt="Book map leading nowhere." className="py-4" />
      </motion.div>
      <div>
        <h1 className="mb-4 py-2.5 text-center text-3xl font-bold leading-tight text-gray-900">
          Looks like you got lost.
        </h1>
      </div>
    </div>
  );
};

export default Missing;
