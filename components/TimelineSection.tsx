"use client"

import { Calendar, User, MapPin, Scroll } from "lucide-react"

interface TimelineEvent {
  year: string
  title: string
  description: string
  person?: string
  location?: string
  cipher?: string
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1900 до н.э.",
    title: "Древний Египет",
    description: "Первые известные примеры шифрования в иероглифах на гробницах.",
    location: "Египет",
  },
  {
    year: "500 до н.э.",
    title: "Скитала",
    description: "Спартанцы использовали транспозиционный шифр с помощью деревянного стержня.",
    location: "Древняя Греция",
    cipher: "Транспозиция",
  },
  {
    year: "100-44 до н.э.",
    title: "Шифр Цезаря",
    description: "Юлий Цезарь использовал простой шифр сдвига для военной переписки.",
    person: "Юлий Цезарь",
    location: "Древний Рим",
    cipher: "Моноалфавитная замена",
  },
  {
    year: "800-873",
    title: "Частотный анализ",
    description: "Аль-Кинди разработал метод частотного анализа для взлома шифров.",
    person: "Аль-Кинди",
    location: "Багдад",
  },
  {
    year: "1467",
    title: "Диск Альберти",
    description: "Леон Баттиста Альберти изобрел первый полиалфавитный шифр.",
    person: "Леон Баттиста Альберти",
    location: "Италия",
    cipher: "Полиалфавитная замена",
  },
  {
    year: "1553",
    title: "Шифр Виженера",
    description: "Джован Баттиста Беллазо создал шифр, позже названный в честь Виженера.",
    person: "Джован Баттиста Беллазо",
    location: "Италия",
    cipher: "Полиалфавитная замена",
  },
  {
    year: "1854",
    title: "Шифр Плейфера",
    description: "Чарльз Уитстон изобрел биграммный шифр замены.",
    person: "Чарльз Уитстон",
    location: "Англия",
    cipher: "Биграммная замена",
  },
  {
    year: "1918",
    title: "ADFGVX",
    description: "Немецкий полевой шифр, использовавшийся в Первой мировой войне.",
    location: "Германия",
    cipher: "Комбинированный",
  },
  {
    year: "1918",
    title: "Enigma",
    description: "Артур Шербиус изобрел роторную шифровальную машину Enigma.",
    person: "Артур Шербиус",
    location: "Германия",
    cipher: "Роторный",
  },
  {
    year: "1939-1945",
    title: "Взлом Enigma",
    description: "Алан Тьюринг и команда в Блетчли-парке взломали Enigma.",
    person: "Алан Тьюринг",
    location: "Блетчли-парк, Англия",
  },
  {
    year: "1976",
    title: "Диффи-Хеллман",
    description: "Изобретение криптографии с открытым ключом.",
    person: "Уитфилд Диффи, Мартин Хеллман",
    location: "США",
  },
  {
    year: "1977",
    title: "RSA",
    description: "Ривест, Шамир и Адлеман создали алгоритм RSA.",
    person: "Рон Ривест, Ади Шамир, Леонард Адлеман",
    location: "США",
    cipher: "Асимметричное шифрование",
  },
]

export default function TimelineSection() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-bold">Хронология криптографии</h2>
        </div>
        <p className="text-muted-foreground">
          От древних шифров до современной криптографии - путешествие длиной в тысячелетия
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-8">
          {timelineEvents.map((event, index) => (
            <div key={index} className="relative pl-20">
              <div className="absolute left-5 top-2 w-6 h-6 rounded-full bg-primary border-4 border-background" />

              <div className="bg-card rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    <Calendar className="w-3 h-3" />
                    {event.year}
                  </span>
                  {event.cipher && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                      <Scroll className="w-3 h-3" />
                      {event.cipher}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-muted-foreground mb-3">{event.description}</p>

                <div className="flex flex-wrap gap-4 text-sm">
                  {event.person && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{event.person}</span>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
