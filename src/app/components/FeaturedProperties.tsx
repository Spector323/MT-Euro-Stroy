import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, MapPin, Home, Maximize, Filter, X } from "lucide-react";
import { Link } from "react-router-dom";
import { properties, Property } from "../data/properties";

const categories = ["Все", "В продаже", "Предзаказ", "Премиум", "Элитный"];

function PropertyCard({
  property,
  index,
}: {
  property: Property;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-[350px] md:min-h-[600px] overflow-hidden rounded-lg md:rounded-none"
    >
      <Link to={`/properties/${property.id}`} className="block h-full">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6 }}
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${property.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90" />
        </div>

        <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 md:p-8">
          <span className="text-[#d4af37] text-xs sm:text-sm mb-2 font-medium">
            {property.status}
          </span>

          <h3 className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 font-semibold leading-tight">
            {property.name}
          </h3>

          <div className="flex items-center gap-1.5 sm:gap-2 text-white/60 mb-2 sm:mb-3 text-xs sm:text-sm">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate">{property.location}</span>
          </div>

          <div className="text-[#d4af37] text-base sm:text-lg md:text-xl mb-3 sm:mb-4 font-bold">
            {property.price}
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-6 mb-4 sm:mb-6">
            <div className="flex items-center gap-1.5 sm:gap-2 text-sm">
              <Home className="w-3 h-3 sm:w-4 sm:h-4 text-[#d4af37]" />
              <span>{property.units}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-sm">
              <Maximize className="w-3 h-3 sm:w-4 sm:h-4 text-[#d4af37]" />
              <span>{property.size}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-[#d4af37] text-sm sm:text-base">
            <span>Подробнее</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedProperties() {
  const [filter, setFilter] = useState("Все");
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredProperties = properties.filter((property) => {
    if (filter === "Все") return true;
    return property.status === filter;
  });

  return (
    <section
      id="properties"
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-[#0a0a0a]"
    >
      {/* Header + Filters */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12 md:mb-16">
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 sm:w-10 md:w-12 h-[1.5px] sm:h-[2px] bg-[#d4af37]" />
              <span className="text-[#d4af37] tracking-[0.2em] sm:tracking-[0.25em] text-[10px] sm:text-xs font-medium">
                ИЗБРАННЫЕ ПРОЕКТЫ
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="space-y-2 sm:space-y-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                  Исключительные дома
                </h2>
                <p className="text-white/60 text-sm sm:text-base max-w-xl leading-relaxed">
                  Каждый объект отражает архитектурное совершенство
                  и утончённый образ жизни.
                </p>
              </div>
              
              {/* Filter Button - Mobile & Desktop */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 border border-white/20 hover:border-[#d4af37] transition-colors w-full sm:w-auto text-sm sm:text-base"
                >
                  <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37]" />
                  <span className="truncate">{filter}</span>
                  {showFilters && isMobile && (
                    <X className="w-3.5 h-3.5 ml-auto" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Filter Dropdown */}
          {showFilters && (
            <>
              {/* Mobile Overlay */}
              {isMobile && (
                <div 
                  className="fixed inset-0 bg-black/50 z-40"
                  onClick={() => setShowFilters(false)}
                />
              )}
              
              <div className={`
                ${isMobile 
                  ? 'fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-h-[70vh] overflow-y-auto rounded-lg' 
                  : 'absolute right-0 mt-2 z-20 w-48'}
                bg-[#0a0a0a] border border-white/10 shadow-lg
              `}>
                <div className="p-1">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setFilter(c);
                        setShowFilters(false);
                      }}
                      className={`
                        block w-full text-left px-4 py-3 
                        hover:bg-white/5 active:bg-white/10
                        transition-colors text-sm sm:text-base
                        ${filter === c 
                          ? 'text-[#d4af37] bg-white/5' 
                          : 'text-white/70'
                        }
                      `}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {filteredProperties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={index}
            />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12 sm:py-16 md:py-24">
            <p className="text-white/60 text-lg sm:text-xl">
              Нет объектов по выбранному фильтру
            </p>
          </div>
        )}
      </div>
    </section>
  );
}