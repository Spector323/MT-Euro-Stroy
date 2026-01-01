import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
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
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 border border-white/20 hover:border-[#d4af37] flex items-center justify-center transition-colors duration-300 group"
              >
                <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 group-hover:text-[#d4af37] transition-colors duration-300" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 border border-white/20 hover:border-[#d4af37] flex items-center justify-center transition-colors duration-300 group"
              >
                <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 group-hover:text-[#d4af37] transition-colors duration-300" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 border border-white/20 hover:border-[#d4af37] flex items-center justify-center transition-colors duration-300 group"
              >
                <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 group-hover:text-[#d4af37] transition-colors duration-300" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 border border-white/20 hover:border-[#d4af37] flex items-center justify-center transition-colors duration-300 group"
              >
                <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 group-hover:text-[#d4af37] transition-colors duration-300" />
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
