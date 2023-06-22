import { SubmitHandler, useForm } from 'react-hook-form';
import { PurchaseFormSchemaType } from '../types/FormSchemaTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import purchaseFormSchema from '../schemas/PurchaseFormSchema';
import { usePurchaseFormData } from '../context/purchaseFormContext';
interface PurchaseFormProps {
  nextStep: () => void;
}

const PurchaseForm = (props: PurchaseFormProps) => {
  const { purchaseFormData, setPurchaseFormData } = usePurchaseFormData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseFormSchemaType>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: purchaseFormData,
  });

  const onSubmit: SubmitHandler<PurchaseFormSchemaType> = (data) => {
    setPurchaseFormData(data);
    props.nextStep();
  };

  return (
    <>
      <div className="mt-12 flex flex-col items-center justify-center text-center">
        <div>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
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
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
                  placeholder="Janka"
                  {...register('name')}
                />
                {errors.name && (
                  <span className="mt-2 block text-red-800">
                    {errors.name?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="surname"
                  className="mb-2 block text-sm font-medium text-gray-900"
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
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Street
                </label>
                <input
                  type="text"
                  id="shippingAddress"
                  placeholder="Novyi Zem 101"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
                  {...register('street')}
                />
                {errors.street && (
                  <span className="mt-2 block text-red-800">
                    {errors.street?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium text-gray-900"
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
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="example@gmail.com"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
                  {...register('email')}
                />

                {errors.email && (
                  <span className="mt-2 block text-red-800">
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="Lipovec"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
                  {...register('phoneNumber')}
                />

                {errors.phoneNumber && (
                  <span className="mt-2 block text-red-800">
                    {errors.phoneNumber?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="mb-2 block text-sm font-medium text-gray-900"
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
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  ZIP code
                </label>
                <input
                  type="text"
                  id="zip"
                  placeholder="000 00"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 sm:text-base"
                  {...register('zipcode')}
                />

                {errors.zipcode && (
                  <span className="mt-2 block text-red-800">
                    {errors.zipcode?.message}
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
