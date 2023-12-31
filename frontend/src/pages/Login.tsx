import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchemaType } from '../types/FormSchemaTypes';
import loginFormSchema from '../schemas/LoginFormSchema';
import BookIcon from '../icons/BookIcon';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
// import { FormEventHandler, useCallback } from 'react';

const Login = () => {
  const { login } = useLogin({ redirect: '/auth/books' });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormSchemaType> = async (data) => {
    // Handle form submission logic here
    await login({ username: data.username, password: data.password });
    navigate('/books');
  };

  return (
    <>
      <div className="mb-8 mt-4 flex items-center justify-center">
        <div className="w-64 sm:w-80">
          <BookIcon className="fill-rose-900" />
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Username"
                {...register('username')}
              />
              {errors.username && (
                <span className="mt-2 block text-red-800">
                  {errors.username?.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="••••••••"
                {...register('password')}
              />
              {errors.password && (
                <span className="mt-2 block text-red-800">
                  {errors.password?.message}
                </span>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="rounded-md bg-primary-main px-4 py-2 text-white hover:bg-primary-dark focus:outline-none focus:ring-2"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
