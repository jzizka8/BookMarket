import { SubmitHandler, useForm } from 'react-hook-form';
import { PurchaseFormSchemaType } from '../types/FormSchemaTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import purchaseFormSchema from '../schemas/PurchaseFormSchema';
import { useFormData } from '../context/purchaseFormContext';

interface PurchaseFormProps {
  nextStep: () => void;
}

const PurchaseForm = (props: PurchaseFormProps) => {
  const { formData, setFormData } = useFormData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseFormSchemaType>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: formData,
  });

  const onSubmit: SubmitHandler<PurchaseFormSchemaType> = (data) => {
    console.log(data);
    setFormData(data);
    props.nextStep();
  };

  return (
    <>
      <div className="mt-12 flex flex-col items-center justify-center text-center">
        <div>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl">
            Delivery Information
          </h1>
          <p className="mb-4 break-words text-center">
            Fill out the form below to complete your purchase.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="grid w-full max-w-xl gap-x-4 gap-y-2 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
                  placeholder="Janka"
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <span className="mt-2 block text-red-800">
                    {errors.firstName?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="surname"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Surname
                </label>
                <input
                  type="text"
                  id="surname"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
                  placeholder="Srnka"
                  {...register('surname')}
                />
                {errors.surname && (
                  <span className="mt-2 block text-red-800">
                    {errors.surname?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="shippingAddress"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Shipping Address
                </label>
                <input
                  type="text"
                  id="shippingAddress"
                  placeholder="Novyi Zem 101"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
                  {...register('shippingAddress')}
                />
                {errors.shippingAddress && (
                  <span className="mt-2 block text-red-800">
                    {errors.shippingAddress?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  placeholder="New York"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
                  {...register('city')}
                />

                {errors.city && (
                  <span className="mt-2 block text-red-800">
                    {errors.city?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  State or Province
                </label>
                <input
                  type="text"
                  id="state"
                  placeholder="Lipovec"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
                  {...register('state')}
                />

                {errors.state && (
                  <span className="mt-2 block text-red-800">
                    {errors.state?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  placeholder="Bulgaria"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
                  {...register('country')}
                />

                {errors.country && (
                  <span className="mt-2 block text-red-800">
                    {errors.country?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  ZIP code
                </label>
                <input
                  type="text"
                  id="zip"
                  placeholder="000 00"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
                  {...register('zip')}
                />

                {errors.zip && (
                  <span className="mt-2 block text-red-800">
                    {errors.zip?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="mb-8 mt-4 flex justify-center">
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

export default PurchaseForm;
