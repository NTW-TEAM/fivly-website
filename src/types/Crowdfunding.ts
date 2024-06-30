export type Crowdfunding = {
  id: number;
  title: string;
  description: string;
  goalAmount: string;
  actualAmount: string;
  beginDatetime: string;
  endDatetime: string;
  creator: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    numberAndStreet: string;
    postalCode: string;
    city: string;
    country: string;
    lastConnection: string;
    isActive: boolean;
  };
  gives: { id: number; amount: string; datetime: string }[];
};
