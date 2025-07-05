"use server"

import serverApi from "@/lib/serverApi";
import { FormRegisterData } from "../hooks/use-form-register";
import { AxiosError } from "axios";


export async function registerServerAction(data: FormRegisterData) {
  try {
    await serverApi.post("/auth/register-admin", {
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


    return {
      success: true,
      message: 'Registro realizado com sucesso!'
    };

  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message || 'Erro desconhecido';
      return {
        success: false,
        error: errorMessage
      };
    }
    return {
      success: false,
      error: 'Erro interno do servidor'
    };
  }
}