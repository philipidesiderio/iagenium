"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Bot,
  LogIn,
  ArrowRight,
  Clock,
  TrendingUp,
  Zap,
  Shield,
  MessageCircle,
  Calendar,
  Users,
  Check,
  Star,
  X,
} from "lucide-react"

export default function LandingPage() {
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (email && password) {
      localStorage.setItem("iagenium_logged_in", "true")
      localStorage.setItem("iagenium_user", email)
      router.push("/dashboard")
    }
  }

  const plans = [
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
      badge: "Básico",
      price: "R$ 107",
      description: "Chatbot Informativo",
      features: [
        "Respostas automáticas pré-configuradas",
        "Menu interativo (1, 2, 3)",
        "Atendimento padronizado",
      ],
      highlighted: false,
      popular: false,
      cta: "Começar Agora",
    },
    {
      icon: <Bot className="h-8 w-8 text-blue-600" />,
      badge: "Essencial",
      price: "R$ 167",
      description: "Chatbot com IA Integrada",
      features: [
        "Tudo do Básico",
        "Inteligência artificial avançada",
        "Mensagem personalizada",
        "Interações naturais",
      ],
      highlighted: false,
      popular: false,
      cta: "Começar Agora",
    },
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      badge: "Premium",
      price: "R$ 267",
      description: "Chatbot + Agendamento",
      features: [
        "Tudo do Essencial",
        "Agendamento automático",
        "Agenda integrada",
        "Confirmações automáticas",
      ],
      highlighted: true,
      popular: true,
      cta: "Começar Agora",
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      badge: "Master",
      price: "R$ 657",
      description: "Automação Total",
      features: [
        "Tudo do Premium",
        "Substitui 100% atendentes",
        "Integração pagamentos",
        "Plataformas externas",
      ],
      highlighted: false,
      popular: false,
      cta: "Começar Agora",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      badge: "Parceiro",
      price: null,
      title: "Seja um Revendedor",
      description: "Torne-se parceiro exclusivo",
      features: [
        "Comissões atrativas",
        "Suporte dedicado",
        "Material de vendas",
        "Treinamento completo",
      ],
      highlighted: false,
      popular: false,
      dashed: true,
      cta: "Seja um Revendedor",
    },
  ]

  const testimonials = [
    {
      initials: "MS",
      name: "Maria Silva",
      role: "CEO, TechSolutions",
      text: '"Aumentamos 3x nossas vendas em apenas 2 meses com a IaGenium. O chatbot funciona perfeitamente!"',
    },
    {
      initials: "JS",
      name: "João Santos",
      role: "Diretor, InnovaCorp",
      text: '"Eliminamos completamente a necessidade de atendentes. A economia foi impressionante!"',
    },
    {
      initials: "AC",
      name: "Ana Costa",
      role: "Fundadora, DigitalPro",
      text: '"O atendimento 24h revolucionou nosso negócio. Nunca mais perdemos um cliente!"',
    },
  ]

  const faqs = [
    {
      q: "Como funciona a integração?",
      a: "A integração é simples e rápida. Nossa equipe técnica configura tudo em até 24 horas, sem necessidade de conhecimento técnico da sua parte.",
    },
    {
      q: "Posso cancelar a qualquer momento?",
      a: "Sim, você pode cancelar sua assinatura a qualquer momento sem multas ou taxas adicionais. Oferecemos total flexibilidade.",
    },
    {
      q: "Há suporte técnico disponível?",
      a: "Oferecemos suporte técnico completo via WhatsApp, email e chat. Nossa equipe está disponível para ajudar sempre que precisar.",
    },
    {
      q: "Funciona em todas as plataformas?",
      a: "Sim, nosso chatbot funciona no WhatsApp, Instagram, Facebook, site e outras plataformas principais de atendimento.",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">IaGenium</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              {["beneficios", "planos", "depoimentos", "faq"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors capitalize"
                >
                  {section === "beneficios"
                    ? "Benefícios"
                    : section === "planos"
                      ? "Planos"
                      : section === "depoimentos"
                        ? "Depoimentos"
                        : "FAQ"}
                </button>
              ))}
            </nav>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setLoginModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent rounded-md font-medium transition-colors"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </button>
              <button
                onClick={() => scrollToSection("planos")}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
              >
                Assine Agora
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {loginModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative">
            <button
              onClick={() => setLoginModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                  <LogIn className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Acesse seu ChatBot
                </h2>
                <p className="text-gray-600">
                  Entre na sua conta para gerenciar seus chatbots
                </p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                >
                  Acessar ChatBot
                </button>
              </form>
              <div className="text-center space-y-2 mt-4">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Esqueceu sua senha?
                </a>
                <div className="text-sm text-gray-600">
                  Não tem conta?{" "}
                  <button
                    onClick={() => {
                      setLoginModalOpen(false)
                      scrollToSection("planos")
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Assine um plano
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section
        className="py-20 lg:py-32"
        style={{ background: "linear-gradient(to bottom, #dbeafe, #ffffff)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200 mb-6">
              ✨ Mais de 1.200 empresas já utilizam
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
              Automatize seu atendimento e{" "}
              <span className="text-blue-600">venda 3x mais</span> com ChatBot
              inteligente
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transforme visitantes em clientes automaticamente. Atendimento 24h
              que nunca dorme, nunca falha e sempre converte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => scrollToSection("planos")}
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 text-lg rounded-md transition-colors"
              >
                Assine Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { value: "+300%", label: "Aumento em vendas" },
                { value: "24/7", label: "Atendimento ativo" },
                { value: "1.200+", label: "Empresas confiam" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{value}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="beneficios" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              Por que escolher a IaGenium?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Resultados comprovados que transformam seu negócio
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
                title: "Atendimento 24/7",
                desc: "Nunca perca um cliente. Atendimento automático disponível 24 horas por dia, 7 dias por semana.",
              },
              {
                icon: (
                  <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                ),
                title: "+300% em Vendas",
                desc: "Aumento médio comprovado nas conversões dos nossos clientes em apenas 60 dias.",
              },
              {
                icon: <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
                title: "Resposta Instantânea",
                desc: "Atendimento em segundos que impressiona clientes e aumenta a satisfação.",
              },
              {
                icon: (
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                ),
                title: "Economia de 80%",
                desc: "Reduza custos operacionais eliminando a necessidade de equipe de atendimento.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="text-center bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                {icon}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="planos" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              Planos que se adaptam ao seu negócio
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para automatizar seu atendimento
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.badge}
                className={`relative bg-white rounded-lg p-6 hover:shadow-lg transition-shadow ${
                  plan.highlighted
                    ? "border-2 border-blue-500"
                    : plan.dashed
                      ? "border-2 border-dashed border-blue-500"
                      : "border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white font-semibold px-3 py-1 rounded text-sm">
                      Mais Popular
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  {plan.icon}
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      plan.dashed
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 text-gray-700"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
                {plan.price ? (
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {plan.price}
                  </h3>
                ) : (
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {plan.title}
                  </h3>
                )}
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <ul className="space-y-2 text-sm mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center">
                      <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors">
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600">
              Resultados reais de empresas que transformaram seu atendimento
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map(({ initials, name, role, text }) => (
              <div
                key={name}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">{initials}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
                    <p className="text-gray-600">{role}</p>
                  </div>
                </div>
                <div className="flex text-yellow-500 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Tire suas dúvidas sobre nossa solução
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-700">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Pronto para revolucionar seu atendimento?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Junte-se a mais de 1.200 empresas que já transformaram seus
            resultados com a IaGenium
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection("planos")}
              className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-md transition-colors"
            >
              Assine Agora - Grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="inline-flex items-center border border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg bg-transparent font-semibold rounded-md transition-colors">
              Falar com Especialista
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bot className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">IaGenium</span>
              </div>
              <p className="text-gray-600">
                Automatize seu atendimento e venda mais com inteligência
                artificial.
              </p>
            </div>
            {[
              {
                title: "Produto",
                links: ["Funcionalidades", "Integrações", "API"],
              },
              { title: "Empresa", links: ["Sobre", "Blog", "Carreiras"] },
              {
                title: "Suporte",
                links: ["Central de Ajuda", "Contato", "Status"],
              },
            ].map(({ title, links }) => (
              <div key={title}>
                <h3 className="font-semibold mb-4 text-gray-900">{title}</h3>
                <ul className="space-y-2 text-gray-600">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-gray-900 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 IaGenium. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
