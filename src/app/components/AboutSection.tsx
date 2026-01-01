import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Award, Shield, TrendingUp, Users } from "lucide-react";

const stats = [
  { icon: Award, value: "15+", label: "Лет совершенства" },
  { icon: Users, value: "1 000+", label: "Счастливых семей" },
  { icon: TrendingUp, value: "95%", label: "Довольных клиентов" },
  { icon: Shield, value: "100%", label: "Гарантия качества" },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center mb-16 sm:mb-20 md:mb-24">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 sm:w-16 h-[2px] bg-[#d4af37]" />
              <span className="text-[#d4af37] tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm">
                О МТ Евро Строй
              </span>
            </div>
            
            <h2 className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl">
              Компания 
              <br />
              "МТ Евро строй"
            </h2>
            
            <div className="space-y-4 sm:space-y-6 text-white/70 leading-relaxed text-sm sm:text-base">
              <p>
                Наша компания специализируется на строительстве жилых комплексов с 2010 года и предлагает квартиры в нескольких проектах.
              </p>
              <p>
                Мы стремимся создавать комфортное и качественное жилье для наших клиентов. Каждый комплекс строится с использованием лучших и качественных материалов, с учетом перспектив долгосрочного проживания жильцов. 
              </p>
              <p>
                Мы уделяем особое внимание удобству и долговечности жилых помещений, включая возможность проведения ремонтных работ.
              </p>
              <p>
                Наша компания знаменита отсутствием проблем с долгостроем. Мы гарантируем, что ваши инвестиции будут оправданы и принесут прибыль. Приобретайте квартиры в компании "МТ Евро строй" и убедитесь в высоком качестве наших проектов.
              </p>
            </div>

           
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden order-first lg:order-last"
          >
            <div
              className="h-full w-full bg-cover bg-center bg-[url(./public/11.jpg)]"
              
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            
            {/* Decorative Border */}
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 border-t-2 border-r-2 border-[#d4af37]" />
            <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-32 sm:h-32 border-b-2 border-l-2 border-[#d4af37]" />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 border border-[#d4af37]/30 group-hover:border-[#d4af37] transition-colors duration-300">
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#d4af37]" />
                </div>
                <div className="mb-1 sm:mb-2 text-[#d4af37] text-xl sm:text-2xl md:text-3xl">{stat.value}</div>
                <div className="text-white/60 text-xs sm:text-sm md:text-base">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
