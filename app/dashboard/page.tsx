"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Bot,
  Menu,
  LogOut,
  Home,
  Plus,
  BarChart2,
  Settings,
  Headphones,
  MessageSquare,
  TrendingUp,
  DollarSign,
} from "lucide-react"

type Page = "dashboard" | "typebots" | "create" | "analytics" | "settings" | "support"

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState("Admin")
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("iagenium_logged_in") !== "true") {
      router.push("/login")
      return
    }
    const storedUser = localStorage.getItem("iagenium_user")
    if (storedUser) setUser(storedUser)
  }, [router])

  function logout() {
    if (confirm("Tem certeza que deseja sair?")) {
      localStorage.removeItem("iagenium_logged_in")
      localStorage.removeItem("iagenium_user")
      router.push("/")
    }
  }

  const navItems = [
    { id: "dashboard" as Page, label: "Dashboard", icon: <Home className="w-4 h-4" /> },
    { id: "typebots" as Page, label: "Meus ChatBots", icon: <Bot className="w-4 h-4" /> },
    { id: "create" as Page, label: "Criar ChatBot", icon: <Plus className="w-4 h-4" /> },
    { id: "analytics" as Page, label: "Relatórios", icon: <BarChart2 className="w-4 h-4" /> },
    { id: "settings" as Page, label: "Configurações", icon: <Settings className="w-4 h-4" /> },
    { id: "support" as Page, label: "Suporte", icon: <Headphones className="w-4 h-4" /> },
  ]

  function navigate(page: Page) {
    setCurrentPage(page)
    setSidebarOpen(false)
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="lg:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="text-white w-4 h-4" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                IaGenium Dashboard
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">{user}</div>
            <button onClick={logout} className="text-gray-400 hover:text-white">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex" style={{ height: "calc(100vh - 65px)" }}>
        {/* Sidebar */}
        <aside
          className={`fixed lg:relative z-30 w-64 bg-gray-900 border-r border-gray-800 h-full transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <nav className="p-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Dashboard Home */}
          {currentPage === "dashboard" && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Bem-vindo ao IaGenium
                </h2>
                <p className="text-gray-400">
                  Gerencie seus chatbots e automatize seu atendimento
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  {
                    label: "ChatBots Ativos",
                    value: "2",
                    icon: <Bot className="text-green-400 w-6 h-6" />,
                    bg: "bg-green-500/20",
                  },
                  {
                    label: "Conversas Hoje",
                    value: "127",
                    icon: <MessageSquare className="text-blue-400 w-6 h-6" />,
                    bg: "bg-blue-500/20",
                  },
                  {
                    label: "Taxa de Conversão",
                    value: "34%",
                    icon: <TrendingUp className="text-purple-400 w-6 h-6" />,
                    bg: "bg-purple-500/20",
                  },
                  {
                    label: "Vendas Hoje",
                    value: "R$ 2.340",
                    icon: <DollarSign className="text-cyan-400 w-6 h-6" />,
                    bg: "bg-cyan-500/20",
                  },
                ].map(({ label, value, icon, bg }) => (
                  <div
                    key={label}
                    className="bg-gray-900 p-6 rounded-xl border border-gray-800"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{label}</p>
                        <p className="text-2xl font-bold text-white">{value}</p>
                      </div>
                      <div
                        className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center`}
                      >
                        {icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Ações Rápidas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => navigate("create")}
                    className="flex items-center space-x-3 p-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg hover:from-cyan-700 hover:to-purple-700 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Criar Novo ChatBot</span>
                  </button>
                  <button
                    onClick={() => navigate("typebots")}
                    className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Bot className="w-5 h-5" />
                    <span>Ver Meus ChatBots</span>
                  </button>
                  <button
                    onClick={() => navigate("analytics")}
                    className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <BarChart2 className="w-5 h-5" />
                    <span>Ver Relatórios</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TypeBots / Create - iframe */}
          {(currentPage === "typebots" || currentPage === "create") && (
            <iframe
              src="https://admin.iagenium.shop/pt-BR/typebots"
              style={{
                border: "none",
                width: "100%",
                height: "calc(100vh - 145px)",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          )}

          {/* Analytics */}
          {currentPage === "analytics" && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Relatórios e Analytics
                </h2>
                <p className="text-gray-400">
                  Acompanhe o desempenho dos seus chatbots
                </p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <p className="text-gray-400">Relatórios detalhados em breve...</p>
              </div>
            </div>
          )}

          {/* Settings */}
          {currentPage === "settings" && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Configurações
                </h2>
                <p className="text-gray-400">
                  Gerencie suas preferências e configurações
                </p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <p className="text-gray-400">Configurações em breve...</p>
              </div>
            </div>
          )}

          {/* Support */}
          {currentPage === "support" && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Suporte IaGenium
                </h2>
                <p className="text-gray-400">
                  Precisa de ajuda? Estamos aqui para você
                </p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="space-y-4">
                  {[
                    {
                      icon: <BarChart2 className="text-cyan-400 w-5 h-5" />,
                      title: "Documentação",
                      desc: "Aprenda a usar todas as funcionalidades",
                    },
                    {
                      icon: <TrendingUp className="text-purple-400 w-5 h-5" />,
                      title: "Tutoriais em Vídeo",
                      desc: "Assista nossos tutoriais passo a passo",
                    },
                    {
                      icon: <Headphones className="text-green-400 w-5 h-5" />,
                      title: "Suporte Direto",
                      desc: "Fale conosco via WhatsApp",
                    },
                  ].map(({ icon, title, desc }) => (
                    <div
                      key={title}
                      className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg"
                    >
                      {icon}
                      <div>
                        <h3 className="font-semibold text-white">{title}</h3>
                        <p className="text-gray-400 text-sm">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
