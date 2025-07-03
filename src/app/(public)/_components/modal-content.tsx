"use client"

import { useState } from "react"
import { ModalLogin } from "./modal-login"
import { ModalRegister } from "./modal-register"

export function ModalContent() {
  const [loginOrRegister, setLoginOrRegister] = useState<boolean>(true);
  return (
    <section className="container mx-auto min-h-[calc(100vh-4rem)] flex w-full items-center justify-center">
      {loginOrRegister ? (
        <ModalLogin onRegisterClick={() => setLoginOrRegister(false)} onForgotPasswordClick={() => setLoginOrRegister(true)} />
      ) : (
        <ModalRegister onRegisterClick={() => setLoginOrRegister(true)} />
      )}
    </section>
  )
}