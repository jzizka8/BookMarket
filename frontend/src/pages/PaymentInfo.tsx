import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PaymentInfoSchemaType } from '../../types/FormSchemaTypes';
import paymentInfoSchema from '../schemas/PaymentInfoSchema';
import { useNavigate } from 'react-router-dom';

const PaymentInfo = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentInfoSchemaType>({
    resolver: zodResolver(paymentInfoSchema),
  });
  const onSubmit: SubmitHandler<PaymentInfoSchemaType> = (data) => {
    console.log(data);
    navigate('/orderConfirmation');
  };

  return (
    <>
      <div className="mt-32 flex flex-col items-center justify-center text-center">
        <div>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl">
            Card Information
          </h1>
          <p className="mb-4 break-words text-center">
            Fill out the form below to complete your purchase.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-96">
            <div className="relative mb-8">
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Card number
              </label>
              <input
                type="text"
                id="cardNumber"
                className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base ${
                  errors.cardNumber ? 'border-red-500' : ''
                }`}
                placeholder="**** **** **** ****"
                {...register('cardNumber')}
              />
              {errors.cardNumber && (
                <span className="translate-y-0.1 absolute left-0 right-0 top-full mt-2 block transform text-sm text-red-800">
                  {errors.cardNumber?.message}
                </span>
              )}
            </div>
            <div className="relative mb-8">
              <label
                htmlFor="expirationDate"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Expiration Date
              </label>
              <input
                type="text"
                id="expirationDate"
                className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base ${
                  errors.expirationDate ? 'border-red-500' : ''
                }`}
                placeholder="MM/YY"
                {...register('expirationDate')}
              />
              {errors.expirationDate && (
                <span className="translate-y-0.1 absolute left-0 right-0 top-full mt-2 block transform text-sm text-red-800">
                  {errors.expirationDate?.message}
                </span>
              )}
            </div>
            <div className="relative mb-8">
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                placeholder="000"
                className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base ${
                  errors.cvv ? 'border-red-500' : ''
                }`}
                {...register('cvv')}
              />
              {errors.cvv && (
                <span className="translate-y-0.1 absolute left-0 right-0 top-full mt-2 block transform text-sm text-red-800">
                  {errors.cvv?.message}
                </span>
              )}
            </div>
            <div className="relative mb-8">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Name on the card
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Smith"
                className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base ${
                  errors.name ? 'border-red-500' : ''
                }`}
                {...register('name')}
              />
              {errors.name && (
                <span className="translate-y-0.1 absolute left-0 right-0 top-full mt-2 block transform text-sm text-red-800">
                  {errors.name?.message}
                </span>
              )}
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-4 py-2.5 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentInfo;
