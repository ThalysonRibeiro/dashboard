"use client"

import { useState } from "react"
import { ModalLogin } from "./modal-login"
import { ModalRegister } from "./modal-register"
import { FormRegisterData } from "../hooks/use-form-register";
import api from "@/lib/axios";

export function ModalContent() {
  const [loginOrRegister, setLoginOrRegister] = useState<boolean>(true);

  async function handleLoginOrRegister(data: FormRegisterData) {
    setLoginOrRegister(!loginOrRegister);

    try {
      const response = await api.post("/auth/register-admin", {
        name: data.name,
        email: data.email,
        cpf_or_cnpj: data.cnpj,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        phone: data.phone,
        password: data.password,
        // confirmPassword: data.confirmPassword,
        type: data.type,
        adminPassword: data.adminPassword,
      });

      if (response.status === 201) {
        console.log("User registered successfully");
        // You can redirect or show a success message here
      } else {
        console.error("Failed to register user");
      }
    } catch (error) {
      console.log(error);

    }

  }

  return (
    <section className="container mx-auto min-h-[calc(100vh-4rem)] flex w-full items-center justify-center">
      {loginOrRegister ? (
        <ModalLogin onRegisterClick={() => setLoginOrRegister(false)} onForgotPasswordClick={() => setLoginOrRegister(true)} />
      ) : (
        <ModalRegister onRegisterClick={() => setLoginOrRegister(true)} onSubmit={(data) => handleLoginOrRegister(data)} />
      )}
    </section>
  )
}