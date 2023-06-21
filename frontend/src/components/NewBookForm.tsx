/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { SubmitHandler, useForm } from 'react-hook-form';
import { NewBookSchemaType } from '../types/FormSchemaTypes';
import { updateBook, createBook } from '../services/bookApi';
import { Book, Genre, Lang } from '../types/prismaTypes';
import { formatGenreName } from '../utils/textFormattingUtils';
import { uploadImage } from '../utils/uploadUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import newBookSchema from '../schemas/NewBookSchema';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

type NewBookFormProps = {
  id?: string;
  book?: Book;
};

const NewBookForm = (props: NewBookFormProps) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  console.log(props.book);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewBookSchemaType>({
    defaultValues: {
      title: props.book?.title,
      author: props.book?.author,
      publicationYear: props.book?.publicationYear.toString(),
      price: props.book?.price.toString(),
      language: props.book?.language,
      genre: props.book?.genre,
      description: props.book?.description,
    },
    resolver: zodResolver(newBookSchema),
  });

  const onSubmit: SubmitHandler<NewBookSchemaType> = async (data) => {
    try {
      let url = await uploadImage(auth?.data.username!, data.photo);
      if (url.includes('default-placeholder.png')) {
        url = props.book?.photo!;
      }
      if (props.book && props.id) {
        await updateBook(props.id, data, url);
      } else {
        await createBook(data, auth?.data.id!, url);
      }

      navigate('/');
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full max-w-xl gap-x-4 gap-y-2 md:grid-cols-2">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder={'Book title'}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
            {...register('title')}
          />
          {errors.title && (
            <span className="mt-2 block text-red-800">
              {errors.title?.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="author"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
            placeholder={'Book author'}
            {...register('author')}
          />
          {errors.author && (
            <span className="mt-2 block text-red-800">
              {errors.author?.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="genre"
            className="mb-2 block text-sm font-medium text-gray-900 "
          >
            Genre
          </label>
          <select id="genre" {...register('genre')} className="form-input p-3">
            {Object.values(Genre).map((genre) => (
              <option key={genre} value={genre}>
                {formatGenreName(genre)}
              </option>
            ))}
          </select>
          {errors.genre && (
            <span className="mt-2 block text-red-800">
              {errors.genre.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="language"
            className="mb-2 block text-sm font-medium text-gray-900 "
          >
            Language
          </label>
          <select
            id="language"
            {...register('language')}
            className="form-input  p-3"
          >
            {Object.values(Lang).map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
          {errors.language && (
            <span className="mt-2 block text-red-800">
              {errors.language.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="publicationYear"
            className="mb-2 block text-sm font-medium text-gray-900 "
          >
            Year of Publication
          </label>
          <input
            type="number"
            id="publicationYear"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
            placeholder="YYYY"
            {...register('publicationYear')}
          />
          {errors.publicationYear && (
            <span className="mt-2 block text-red-800">
              {errors.publicationYear?.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-medium text-gray-900 "
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
            placeholder="12.99"
            {...register('price')}
          />
          {errors.price && (
            <span className="mt-2 block text-red-800">
              {errors.price?.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="picture"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Picture
          </label>
          <input
            type="file"
            id="picture"
            title="Keep original picture"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
            {...register('photo')}
          />
          {errors.photo && (
            <span className="mt-2 block text-red-800">
              {errors.photo?.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <textarea
            id="description"
            className="block h-14 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 sm:text-base"
            placeholder="Description of the Book"
            style={{ paddingTop: '0.75rem' }}
            {...register('description')}
          />
          {errors.description && (
            <span className="mt-2 block text-red-800">
              {errors.description?.message}
            </span>
          )}
        </div>
      </div>
      <div>
        <div className="mt-4 flex justify-center py-2.5">
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-4 py-2.5 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewBookForm;
