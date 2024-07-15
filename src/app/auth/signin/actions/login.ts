"use server";

import {cookies} from "next/headers";
import jwt, {JwtPayload} from "jsonwebtoken";
import {signIn, signInMember} from "@/services/authService";

export async function login(formData: FormData) {

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      status: "error",
      message: "Veuillez remplir tous les champs."
    };
  }

  const memberInfo: signInMember = {
    email: email as string,
    password: password as string
  };
  const response = await signIn(memberInfo);

  if (response.status === 200) {
    const data = response.data;
    const token = data.access_token;

    const user = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    cookies().set("auth_token", token, {
      secure: process.env.NODE_ENV === "production",
    });
    
    return {
      status: "success",
      message: `Bonjour ${user.firstName} !`
    };

  } else {
    return {
      status: response.status,
      message: "Echec de la connexion."
    };
  }
}