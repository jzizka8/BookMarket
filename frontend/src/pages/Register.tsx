import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import registerFormSchema from '../schemas/RegisterFormSchema';
import { RegisterFormSchemaType } from '../types/FormSchemaTypes';
import { useNavigate } from 'react-router-dom';
import { registration } from '../services/authApi';

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
  });
  const onSubmit: SubmitHandler<RegisterFormSchemaType> = async (data) => {
    await registration(data.username, data.password);
    navigate('/login');
  };
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="break-words text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Create an account
        </h1>
        <form
          className="w-full max-w-sm space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Your username
            </label>
            <input
              type="text"
              id="username"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              placeholder="Your name"
              {...register('username')}
            />
            {errors.username && (
              <span className="mt-2 block text-red-800">
                {errors.username?.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              {...register('password')}
            />
            {errors.password && (
              <span className="mt-2 block text-red-800">
                {errors.password?.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-gray-900 "
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              {...register('confirmPassword')}
            />

            {errors.confirmPassword && (
              <span className="mt-2 block text-red-800">
                {errors.confirmPassword?.message}
              </span>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Create an account
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Register;
