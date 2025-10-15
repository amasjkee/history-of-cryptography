import { useState } from 'react';
import { Lock, BookOpen, Layers } from 'lucide-react';
import SubstitutionCipher from './components/SubstitutionCipher';
import CaesarCipher from './components/CaesarCipher';
import VigenereCipher from './components/VigenereCipher';
import AlbertiDisk from './components/AlbertiDisk';
import OtherCiphers from './components/OtherCiphers';
import TheorySection from './components/TheorySection';
import { CipherState } from './types/cipher';

type Tab = 'substitution' | 'caesar' | 'vigenere' | 'alberti' | 'other' | 'theory';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('substitution');
  const [cipherState, setCipherState] = useState<CipherState>({
    substitution: {
      ciphertext: '',
      mapping: {},
      enforceUnique: false,
      includeSpecial: false
    },
    caesar: {
      ciphertext: '',
      shift: 3
    },
    vigenere: {
      ciphertext: '',
      key: ''
    },
    alberti: {
      ciphertext: '',
      outerRotation: 0,
      innerRotation: 0,
      mode: 'decrypt'
    },
    other: {
      atbash: {
        text: ''
      },
      railfence: {
        ciphertext: '',
        rails: 3
      },
      affine: {
        ciphertext: '',
        a: 5,
        b: 8
      },
      rot13: {
        text: ''
      },
      playfair: {
        ciphertext: '',
        key: ''
      },
      polybius: {
        ciphertext: ''
      }
    }
  });

  const tabs = [
    { id: 'substitution' as Tab, label: 'Простая замена', icon: Lock },
    { id: 'caesar' as Tab, label: 'Цезарь', icon: Lock },
    { id: 'vigenere' as Tab, label: 'Виженер', icon: Lock },
    { id: 'alberti' as Tab, label: 'Диск Альберти', icon: Layers },
    { id: 'other' as Tab, label: 'Другие шифры', icon: Lock },
    { id: 'theory' as Tab, label: 'Теория', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-black text-slate-200">
      <header className="bg-black border-b border-slate-700 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">История криптографии</h1>
              <p className="text-sm text-slate-400">Инструменты для дешифровки учебных шифров</p>
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
                      ? 'bg-slate-100 text-slate-900 shadow-md'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
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
        {activeTab === 'substitution' && (
          <SubstitutionCipher state={cipherState.substitution} setState={setCipherState} />
        )}
        {activeTab === 'caesar' && <CaesarCipher state={cipherState.caesar} setState={setCipherState} />}
        {activeTab === 'vigenere' && (
          <VigenereCipher state={cipherState.vigenere} setState={setCipherState} />
        )}
        {activeTab === 'alberti' && <AlbertiDisk state={cipherState.alberti} setState={setCipherState} />}
        {activeTab === 'other' && <OtherCiphers state={cipherState.other} setState={setCipherState} />}
        {activeTab === 'theory' && <TheorySection />}
      </main>


    </div>
  );
}
