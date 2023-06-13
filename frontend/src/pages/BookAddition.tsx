import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NewBookSchemaType } from '../../types/FormSchemaTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import newBookSchema from '../schemas/NewBookSchema';
import { Genre, Lang } from '../types/prismaTypes';
import '../styles/index.css';
const BookAddition = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewBookSchemaType>({
    resolver: zodResolver(newBookSchema),
  });
  const onSubmit: SubmitHandler<NewBookSchemaType> = (data) => {
    console.log(data);
    navigate('/');
  };

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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
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
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
                  placeholder="Title of Your Book"
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
                  placeholder="Author's Name"
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
                <select
                  id="genre"
                  {...register('genre')}
                  className="form-input"
                >
                  {Object.values(Genre).map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
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
                  className="form-input"
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
                  htmlFor="yearOfPublication"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Year of Publication
                </label>
                <input
                  type="text"
                  id="yearOfPublication"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
                  placeholder="YYYY"
                  {...register('yearOfPublication')}
                />
                {errors.yearOfPublication && (
                  <span className="mt-2 block text-red-800">
                    {errors.yearOfPublication?.message}
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
            </div>
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
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
              {...register('picture')}
            />
            {errors.picture && (
              <span className="mt-2 block text-red-800">
                {errors.picture?.message}
              </span>
            )}
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
      </div>
    </>
  );
};
export default BookAddition;
