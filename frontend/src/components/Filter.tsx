import { Book, Genre } from '../types/prismaTypes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import filterSchema from '../schemas/FilterSchema';
import { FilterSchemaType } from '../types/FormSchemaTypes';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatGenreName } from '../utils/textFormattingUtils';

interface FilterProps {
  books: Book[];
  filterQuery: object;
}

const Filter = (props: FilterProps) => {
  const searchParams = new URLSearchParams(window.location.search);
  const queryParams = Object.fromEntries(searchParams.entries());
  const filterQuery = filterSchema.parse(queryParams);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterSchemaType>({
    resolver: zodResolver(filterSchema),
    defaultValues: filterQuery,
  });
  const nagivate = useNavigate();
  const onSubmit: SubmitHandler<FilterSchemaType> = async (data) => {
    const filterObj: {
      searchInput?: string;
      genre?: string;
      min?: string;
      max?: string;
    } = {};

    if (data.searchInput) {
      filterObj.searchInput = data.searchInput;
    }

    if (data.genre) {
      filterObj.genre = data.genre;
    }

    if (data.min) {
      filterObj.min = data.min.toString();
    }

    if (data.max) {
      filterObj.max = data.max.toString();
    }

    nagivate({
      pathname: '/books',
      search: `?${new URLSearchParams(filterObj).toString()}`,
    });
  };

  const initialMinValue = 0;
  const initialMaxValue = Math.ceil(
    props.books.reduce((max, book) => {
      return book.price > max ? book.price : max;
    }, 0)
  );
  const [, setMinValue] = useState(initialMinValue);
  const [, setMaxValue] = useState(initialMaxValue);
  const min = 0;
  const max = initialMaxValue;
  const step = 1;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value);
    if (!isNaN(inputValue)) {
      setMinValue(inputValue);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value);
    if (!isNaN(inputValue)) {
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
          <label
            htmlFor="searchInput"
            className="text-sm font-medium text-gray-700"
          >
            Search
          </label>
          <input
            id="searchInput"
            type="text"
            placeholder="Title or Author"
            className="bg-search-icon h-11 rounded-md border border-gray-300 p-2 pr-4 text-gray-800 focus:border-blue-500 focus:outline-none sm:ml-0 sm:min-w-[200px]"
            {...register('searchInput')}
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
                {formatGenreName(genre)}
              </option>
            ))}
          </select>
        </div>
        <div className="w-18 flex flex-col items-center pr-4">
          <label
            htmlFor="min"
            className="whitespace-nowrap text-sm font-medium text-gray-700"
          >
            Min price
          </label>
          <div className="flex flex-col items-center">
            <input
              type="number"
              id="min"
              min={min}
              max={max}
              step={step}
              className="w-18 h-11 border-b border-t border-gray-300 bg-white px-3 text-gray-700 focus:outline-none sm:w-full"
              {...register('min')}
              onChange={handleMinChange}
            />
            {errors.min && (
              <span className="mt-2 block text-red-800">
                {errors.min.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-18 flex flex-col items-center pr-4">
          <label
            htmlFor="max"
            className="whitespace-nowrap text-sm font-medium text-gray-700"
          >
            Max price
          </label>
          <input
            type="number"
            id="max"
            min={min}
            step={step}
            className="w-18 h-11 border-b border-t border-gray-300 bg-white px-3 text-gray-700 focus:outline-none sm:w-full"
            {...register('max')}
            onChange={handleMaxChange}
          />
          {errors.max && (
            <span className="mt-2 block text-red-800">
              {errors.max.message}
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
