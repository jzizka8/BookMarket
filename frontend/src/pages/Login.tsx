import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchemaType } from '../../types/FormSchemaTypes';
import loginFormSchema from '../schemas/LoginFormSchema';

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormSchemaType> = (data) => {
    // Handle form submission logic here
    navigate('/register');
    console.log(data);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-64 sm:w-80">
          <img
            src="https://via.placeholder.com/300x200"
            alt="Placeholder Image"
            width="300"
            height="200"
            className="mx-auto"
          />
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
                className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Username"
                {...register('username')}
              />
              {errors.username && (
                <span className="text-red-800 block mt-2">
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
                className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
                {...register('password')}
              />
              {errors.password && (
                <span className="text-red-800 block mt-2">
                  {errors.password?.message}
                </span>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
