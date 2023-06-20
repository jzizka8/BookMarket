import { createContext, useContext, useState } from 'react';
import { PurchaseFormSchemaType } from '../types/FormSchemaTypes';

interface FormDataContextType {
  formData: PurchaseFormSchemaType;
  setFormData: (data: PurchaseFormSchemaType) => void;
}

const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined
);

export const useFormData = (): FormDataContextType => {
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
  const [formData, setFormData] = useState<PurchaseFormSchemaType>({
    firstName: '',
    surname: '',
    shippingAddress: '',
    city: '',
    state: '',
    country: '',
    zip: '',
  });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
