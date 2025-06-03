"use client"

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from '@radix-ui/react-separator'
import { Phone, ArrowRight, Facebook, Instagram, Linkedin } from 'lucide-react'
import Hotjar from '@hotjar/browser'

export default function ServicePage() {
  useEffect(() => {
    const siteId = 6419047
    const hotjarVersion = 6

    if (typeof window !== 'undefined') {
      Hotjar.init(siteId, hotjarVersion)
    }
  }, [])
  return (
    <div className="flex flex-col min-h-screen scroll-smooth font-sans">
      <header className="fixed top-0 w-full h-[116px] bg-white shadow-md z-50">
        <div className="container mx-auto h-full px-4">
          <div className="w-full h-full grid grid-cols-4 divide-x divide-gray-300">
            {/* Coluna 1: Logo */}
            <div className="flex items-center justify-start px-4">
              <Image src="/logo.png" alt="VisitSafe Logo" width={120} height={40} />
            </div>

            {/* Coluna 2: Home / Serviços */}
            <div className="flex flex-col text-sm font-medium text-center">
              <a
                href="#home"
                className="flex-1 flex items-center justify-center w-full h-full text-black hover:text-primary"
              >
                Home
              </a>
              <div className="border-t w-full border-gray-300" />
              <a
                href="#services"
                className="flex-1 flex items-center justify-center w-full h-full text-black hover:text-primary"
              >
                Serviços
              </a>
            </div>

            {/* Coluna 3: Acessar Conta / Criar Conta */}
            <div className="flex flex-col text-sm font-medium text-center">
              <Link
                href="/login"
                className="flex-1 flex items-center justify-center w-full h-full text-black hover:text-primary"
              >
                Acessar Conta
              </Link>
              <div className="border-t w-full border-gray-300" />
              <Link
                href="/register"
                className="flex-1 flex items-center justify-center w-full h-full text-black hover:text-primary"
              >
                Criar Conta
              </Link>
            </div>

            {/* Coluna 4: Contatar (estilizado) */}
            <a
              href="#contact"
              className="flex items-center justify-center text-sm font-medium text-center w-full h-full bg-black text-white hover:opacity-90 transition"
            >
              <Phone size={16} className="mr-2" />
              Contatar
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div id="home" className="pt-[116px]">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-[30px] px-4">
          {/* Imagem vertical - escondida no mobile */}
          <div className="hidden md:block mt-[100px] w-full max-w-[370px] max-h-[520px] lg:max-w-[420px] lg:max-h-[580px]">
            <Image
              src="/Frame 6.png"
              alt="Imagem Vertical"
              width={420}
              height={580}
              className="rounded-xl object-cover w-full h-auto"
            />
          </div>

          {/* Imagem horizontal - visível sempre */}
          <div className="mt-[240px] w-full max-w-[770px] max-h-[466px] lg:max-w-[850px] lg:max-h-[500px] mx-auto md:mx-0">
            <Image
              src="/Frame 7.png"
              alt="Imagem Horizontal"
              width={850}
              height={500}
              className="rounded-xl object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="w-full max-w-4xl mx-auto px-4 space-y-8 py-20">
        <h1 className="text-4xl font-bold mb-8 text-left">NOSSO SERVIÇO</h1>

        <div>
          <h2 className="text-lg font-semibold">CONTROLE DE ACESSOS</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Gerencie as entradas do seu condomínio com segurança e eficiência. Nosso sistema permite autorizações personalizadas, notificações em tempo real e histórico completo de acessos para maior tranquilidade de moradores e administradores.
          </p>
        </div>
        <Separator />

        <div>
          <h2 className="text-lg font-semibold">FACILIDADE NO AGENDAMENTO</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Agende liberações de visitantes com poucos toques. Moradores têm total autonomia para permitir acessos, enquanto a portaria conta com um sistema integrado para verificar e validar as entradas com rapidez.
          </p>
        </div>
        <Separator />

        <div>
          <h2 className="text-lg font-semibold">SEGURANÇA NA PORTARIA</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Apoie sua equipe com uma ferramenta que simplifica e fortalece o controle na portaria. Com registros digitais, alertas automáticos e integração com dispositivos de acesso, garantimos mais segurança com menos burocracia.
          </p>
        </div>
        <Separator />

        <div>
          <h2 className="text-lg font-semibold">RELATÓRIOS E MONITORAMENTO</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Acompanhe tudo o que acontece no seu condomínio com relatórios detalhados de acessos. Identifique padrões, receba alertas e tenha mais transparência na gestão da segurança condominial.
          </p>
        </div>
      </div>

      {/* Contact Section / Footer */}
      <footer id="contact" className="w-full bg-black text-white pt-20" style={{ height: '482px' }}>
        {/* Texto central */}
        <div className="text-center max-w-3xl mx-auto px-4">
          <p className="text-lg mb-6">
            Obrigado por escolher o VisitSafe para a gestão de acessos do seu condomínio. Estamos à disposição para ajudar você a garantir mais segurança e praticidade no seu dia a dia.
          </p>

          {/* Botão centralizado */}
          <a
            href="https://forms.gle/qhM7EHuEV1iMZT937"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center mx-auto bg-white text-black w-[270px] h-[60px] rounded-md hover:bg-gray-100 transition"
          >
            <span className="font-semibold mr-2">Contatar</span>
            <ArrowRight size={20} />
          </a>
        </div>

        {/* Logo + redes sociais */}
        <div className="container mx-auto flex justify-between items-center mt-[100px] px-4">
          {/* Logo branca */}
          <div>
            <Image src="/logo-white.png" alt="VisitSafe Logo White" width={120} height={40} />
          </div>

          {/* Redes sociais */}
          {/*<div className="flex gap-6">
            <a href="#" aria-label="Facebook" className="hover:text-gray-400 transition">
              <Facebook size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-400 transition">
              <Instagram size={24} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-400 transition">
              <Linkedin size={24} />
            </a>
          </div>*/}
        </div>

        {/* Linha separadora + direitos */}
        <div className="mt-[20px] border-t border-gray-700 w-full" />
        <div className="text-center text-xs mt-[20px] mb-[20px]">© 2025. All rights reserved</div>
      </footer>


    </div>
  )
}
