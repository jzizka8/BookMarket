import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import registerFormSchema from '../../utils/formSchemas/RegisterFormSchema';
import { RegisterFormSchemaType } from '../../types/FormSchemaTypes';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
  });
  const onSubmit: SubmitHandler<RegisterFormSchemaType> = (data) => {
    console.log(data);
    navigate('/');
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-8 h-screen">
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white break-words">
          Create an account
        </h1>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your username
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="Your name"
              {...register('username')}
            />
            {errors.username && (
              <span className="text-red-800 block mt-2">
                {errors.username?.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              {...register('password')}
            />
            {errors.password && (
              <span className="text-red-800 block mt-2">
                {errors.password?.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              {...register('confirmPassword')}
            />

            {errors.confirmPassword && (
              <span className="text-red-800 block mt-2">
                {errors.confirmPassword?.message}
              </span>
            )}
          </div>
          <div className="flex items-start">
            {/*<div className="flex items-center h-5">*/}
            {/*  <input*/}
            {/*    id="terms"*/}
            {/*    aria-describedby="terms"*/}
            {/*    type="checkbox"*/}
            {/*    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"*/}
            {/*    {...register('terms')}*/}
            {/*  />*/}
            {/*</div>*/}
            {/*<div className="ml-3 text-sm">*/}
            {/*  <label*/}
            {/*    htmlFor="terms"*/}
            {/*    className="font-light text-gray-500 dark:text-gray-300"*/}
            {/*  >*/}
            {/*    I accept the{' '}*/}
            {/*    <a*/}
            {/*      className="font-medium text-primary-600 hover:underline dark:text-primary-500"*/}
            {/*      href="#"*/}
            {/*    >*/}
            {/*      Terms and Conditions*/}
            {/*    </a>*/}
            {/*  </label>*/}
            {/*</div>*/}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
