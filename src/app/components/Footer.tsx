import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-12 sm:py-16 px-5 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Добавляем Яндекс Карту перед основными колонками */}
        <div className="mb-10 sm:mb-12">
          <p className="text-white mb-4 sm:mb-6 text-lg sm:text-xl text-sm">Наш офис на карте</p>
          <div className="border border-white/10 rounded-lg overflow-hidden">
            <iframe 
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A2df4b6b6024aef858bd52399c443a165bbce88167fdd2a4890c740fd15f0be56&amp;source=constructor" 
              width="100%" 
              height="400" 
              frameBorder="0"
              className="w-full"
              title="Яндекс Карта - Офис МТ Евро Строй"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-white/60 mt-3 text-sm">
            ул. Нурсултана Назарбаева, 3Б, Магас
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div>
            <div className="text-xl sm:text-2xl tracking-wider mb-4 sm:mb-6">
              <span className="text-white">МТ Евро Строй</span>
              <span className="text-[#d4af37]">.</span>
            </div>
            <p className="text-white/60 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
              Создаём исключительные жилые пространства для взыскательных людей и семей.
            </p>
            <div className="flex gap-8 sm:gap-8 ">
              {/* WhatsApp */}
              <a
                href="https://wa.me/79280935333"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 border border-white/20 hover:border-green-500 flex items-center justify-center transition-colors duration-300 group"
                title="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 group-hover:text-green-500 transition-colors duration-300">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/mutalievskiy_zhk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 border border-white/20 hover:border-pink-500 flex items-center justify-center transition-colors duration-300 group"
                title="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 group-hover:text-pink-500 transition-colors duration-300">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>

              {/* Телефон */}
              <a
                href="tel:+79280935333"
                className="w-9 h-9 sm:w-10 sm:h-10 border border-white/20 hover:border-blue-500 flex items-center justify-center transition-colors duration-300 group"
                title="Позвонить"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 group-hover:text-blue-500 transition-colors duration-300">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:stroyinvesting@mail.ru"
                className="w-9 h-9 sm:w-10 sm:h-10 border border-white/20 hover:border-red-500 flex items-center justify-center transition-colors duration-300 group"
                title="Написать на email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 group-hover:text-red-500 transition-colors duration-300">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 sm:mb-6 text-white text-sm sm:text-base">Быстрые ссылки</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#properties" className="text-white/60 hover:text-[#d4af37] transition-colors duration-300 text-sm sm:text-base">
                  Жилые комплексы
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/60 hover:text-[#d4af37] transition-colors duration-300 text-sm sm:text-base">
                  О нас
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/60 hover:text-[#d4af37] transition-colors duration-300 text-sm sm:text-base">
                  Контакты
                </a>
              </li>
              <li>
                <button className="text-white/60 hover:text-[#d4af37] transition-colors duration-300 text-sm sm:text-base">
                  Виртуальные туры
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 sm:mb-6 text-white text-sm sm:text-base">Услуги</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <button className="text-white/60 hover:text-[#d4af37] transition-colors duration-300 text-sm sm:text-base">
                  Продажа недвижимости
                </button>
              </li>
              <li>
                <button className="text-white/60 hover:text-[#d4af37] transition-colors duration-300 text-sm sm:text-base">
                  Инвестиционный консалтинг
                </button>
              </li>
              <li>
                <button className="text-white/60 hover:text-[#d4af37] transition-colors duration-300 text-sm sm:text-base">
                  Управление недвижимостью
                </button>
              </li>
              <li>
                <button className="text-white/60 hover:text-[#d4af37] transition-colors duration-300 text-sm sm:text-base">
                  Послепродажная поддержка
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 sm:mb-6 text-white text-sm sm:text-base">Будьте в курсе</h4>
            <p className="text-white/60 mb-3 sm:mb-4 text-sm sm:text-base">
              Подпишитесь, чтобы получать эксклюзивные новости о новых проектах.
            </p>
            {isSubscribed ? (
              <div className="p-3 border border-[#d4af37] text-[#d4af37] text-sm sm:text-base">
                Спасибо за подписку!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2 sm:gap-3">
                <input
                  type="email"
                  placeholder="Ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 focus:border-[#d4af37] text-white placeholder:text-white/40 outline-none transition-colors duration-300 text-sm sm:text-base"
                  required
                />
                <button
                  type="submit"
                  className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c49d2e] transition-colors duration-300 text-sm sm:text-base"
                >
                  Подписаться
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm">
          <div className="text-white/40 text-center md:text-left">
            © 2025 МТ Евро Строй. Все права защищены.
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-white/40">
            <button className="hover:text-[#d4af37] transition-colors duration-300">
              Политика конфиденциальности
            </button>
            <button className="hover:text-[#d4af37] transition-colors duration-300">
              Условия использования
            </button>
            <button className="hover:text-[#d4af37] transition-colors duration-300">
              Карта сайта
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}