import { FC } from 'react';
import { Link } from 'react-router-dom';

type DeleteModalProps = {
  setShowModal: (bool: boolean) => void;
  handleDelete: () => void;
};

export const DeleteModal: FC<DeleteModalProps> = ({
  setShowModal,
  handleDelete,
}) => (
  <div className="fixed inset-0 z-50 mx-4 flex items-center justify-center overflow-y-scroll outline-none focus:outline-none">
    <div className="relative max-h-full w-full max-w-md">
      <div className="relative rounded-lg bg-white shadow">
        <div className="p-6 text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500">
            Are you sure you want to delete this book?
          </h3>
          <Link to="/books">
            <button
              onClick={() => handleDelete()}
              type="button"
              className="xs:mb-none mx-2 mb-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              Yes, I&apos;m sure
            </button>
          </Link>
          <button
            onClick={() => setShowModal(false)}
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  </div>
);
