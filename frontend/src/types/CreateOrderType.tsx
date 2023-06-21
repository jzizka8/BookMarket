export type PurchaseData = {
  shippingData: {
    name: string;
    surname: string;
    street: string;
    city: string;
    email: string;
    phoneNumber: string;
    country: string;
    zipcode: string;
  };
  amount: number;
  bookId: string[];
};
