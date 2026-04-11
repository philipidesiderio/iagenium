"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bot } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("iagenium_logged_in") === "true") {
      router.push("/dashboard")
    }
  }, [router])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email && password) {
      localStorage.setItem("iagenium_logged_in", "true")
      localStorage.setItem("iagenium_user", email)
      router.push("/dashboard")
    } else {
      alert("Por favor, preencha todos os campos.")
    }
  }

  function loginWithTypebot() {
    window.location.href = "https://admin.iagenium.shop/pt-BR/signin"
  }

  return (
    <div className="bg-gray-950 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Bot className="text-white w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              IaGenium
            </h1>
            <p className="text-gray-400 mt-2">
              Acesse sua conta para gerenciar seus chatbots
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-cyan-600 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                />
                <span className="ml-2 text-sm text-gray-300">Lembrar de mim</span>
              </label>
              <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-cyan-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
            >
              Acessar Dashboard
            </button>
          </form>

          {/* Alternative Login */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <button
              onClick={loginWithTypebot}
              className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors"
            >
              Continuar com Typebot
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Não tem uma conta?{" "}
              <a href="/#planos" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Assine um plano
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
