import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
  Layers,
  Ruler,
} from "lucide-react";
import { properties } from "../data/properties";

export function PropertyPage() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === Number(id));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activePlan, setActivePlan] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        Объект не найден
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

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
        {/* LEFT — PHOTO */}
        <div className="relative h-[100vh] lg:sticky lg:top-0 overflow-hidden">
          <motion.img
            key={currentImageIndex}
            src={property.gallery[currentImageIndex]}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70" />

          <Link
            to="/"
            className="absolute top-6 left-6 z-20 flex items-center gap-2 text-[#d4af37]"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </Link>

          {property.gallery.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/60 border border-white/20 hover:border-[#d4af37] transition flex items-center justify-center"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/60 border border-white/20 hover:border-[#d4af37] transition flex items-center justify-center"
              >
                <ChevronRight />
              </button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {property.gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`h-2 rounded-full transition-all ${i === currentImageIndex
                        ? "bg-[#d4af37] w-8"
                        : "bg-white/40 w-2"
                      }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* RIGHT — CONTENT */}
        <div className="px-8 lg:px-12 py-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-4 py-1 border border-[#d4af37] text-[#d4af37] text-sm">
              {property.status}
            </span>

          </div>

          <h1 className="text-4xl md:text-5xl mb-4">
            {property.name}
          </h1>

          <div className="flex items-center gap-2 text-white/60 mb-6">
            <MapPin className="w-4 h-4" />
            {property.location}
          </div>

          <div className="text-[#d4af37] text-3xl mb-8">
            {property.price}
          </div>

            <div className="space-y-6 text-white/75 leading-relaxed mb-8">
              {property.description.map((text, i) => {
                const isAccent = text.startsWith("Поторопитесь");

                return (
                  <p
                    key={i}
                    className={
                      isAccent
                        ? "text-[#d4af37] font-medium"
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
            <Info icon={Layers} label="Квартир" value={property.units} />
            <Info icon={Ruler} label="Площадь" value={property.size} />
            <Info icon={Home} label="Спальни" value={property.specs.bedrooms} />
            <Info icon={Building2} label="Ванные" value={property.specs.bathrooms} />
            <Info icon={Car} label="Парковка" value={property.specs.parking} />
            <Info icon={Calendar} label="Год сдачи" value={property.specs.year} />
          </div>

          {/* FEATURES */}
          {property.features?.length > 0 && (
            <>
              <h2 className="text-3xl mb-8 text-[#d4af37]">
                Особенности жилого комплекса
              </h2>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
                {property.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-white/70"
                  >
                    <span className="w-1.5 h-1.5 bg-[#d4af37] rotate-45" />
                    {feature}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* PLANS */}
          {property.plans && (
            <>
              <h2 className="text-3xl mb-10 text-[#d4af37]">
                Планировки квартир
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {property.plans.map((plan, i) => (
                  <div key={i} className="border border-white/10 p-6">
                    <img
                      src={plan}
                      onClick={() => setActivePlan(plan)}
                      className="cursor-zoom-in max-h-[320px] mx-auto"
                    />

                    <a
                      href={plan}
                      download
                      className="mt-4 flex items-center justify-center gap-2 text-[#d4af37]"
                    >
                      <Download className="w-4 h-4" />
                      Скачать план
                    </a>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {activePlan && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/90 z-50"
              onClick={() => setActivePlan(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setActivePlan(null)}
                className="absolute top-6 right-6"
              >
                <X />
              </button>

              <img
                src={activePlan}
                className="max-h-[90vh] max-w-[90vw]"
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
    <div className="p-6 border border-white/10 hover:border-[#d4af37]/50">

      <div>{value}</div>
    </div>
  );
}
