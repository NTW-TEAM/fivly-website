"use server";

import {signUp, signUpMember} from "@/services/authService";

export async function register(formData: FormData) {

    const body: signUpMember = {
        firstName: formData.get("firstname") as string,
        lastName: formData.get("lastname") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        phoneNumber: formData.get("phone") as string,
        numberAndStreet: formData.get("address") as string,
        postalCode: formData.get("zip") as string,
        city: formData.get("city") as string,
        country: formData.get("country") as string,
    };

    const response = await signUp(body)
    if (response.status === 201) {
      return {
        status: "success",
        message: `Merci ${formData.get("firstname")}, tu es inscrit !`,
      };
    } else {
      return {
        status: "error",
        message: response.data.message,
      };
    }
}

