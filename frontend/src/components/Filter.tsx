import { Book, Genre } from '../types/prismaTypes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import filterSchema from '../schemas/FilterSchema';
import { FilterSchemaType } from '../types/FormSchemaTypes';
import { useState } from 'react';

interface FilterProps {
  books: Book[];
}

const Filter = (props: FilterProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterSchemaType>({
    resolver: zodResolver(filterSchema),
  });

  const onSubmit: SubmitHandler<FilterSchemaType> = async (data) => {
    console.log(data);
  };

  const initialMinValue = 0;
  const initialMaxValue = Math.ceil(
    props.books.reduce((max, book) => {
      return book.price > max ? book.price : max;
    }, 0)
  );
  const [minValue, setMinValue] = useState(initialMinValue);
  const [maxValue, setMaxValue] = useState(initialMaxValue);
  const min = 0;
  const max = initialMaxValue;
  const step = 1;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value);
    if (!isNaN(inputValue) && inputValue >= min && inputValue <= max) {
      setMinValue(inputValue);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value);
    if (!isNaN(inputValue) && inputValue >= min && inputValue <= max) {
      setMaxValue(inputValue);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:end flex flex-col px-4 sm:mr-0 sm:flex-row sm:justify-between md:mb-4 md:mr-24"
      >
        <div className="flex flex-col p-4">
          <label
            htmlFor="genre"
            className="block h-5 text-sm font-medium text-gray-700"
          >
            Genre
          </label>
          <select
            id="genre"
            className="form-input h-11 p-0"
            {...register('genre')}
          >
            {Object.values(Genre).map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col p-4 sm:mt-0">
          <label
            htmlFor="minPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Min price
          </label>
          <input
            type="number"
            id="minPrice"
            value={minValue}
            min={min}
            max={max}
            step={step}
            className="border-b border-t border-gray-300 bg-white px-3 py-2 text-gray-700 focus:outline-none"
            {...register('minPrice')}
            onChange={handleMinChange}
          />
          {errors.minPrice && (
            <span className="mt-2 block text-red-800">
              {errors.minPrice.message}
            </span>
          )}
        </div>
        <div className="flex flex-col p-4">
          <label
            htmlFor="maxPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Max price
          </label>
          <input
            type="number"
            id="maxPrice"
            value={maxValue}
            min={min}
            max={max}
            step={step}
            className="border-b border-t border-gray-300 bg-white px-3 py-2 text-gray-700 focus:outline-none"
            {...register('maxPrice')}
            onChange={handleMaxChange}
          />
          {errors.maxPrice && (
            <span className="mt-2 block text-red-800">
              {errors.maxPrice.message}
            </span>
          )}
        </div>
        <div className="mt-5 px-4 py-3">
          <button
            type="submit"
            className="mt-2 h-11 w-full rounded-md bg-indigo-500 px-4 py-2.5 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:mt-0"
          >
            Filter
          </button>
        </div>
      </form>
    </>
  );
};

export default Filter;
