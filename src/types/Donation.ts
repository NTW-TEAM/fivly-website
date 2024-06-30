export type Donation = {
    id: number;
    amount: string;
    datetime: string;
    potentialUser: {
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
    } | null;
};