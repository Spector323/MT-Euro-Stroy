import { motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
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
        <div className="absolute inset-0 bg-[#0a0a0a]/70 z-10" />
        <div
          className="h-[120vh] w-full bg-cover bg-center bg-[url(./public/1.jpg)]"

        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/40 to-[#0a0a0a] z-10" />
      </motion.div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-30 flex justify-between items-center px-5 sm:px-8 md:px-16 lg:px-24 py-6 md:py-8"
      >
        <div className="text-xl sm:text-2xl tracking-wider">
          <span className="text-white">МТ Евро Строй</span>
          <span className="text-[#d4af37]">.</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-12 items-center">
          <a href="#properties" className="text-white/80 hover:text-[#d4af37] transition-colors duration-300">
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
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5 text-white" />
          )}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-[#0a0a0a]/98 backdrop-blur-xl z-40 lg:hidden border-l border-white/10"
      >
        <div className="flex flex-col h-full p-8 pt-24">
          <nav className="flex flex-col gap-8">
            <a
              href="#properties"
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl text-white/80 hover:text-[#d4af37] transition-colors duration-300"
            >
              Недвижимость
            </a>
            <a
              href="#about"
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl text-white/80 hover:text-[#d4af37] transition-colors duration-300"
            >
              О нас
            </a>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl text-white/80 hover:text-[#d4af37] transition-colors duration-300"
            >
              Контакты
            </a>
          </nav>

          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-12 px-8 py-4 border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-300 text-center"
          >
            Записаться на показ
          </a>
        </div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-[calc(100vh-100px)] px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-center max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#d4af37] tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6 text-xs sm:text-sm"
          >
            ЭЛИТНАЯ НЕДВИЖИМОСТЬ
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="mb-6 sm:mb-8 leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Современная архитектура
            <br />
            и вечная элегантность
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="text-white/70 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-4"
          >
            Откройте для себя исключительные жилые пространства, созданные для тех,
            кто ценит лучшее в жизни. Каждая деталь доведена до совершенства.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center px-4"
          >
            <button
              onClick={scrollToProperties}
              className="group px-8 sm:px-10 py-4 sm:py-5 bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c49d2e] transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-[#d4af37]/20 text-sm sm:text-base"
            >
              <span>Смотреть объекты</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="px-8 sm:px-10 py-4 sm:py-5 border-2 border-white/20 text-white hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-300 backdrop-blur-sm text-sm sm:text-base">
              Виртуальный тур
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 hidden sm:block cursor-pointer"
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
      </div>
    </section>
  );
}
