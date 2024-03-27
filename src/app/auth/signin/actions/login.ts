"use server";

import { cookies } from "next/headers";

export async function login(formData: FormData) {

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return;
    }

    // Validators


    // get env API_URL variable from .env
    
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
        console.log("token", token);
         
        cookies().set("token", token);
    } else {
        console.log("Error", response.text().then(
            (text) => console.log(text)
        ));
    }

}   