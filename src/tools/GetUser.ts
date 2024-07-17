import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {UserJwt} from "@/types/UserJwt";

export const getUser = (): UserJwt => {
    const cookieStore = cookies();
    const authToken = cookieStore.get("auth_token");

    if (authToken) {
        return jwt.verify(authToken.value, process.env.JWT_SECRET!) as UserJwt;
    }
    else {
        return {
            city: "",
            country: "",
            isActive: false,
            lastConnection: "",
            numberAndStreet: "",
            phoneNumber: "",
            postalCode: "",
            scopes: [],
            id: 0,
            email: "",
            firstName: "",
            lastName: "",
            roles: [],
            iat: 0,
            exp: 0
        };
    }
}