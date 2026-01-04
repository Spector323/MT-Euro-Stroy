import { motion } from "motion/react";
import { ArrowRight, Menu, X, ChevronDown, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Показываем кнопку "наверх" после прокрутки на 300px
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const scrollToProperties = () => {
    const element = document.getElementById("properties");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Функция для получения оптимального фона на мобильных
  const getBackgroundImage = () => {
    if (isMobile) {
      // На мобильных используем изображение по центру с cover
      return {
        backgroundImage: `url(/1.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      };
    } else {
      // На десктопе оставляем как было
      return {
        backgroundImage: `url(/1.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      };
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-[#0a0a0a]/60 z-10" />
        <div
          className="absolute inset-0"
          style={getBackgroundImage()}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a] z-10" />
        
        {/* Overlay для лучшей читаемости текста на мобильных */}
        {isMobile && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
        )}
      </motion.div>

      {/* Navigation - без изменений */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-30 flex justify-between items-center px-6 sm:px-8 md:px-16 lg:px-24 py-5 sm:py-6 md:py-8"
      >
        {/* Logo */}
        <div className="text-xl sm:text-2xl tracking-wider">
          <span className="text-white">МТ Евро Строй</span>
          <span className="text-[#d4af37]">.</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-12 items-center">
          <a 
            href="#properties" 
            className="text-white/80 hover:text-[#d4af37] transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              scrollToProperties();
            }}
          >
            Жилые комплексы
          </a>
          <a href="#about" className="text-white/80 hover:text-[#d4af37] transition-colors duration-300">
            О нас
          </a>
          <a href="#contact" className="text-white/80 hover:text-[#d4af37] transition-colors duration-300">
            Контакты
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-300"
          >
            Записаться на показ
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center border border-white/20 hover:border-[#d4af37] transition-colors duration-300"
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5 text-white" />
          )}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay - оставляем как было */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-gradient-to-b from-[#0a0a0a] to-[#111111] border-l border-white/10 shadow-2xl"
          >
            {/* Menu Header with Close */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="text-lg font-medium text-white">
                Меню
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-300 group"
                aria-label="Закрыть меню"
              >
                <X className="w-5 h-5 text-white group-hover:text-[#d4af37] transition-colors duration-300" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-6">
              <nav className="flex flex-col space-y-6">
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  href="#properties"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToProperties();
                  }}
                  className="flex items-center text-xl text-white/90 hover:text-[#d4af37] transition-all duration-300 py-3 group"
                >
                  <div className="w-1 h-6 bg-[#d4af37] mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="font-medium">Жилые комплексы</span>
                </motion.a>

                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  href="#about"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center text-xl text-white/90 hover:text-[#d4af37] transition-all duration-300 py-3 group"
                >
                  <div className="w-1 h-6 bg-[#d4af37] mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="font-medium">О нас</span>
                </motion.a>

                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center text-xl text-white/90 hover:text-[#d4af37] transition-all duration-300 py-3 group"
                >
                  <div className="w-1 h-6 bg-[#d4af37] mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="font-medium">Контакты</span>
                </motion.a>
              </nav>

              {/* Call to Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-10 pt-6 border-t border-white/10"
              >
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full px-6 py-4 bg-gradient-to-r from-[#d4af37] to-[#c9a42e] text-[#0a0a0a] hover:from-[#c9a42e] hover:to-[#bf9928] transition-all duration-300 text-center font-semibold rounded-sm shadow-lg shadow-[#d4af37]/20"
                >
                  Записаться на показ
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Hero Content - без изменений */}
      <div className="relative z-20 flex flex-col items-center justify-center h-[calc(100vh-100px)] px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-center max-w-4xl lg:max-w-5xl"
        >
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#d4af37] tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm font-medium"
          >
            ЭЛИТНАЯ НЕДВИЖИМОСТЬ
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="mb-4 sm:mb-6 md:mb-8 leading-snug sm:leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold"
          >
            Современная архитектура
            <br className="hidden sm:block" />
            и вечная элегантность
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="text-white/70 mb-6 sm:mb-8 md:mb-12 max-w-md sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-2 sm:px-0"
          >
            Откройте для себя исключительные жилые пространства, созданные для тех,
            кто ценит лучшее в жизни. Каждая деталь доведена до совершенства.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center"
          >
            {/* Primary Button */}
            <button
              onClick={scrollToProperties}
              className="group px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c49d2e] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-lg sm:shadow-xl shadow-[#d4af37]/20 text-sm sm:text-base font-medium w-full sm:w-auto min-w-[200px] sm:min-w-[220px]"
            >
              <span>Смотреть объекты</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Secondary Button */}
            <button className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 border border-white/20 text-white hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-300 backdrop-blur-sm text-sm sm:text-base font-medium w-full sm:w-auto min-w-[200px] sm:min-w-[220px]">
              Виртуальный тур
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 hidden sm:block cursor-pointer"
          onClick={scrollToProperties}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-[#d4af37] rounded-full" />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:hidden"
        >
          <ChevronDown className="w-5 h-5 text-white/50 animate-bounce" />
        </motion.div>
      </div>

      {/* Кнопка "Наверх" */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-30 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-[#d4af37] to-[#c9a42e] text-[#0a0a0a] hover:from-[#c9a42e] hover:to-[#bf9928] transition-all duration-300 shadow-lg shadow-[#d4af37]/30 hover:shadow-xl hover:shadow-[#d4af37]/40 group"
        aria-label="Вернуться наверх"
      >
        <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-y-0.5 transition-transform duration-300" />
        
        {/* Tooltip on hover */}
        <div className="absolute right-full mr-3 px-3 py-2 bg-[#0a0a0a] border border-white/10 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Наверх
        </div>
      </motion.button>
    </section>
  );
}