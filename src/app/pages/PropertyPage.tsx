import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  MapPin,
  Home,
  Calendar,
  Building2,
  Car,
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Building,
  Ruler,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { properties } from "../data/properties";

export function PropertyPage() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === Number(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  // Функции для свайпа
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50; // минимальная дистанция свайпа
    
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Свайп влево → следующее фото
        nextImage();
      } else {
        // Свайп вправо → предыдущее фото
        prevImage();
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4">
        <div className="text-4xl mb-4">🏢</div>
        <h1 className="text-2xl mb-4 text-center">Объект не найден</h1>
        <Link 
          to="/" 
          className="flex items-center gap-2 text-[#d4af37] hover:text-[#c49d2e] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Вернуться на главную
        </Link>
      </div>
    );
  }

  const nextImage = () =>
    setCurrentImageIndex((i) =>
      i + 1 === property.gallery.length ? 0 : i + 1
    );

  const prevImage = () =>
    setCurrentImageIndex((i) =>
      i === 0 ? property.gallery.length - 1 : i - 1
    );

  const nextLightboxImage = () => {
    const nextIndex = (currentImageIndex + 1) % property.gallery.length;
    setCurrentImageIndex(nextIndex);
    setActiveImage(property.gallery[nextIndex]);
  };

  const prevLightboxImage = () => {
    const prevIndex = currentImageIndex === 0 ? property.gallery.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setActiveImage(property.gallery[prevIndex]);
  };

  const displayedFeatures = showAllFeatures 
    ? property.features 
    : property.features?.slice(0, 4);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 to-transparent pt-4 px-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-[#d4af37] bg-black/50 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/10 hover:border-[#d4af37]/50 transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
        {/* LEFT — PHOTO */}
        <div 
          ref={imageRef}
          className="relative h-[60vh] sm:h-[70vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.img
            key={currentImageIndex}
            src={property.gallery[currentImageIndex]}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            onClick={() => setActiveImage(property.gallery[currentImageIndex])}
            draggable="false"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70" />

          {/* Desktop Back Button */}
          <Link
            to="/"
            className="hidden lg:flex absolute top-6 left-6 z-30 items-center gap-2 text-[#d4af37] bg-black/50 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/10 hover:border-[#d4af37]/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </Link>

          {property.gallery.length > 1 && (
            <>
              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 bg-black/60 border border-white/20 hover:border-[#d4af37] transition-all flex items-center justify-center rounded-full active:scale-95"
                aria-label="Предыдущее фото"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 bg-black/60 border border-white/20 hover:border-[#d4af37] transition-all flex items-center justify-center rounded-full active:scale-95"
                aria-label="Следующее фото"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Image Counter */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
                {currentImageIndex + 1} / {property.gallery.length}
              </div>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {property.gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`h-2 rounded-full transition-all ${i === currentImageIndex
                        ? "bg-[#d4af37] w-6 sm:w-8"
                        : "bg-white/40 w-2 hover:bg-white/60"
                      }`}
                    aria-label={`Перейти к фото ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* RIGHT — CONTENT */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 lg:py-16">
          {/* Status Badge */}
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="px-3 sm:px-4 py-1 border border-[#d4af37] text-[#d4af37] text-xs sm:text-sm font-medium">
              {property.status}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 font-bold leading-tight">
            {property.name}
          </h1>

          {/* Location */}
          <div className="flex items-center gap-2 text-white/60 mb-4 sm:mb-6 text-sm sm:text-base">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Price */}
          <div className="text-[#d4af37] text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 font-bold">
            {property.price}
          </div>

          {/* Description */}
          <div className="space-y-4 sm:space-y-5 text-white/75 leading-relaxed mb-8 sm:mb-12 text-sm sm:text-base">
            {property.description.map((text, i) => {
              const isAccent = text.startsWith("Поторопитесь");

              return (
                <p
                  key={i}
                  className={
                    isAccent
                      ? "text-[#d4af37] font-medium bg-[#d4af37]/5 px-4 py-3 rounded-lg border border-[#d4af37]/20"
                      : ""
                  }
                >
                  {isAccent && <span className="font-semibold">* </span>}
                  {text}
                </p>
              );
            })}
          </div>

          {/* MAIN INFO */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16">
            <Info icon={Building} label="Квартир" value={property.units} />
            <Info icon={Ruler} label="Площадь" value={property.size} />
            <Info icon={Home} label="Спальни" value={property.specs.bedrooms} />
            <Info icon={Building2} label="Ванные" value={property.specs.bathrooms} />
            <Info icon={Car} label="Парковка" value={property.specs.parking} />
            <Info icon={Calendar} label="Год сдачи" value={property.specs.year} />
          </div>

          {/* FEATURES */}
          {property.features?.length > 0 && (
            <div className="mb-12 sm:mb-16 md:mb-20">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl text-[#d4af37] font-bold">
                  Особенности жилого комплекса
                </h2>
                
                {isMobile && property.features.length > 4 && (
                  <button
                    onClick={() => setShowAllFeatures(!showAllFeatures)}
                    className="flex items-center gap-1 text-[#d4af37] text-sm"
                  >
                    {showAllFeatures ? (
                      <>
                        <span>Скрыть</span>
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>Все</span>
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {displayedFeatures.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-white/70 text-sm sm:text-base p-3 sm:p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <span className="w-2 h-2 sm:w-1.5 sm:h-1.5 bg-[#d4af37] rotate-45 flex-shrink-0 mt-1.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* PLANS */}
          {property.plans && (
            <div className="mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-10 text-[#d4af37] font-bold">
                Планировки квартир
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {property.plans.map((plan, i) => (
                  <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
                    <img
                      src={plan}
                      onClick={() => setActivePlan(plan)}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover cursor-pointer"
                      alt={`Планировка ${i + 1}`}
                    />
                    
                    <div className="p-4 sm:p-6">
                      <a
                        href={plan}
                        download={`${property.name}-plan-${i + 1}.jpg`}
                        className="flex items-center justify-center gap-2 text-[#d4af37] hover:text-[#c49d2e] transition-colors text-sm sm:text-base font-medium"
                      >
                        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                        Скачать план
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Button for Mobile */}
          {isMobile && (
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent z-30">
              <a
                href="#contact"
                className="block w-full px-6 py-4 bg-gradient-to-r from-[#d4af37] to-[#c9a42e] text-[#0a0a0a] hover:from-[#c9a42e] hover:to-[#bf9928] transition-all duration-300 text-center font-semibold rounded-lg shadow-lg shadow-[#d4af37]/20 active:scale-95"
              >
                Записаться на просмотр
              </a>
            </div>
          )}
        </div>
      </div>

      {/* LIGHTBOX FOR MAIN IMAGES */}
      <AnimatePresence>
        {activeImage && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/95 z-50 cursor-pointer"
              onClick={() => setActiveImage(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/20 hover:border-[#d4af37] rounded-full transition-colors z-50"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Navigation in Lightbox */}
              {property.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevLightboxImage}
                    className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/20 hover:border-[#d4af37] rounded-full transition-colors"
                    aria-label="Предыдущее фото"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  <button
                    onClick={nextLightboxImage}
                    className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/20 hover:border-[#d4af37] rounded-full transition-colors"
                    aria-label="Следующее фото"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </>
              )}

              <motion.img
                key={activeImage}
                src={activeImage}
                className="max-h-[80vh] max-w-[90vw] sm:max-h-[85vh] sm:max-w-[85vw] rounded-lg shadow-2xl object-contain"
                alt="Увеличенное фото объекта"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  WebkitTouchCallout: 'default',
                  touchAction: isMobile ? 'pan-y pinch-zoom' : 'auto'
                }}
              />
              
              {/* Image counter in lightbox */}
              {property.gallery.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                  {currentImageIndex + 1} / {property.gallery.length}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
        
      {/* LIGHTBOX FOR PLANS */}
      <AnimatePresence>
        {activePlan && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/95 z-50 cursor-pointer"
              onClick={() => setActivePlan(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setActivePlan(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/20 hover:border-[#d4af37] rounded-full transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <img
                src={activePlan}
                className="max-h-[80vh] max-w-[90vw] sm:max-h-[85vh] sm:max-w-[85vw] rounded-lg shadow-2xl object-contain"
                alt="Увеличенный план квартиры"
                onClick={(e) => e.stopPropagation()}
                style={{
                  WebkitTouchCallout: 'default',
                  touchAction: isMobile ? 'pan-y pinch-zoom' : 'auto'
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="p-3 sm:p-4 md:p-5 border border-white/10 rounded-lg hover:border-[#d4af37]/30 transition-colors bg-white/5">
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[#d4af37]/30 rounded-lg">
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37]" />
        </div>
        <div className="text-xs sm:text-sm text-white/60">{label}</div>
      </div>
      <div className="text-base sm:text-lg md:text-xl font-semibold">{value}</div>
    </div>
  );
}