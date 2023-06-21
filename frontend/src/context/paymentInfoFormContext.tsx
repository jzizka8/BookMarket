import { createContext, useContext, useState } from 'react';
import { PaymentInfoSchemaType } from '../types/FormSchemaTypes';

interface PaymentInfoFormContextType {
  paymentInfoData: PaymentInfoSchemaType;
  setPaymentInfoData: (data: PaymentInfoSchemaType) => void;
}

const PaymentInfoFormContext = createContext<
  PaymentInfoFormContextType | undefined
>(undefined);

export const usePaymentInfoFormContext = (): PaymentInfoFormContextType => {
  const context = useContext(PaymentInfoFormContext);
  if (!context) {
    throw new Error(
      'usePaymentInfoFormContext must be used within a PaymentInfoFormProvider'
    );
  }
  return context;
};

interface PaymentInfoFormProviderProps {
  children: React.ReactNode;
}

export const PaymentInfoFormProvider = ({
  children,
}: PaymentInfoFormProviderProps) => {
  const [paymentInfoData, setPaymentInfoData] = useState<PaymentInfoSchemaType>(
    {
      name: '',
      cardNumber: '',
      expirationDate: '',
      cvv: '',
    }
  );

  return (
    <PaymentInfoFormContext.Provider
      value={{ paymentInfoData, setPaymentInfoData }}
    >
      {children}
    </PaymentInfoFormContext.Provider>
  );
};
