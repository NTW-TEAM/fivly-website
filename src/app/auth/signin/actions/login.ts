"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function login(formData: FormData) {

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      status: "error",
      message: "Veuillez remplir tous les champs."
    };
  }

  const response = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "email": email, "password": password }),
  });

  if (response.ok) {
    const data = await response.json();
    const token = data.access_token;

    const user = jwt.verify(token, process.env.JWT_SECRET!);

    cookies().set("auth_token", token, {
      secure: process.env.NODE_ENV === "production",
    });
    console.log(data.message);
    return {
      status: "success",
      message: `Bonjour ${user.firstName} !`
    };

  } else {
    const data = await response.json();
    // data.message is an array of error messages
    console.log(data.message);

    return {
      status: "error",
      message: "Echec de la connexion."
    };
  }

}   