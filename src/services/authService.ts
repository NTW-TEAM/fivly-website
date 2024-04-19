import api from './axios';

export interface signInMember {
    email: string;
    password: string;
}


const signIn = async (memberInfo: signInMember) => {
    const response = await api.post("auth/login", memberInfo);
    return response;
};


export { signIn };