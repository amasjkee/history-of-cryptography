"use client"

import type React from "react"

import { Download, Upload } from "lucide-react"
import type { CipherState } from "@/types/cipher"

interface ExportImportProps {
  cipherState: CipherState
  setCipherState: (state: CipherState | ((prev: CipherState) => CipherState)) => void
}

export default function ExportImport({ cipherState, setCipherState }: ExportImportProps) {
  const handleExport = () => {
    const dataStr = JSON.stringify(cipherState, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `cryptography-state-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string)
        setCipherState(imported)
        alert("Данные успешно импортированы!")
      } catch {
        alert("Ошибка при импорте данных. Проверьте формат файла.")
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
        title="Экспортировать данные"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline text-sm">Экспорт</span>
      </button>

      <label
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
        title="Импортировать данные"
      >
        <Upload className="w-4 h-4" />
        <span className="hidden sm:inline text-sm">Импорт</span>
        <input type="file" accept=".json" onChange={handleImport} className="hidden" />
      </label>
    </div>
  )
}
