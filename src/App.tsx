import { useState } from 'react';
import { Lock, BookOpen, Layers } from 'lucide-react';
import SubstitutionCipher from './components/SubstitutionCipher';
import CaesarCipher from './components/CaesarCipher';
import VigenereCipher from './components/VigenereCipher';
import AlbertiDisk from './components/AlbertiDisk';
import OtherCiphers from './components/OtherCiphers';
import TheorySection from './components/TheorySection';

type Tab = 'substitution' | 'caesar' | 'vigenere' | 'alberti' | 'other' | 'theory';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('substitution');

  const tabs = [
    { id: 'substitution' as Tab, label: 'Простая замена', icon: Lock },
    { id: 'caesar' as Tab, label: 'Цезарь', icon: Lock },
    { id: 'vigenere' as Tab, label: 'Виженер', icon: Lock },
    { id: 'alberti' as Tab, label: 'Диск Альберти', icon: Layers },
    { id: 'other' as Tab, label: 'Другие шифры', icon: Lock },
    { id: 'theory' as Tab, label: 'Теория', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CryptoBreaker</h1>
              <p className="text-sm text-gray-600">Инструменты для дешифровки учебных шифров</p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'substitution' && <SubstitutionCipher />}
        {activeTab === 'caesar' && <CaesarCipher />}
        {activeTab === 'vigenere' && <VigenereCipher />}
        {activeTab === 'alberti' && <AlbertiDisk />}
        {activeTab === 'other' && <OtherCiphers />}
        {activeTab === 'theory' && <TheorySection />}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-600">
            CryptoBreaker - Образовательный инструмент для изучения классической криптографии
          </p>
          <p className="text-center text-xs text-gray-500 mt-2">
            Разработано для студентов и преподавателей криптографии
          </p>
        </div>
      </footer>
    </div>
  );
}
