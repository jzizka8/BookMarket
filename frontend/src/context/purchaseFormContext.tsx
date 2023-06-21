import { createContext, useContext, useState } from 'react';
import { PurchaseFormSchemaType } from '../types/FormSchemaTypes';

interface FormDataContextType {
  purchaseFormData: PurchaseFormSchemaType;
  setPurchaseFormData: (data: PurchaseFormSchemaType) => void;
}

const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined
);

export const usePurchaseFormData = (): FormDataContextType => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};

interface FormDataProviderProps {
  children: React.ReactNode;
}

export const FormDataProvider = ({ children }: FormDataProviderProps) => {
  const [purchaseFormData, setPurchaseFormData] =
    useState<PurchaseFormSchemaType>({
      name: '',
      surname: '',
      phoneNumber: '',
      email: '',
      street: '',
      city: '',
      country: '',
      zipcode: '',
    });

  return (
    <FormDataContext.Provider value={{ purchaseFormData, setPurchaseFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
