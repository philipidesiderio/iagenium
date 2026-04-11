import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IaGenium - Automatize seu atendimento e venda 3x mais",
  description:
    "Transforme visitantes em clientes automaticamente. Atendimento 24h que nunca dorme, nunca falha e sempre converte.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={geist.className}>{children}</body>
    </html>
  )
}
