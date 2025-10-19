"use client"

import { useState } from "react"
import { Lock, BookOpen, Layers, History, Trophy, HelpCircle } from "lucide-react"
import SubstitutionCipher from "@/components/SubstitutionCipher"
import CaesarCipher from "@/components/CaesarCipher"
import VigenereCipher from "@/components/VigenereCipher"
import AlbertiDisk from "@/components/AlbertiDisk"
import OtherCiphers from "@/components/OtherCiphers"
import TheorySection from "@/components/TheorySection"
import TimelineSection from "@/components/TimelineSection"
import ComparisonTool from "@/components/ComparisonTool"
import ChallengesSection from "@/components/ChallengesSection"
import ExportImport from "@/components/ExportImport"
import HelpTutorial from "@/components/HelpTutorial"
import type { CipherState } from "@/types/cipher"
import { ThemeToggle } from "@/components/ThemeToggle"

type Tab =
  | "substitution"
  | "caesar"
  | "vigenere"
  | "alberti"
  | "other"
  | "theory"
  | "timeline"
  | "comparison"
  | "challenges"
  | "help"

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("substitution")
  const [cipherState, setCipherState] = useState<CipherState>({
    substitution: {
      ciphertext: "",
      mapping: {},
      enforceUnique: false,
      includeSpecial: false,
    },
    caesar: {
      ciphertext: "",
      shift: 3,
    },
    vigenere: {
      ciphertext: "",
      key: "",
    },
    alberti: {
      ciphertext: "",
      outerRotation: 0,
      innerRotation: 0,
      mode: "decrypt",
    },
    other: {
      atbash: {
        text: "",
      },
      railfence: {
        ciphertext: "",
        rails: 3,
      },
      affine: {
        ciphertext: "",
        a: 5,
        b: 8,
      },
      rot13: {
        text: "",
      },
      playfair: {
        ciphertext: "",
        key: "",
      },
      polybius: {
        ciphertext: "",
      },
    },
  })

  const tabs = [
    { id: "substitution" as Tab, label: "Простая замена", icon: Lock, category: "ciphers" },
    { id: "caesar" as Tab, label: "Цезарь", icon: Lock, category: "ciphers" },
    { id: "vigenere" as Tab, label: "Виженер", icon: Lock, category: "ciphers" },
    { id: "alberti" as Tab, label: "Диск Альберти", icon: Layers, category: "ciphers" },
    { id: "other" as Tab, label: "Другие шифры", icon: Lock, category: "ciphers" },
    { id: "timeline" as Tab, label: "История", icon: History, category: "learning" },
    { id: "comparison" as Tab, label: "Сравнение", icon: Layers, category: "learning" },
    { id: "theory" as Tab, label: "Теория", icon: BookOpen, category: "learning" },
    { id: "challenges" as Tab, label: "Задачи", icon: Trophy, category: "practice" },
    { id: "help" as Tab, label: "Помощь", icon: HelpCircle, category: "other" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">История криптографии</h1>
                <p className="text-sm text-muted-foreground">Инструменты для дешифровки учебных шифров</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ExportImport cipherState={cipherState} setCipherState={setCipherState} />
              <ThemeToggle />
            </div>
          </div>

          <nav className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "substitution" && (
          <SubstitutionCipher state={cipherState.substitution} setState={setCipherState} />
        )}
        {activeTab === "caesar" && <CaesarCipher state={cipherState.caesar} setState={setCipherState} />}
        {activeTab === "vigenere" && <VigenereCipher state={cipherState.vigenere} setState={setCipherState} />}
        {activeTab === "alberti" && <AlbertiDisk state={cipherState.alberti} setState={setCipherState} />}
        {activeTab === "other" && <OtherCiphers state={cipherState.other} setState={setCipherState} />}
        {activeTab === "theory" && <TheorySection />}
        {activeTab === "timeline" && <TimelineSection />}
        {activeTab === "comparison" && <ComparisonTool />}
        {activeTab === "challenges" && <ChallengesSection />}
        {activeTab === "help" && <HelpTutorial />}
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>История криптографии - Образовательный проект для изучения классических шифров</p>
          <p className="mt-2">© 2025 Все права защищены</p>
        </div>
      </footer>
    </div>
  )
}
