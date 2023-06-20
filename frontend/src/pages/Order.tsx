import { Stepper } from 'react-stepa';
import PaymentInfo from './PaymentInfo';
import { useState } from 'react';
import OrderConfirmation from './OrderConfirmation';
import PurchaseForm from './PurchaseForm';
import { FormDataProvider } from '../context/purchaseFormContext';

const Order = () => {
  const [stepIndex, setStepIndex] = useState(0);

  const nextStep = () => {
    setStepIndex((prevIndex) => prevIndex + 1);
  };

  const previousStep = () => {
    setStepIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <>
      <FormDataProvider>
        <div className="mb-6 mt-6 flex justify-center">
          <Stepper
            customStyle={{
              completed: '#723d46',
              pending: '#eb5e28',
              progress: '#eb5e28',
            }}
            steps={[
              {
                label: 'Order',
                description: 'Purchase Details',
              },
              {
                label: 'Payment Info',
                description: 'Card Information',
              },
              {
                label: 'Confirmation',
                description: 'Enjoy!',
              },
            ]}
            activeStep={stepIndex}
          />
        </div>
        {stepIndex === 0 && <PurchaseForm nextStep={nextStep} />}
        {stepIndex === 1 && (
          <PaymentInfo previousStep={previousStep} nextStep={nextStep} />
        )}
        {stepIndex === 2 && <OrderConfirmation />}
      </FormDataProvider>
    </>
  );
};
export default Order;
