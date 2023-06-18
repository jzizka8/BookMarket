import { Book, Genre } from '../types/prismaTypes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import filterSchema from '../schemas/FilterSchema';
import { FilterSchemaType } from '../types/FormSchemaTypes';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface FilterProps {
  books: Book[];
  filterQuery: object;
  setFilterQuery: Dispatch<SetStateAction<object>>;
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
    const filterObj: {
      search?: string;
      genre?: string;
      min?: number;
      max?: number;
    } = {};

    if (data.search) {
      filterObj.search = data.search;
    }

    if (data.genre) {
      filterObj.genre = data.genre;
    }

    if (data.minPrice) {
      filterObj.min = data.minPrice;
    }

    if (data.maxPrice) {
      filterObj.max = data.maxPrice;
    }

    props.setFilterQuery(filterObj);
    console.log(filterObj);
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
        className="flex flex-col justify-center sm:mr-0 sm:flex-row md:mb-4"
      >
        <div className="flex flex-col pr-4">
          <label htmlFor="search" className="text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Title or Author"
            className="bg-search-icon h-11 rounded-md border border-gray-300 p-2 pr-4 text-gray-800 focus:border-blue-500 focus:outline-none sm:ml-0 sm:min-w-[200px]"
            {...register('search')}
          />
        </div>
        <div className="flex flex-col pr-4">
          <label htmlFor="genre" className="text-sm font-medium text-gray-700">
            Genre
          </label>
          <select
            id="genre"
            className="form-input h-11 min-w-max p-2"
            {...register('genre')}
          >
            <option value=""></option>
            {Object.values(Genre).map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="w-18 flex flex-col items-center pr-4">
          <label
            htmlFor="minPrice"
            className="whitespace-nowrap text-sm font-medium text-gray-700"
          >
            Min price
          </label>
          <div className="flex flex-col items-center">
            <input
              type="number"
              id="minPrice"
              value={minValue}
              min={min}
              max={max}
              step={step}
              className="w-18 h-11 border-b border-t border-gray-300 bg-white px-3 text-gray-700 focus:outline-none sm:w-full"
              {...register('minPrice')}
              onChange={handleMinChange}
            />
            {errors.minPrice && (
              <span className="mt-2 block text-red-800">
                {errors.minPrice.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-18 flex flex-col items-center pr-4">
          <label
            htmlFor="maxPrice"
            className="whitespace-nowrap text-sm font-medium text-gray-700"
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
            className="w-18 h-11 border-b border-t border-gray-300 bg-white px-3 text-gray-700 focus:outline-none sm:w-full"
            {...register('maxPrice')}
            onChange={handleMaxChange}
          />
          {errors.maxPrice && (
            <span className="mt-2 block text-red-800">
              {errors.maxPrice.message}
            </span>
          )}
        </div>
        <div className="mt-5 pr-4">
          <button
            type="submit"
            className="mt-2 h-11 w-full rounded-md bg-blue-700 px-4 py-2.5 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:mt-0"
          >
            Filter
          </button>
        </div>
      </form>
    </>
  );
};

export default Filter;
