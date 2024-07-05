import api from './axios';

export interface signInMember {
    email: string;
    password: string;
}

export interface signUpMember {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string,
    numberAndStreet: string,
    postalCode: string,
    city: string,
    country: string,
}

const signIn = async (memberInfo: signInMember) => {
    const response = await api.post("auth/login", memberInfo);
    return response;
};

const signUp = async (memberInfo: signUpMember) => {
    const response = await api.post("users/register", memberInfo);
    return response;
}

export { signIn, signUp };