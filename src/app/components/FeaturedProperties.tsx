import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight, MapPin, Home, Maximize, Filter } from "lucide-react";
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
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[600px] overflow-hidden"
    >
      <Link to={`/properties/${property.id}`} className="block h-full">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.8 }}
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${property.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/90" />
        </div>

        <div className="relative h-full flex flex-col justify-end p-8">
          <span className="text-[#d4af37] text-sm mb-2">
            {property.status}
          </span>

          <h3 className="text-2xl mb-2">{property.name}</h3>

          <div className="flex items-center gap-2 text-white/60 mb-3">
            <MapPin className="w-4 h-4" />
            {property.location}
          </div>

          <div className="text-[#d4af37] text-xl mb-4">
            {property.price}
          </div>

          <div className="flex gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-[#d4af37]" />
              {property.units}
            </div>
            <div className="flex items-center gap-2">
              <Maximize className="w-4 h-4 text-[#d4af37]" />
              {property.size}
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#d4af37]">
            <span>Подробнее</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedProperties() {
  const [filter, setFilter] = useState("Все");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = properties.filter((property) => {
    if (filter === "Все") return true;
    return property.status === filter;
  });

  return (
    <section
      id="properties"
      className="py-24 px-8 bg-[#0a0a0a]"
    >
      {/* Header + Filters */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-[#d4af37]" />
            <span className="text-[#d4af37] tracking-[0.25em] text-xs">
              ИЗБРАННЫЕ ПРОЕКТЫ
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl mb-4">
            Исключительные дома
          </h2>
          <p className="text-white/60 max-w-xl">
            Каждый объект отражает архитектурное совершенство
            и утончённый образ жизни.
          </p>
        </div>

        {/* Filter */}
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-3 px-6 py-3 border border-white/20 hover:border-[#d4af37] transition-colors"
          >
            <Filter className="w-4 h-4 text-[#d4af37]" />
            <span>{filter}</span>
          </button>

          {showFilters && (
            <div className="absolute right-0 mt-3 w-48 bg-[#0a0a0a] border border-white/10 z-20">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setFilter(c);
                    setShowFilters(false);
                  }}
                  className={`block w-full text-left px-5 py-3 hover:bg-white/5 ${
                    filter === c ? "text-[#d4af37]" : "text-white/70"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {filteredProperties.map((property, index) => (
          <PropertyCard
            key={property.id}
            property={property}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
