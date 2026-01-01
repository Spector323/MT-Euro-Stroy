import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^[\d\s\+\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, "").length >= 10;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };

    if (formData.name.length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Введите корректный номер телефона";
    }

    if (formData.message.length < 10) {
      newErrors.message = "Сообщение должно содержать минимум 10 символов";
    }

    setErrors(newErrors);

    // If no errors, submit
    if (!Object.values(newErrors).some((error) => error !== "")) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-16 lg:px-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#d4af37]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#d4af37]/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-12 sm:w-16 h-[2px] bg-[#d4af37]" />
            <span className="text-[#d4af37] tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm">
              СВЯЗАТЬСЯ С НАМИ
            </span>
            <div className="w-12 sm:w-16 h-[2px] bg-[#d4af37]" />
          </div>
          <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl px-4">
            Начните своё путешествие
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-4">
            Наша команда готова помочь вам найти идеальный дом. Свяжитесь с нами сегодня,
            чтобы запланировать частный показ или обсудить инвестиционные возможности.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-6 sm:space-y-8 order-last lg:order-first"
          >
            <a href="tel:+79280935333" className="group block">
              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 border border-white/10 hover:border-[#d4af37]/50 transition-colors duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-[#d4af37]/30 group-hover:border-[#d4af37] transition-colors duration-300 flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37]" />
                </div>
                <div>
                  <div className="mb-1 sm:mb-2 text-white/80 text-sm sm:text-base">Позвоните нам</div>
                  <div className="text-white/60 text-xs sm:text-sm">+7 (928) 093-53-33</div>
                  <div className="text-white/60 text-xs sm:text-sm">Пн-Сб, 9:00-19:00</div>
                </div>
              </div>
            </a>

            <a href="mailto:info@prestige.ru" className="group block">
              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 border border-white/10 hover:border-[#d4af37]/50 transition-colors duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-[#d4af37]/30 group-hover:border-[#d4af37] transition-colors duration-300 flex-shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37]" />
                </div>
                <div>
                  <div className="mb-1 sm:mb-2 text-white/80 text-sm sm:text-base">Напишите нам</div>
                  <div className="text-white/60 text-xs sm:text-sm">stroyinvesting@mail.ru</div>
                </div>
              </div>
            </a>

            <div className="group">
              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 border border-white/10 hover:border-[#d4af37]/50 transition-colors duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-[#d4af37]/30 group-hover:border-[#d4af37] transition-colors duration-300 flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37]" />
                </div>
                <div>
                  <div className="mb-1 sm:mb-2 text-white/80 text-sm sm:text-base">Посетите нас</div>
                  <div className="text-white/60 text-xs sm:text-sm">
                    Республика Ингушетия, г. Магас,
                    <br />
                    ул. Назарбаева, д. 3Б (помещение 17)
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-2"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 sm:py-24"
              >
                <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-[#d4af37] mb-6" />
                <h3 className="mb-4 text-xl sm:text-2xl text-center">Спасибо за обращение!</h3>
                <p className="text-white/60 text-center text-sm sm:text-base">
                  Мы свяжемся с вами в ближайшее время.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Ваше имя *"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border ${errors.name ? "border-red-500" : "border-white/10"
                        } focus:border-[#d4af37] text-white placeholder:text-white/40 outline-none transition-colors duration-300 text-sm sm:text-base`}
                      required
                    />
                    {errors.name && (
                      <p className="mt-2 text-red-500 text-xs sm:text-sm">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Номер телефона *"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border ${errors.phone ? "border-red-500" : "border-white/10"
                        } focus:border-[#d4af37] text-white placeholder:text-white/40 outline-none transition-colors duration-300 text-sm sm:text-base`}
                      required
                    />
                    {errors.phone && (
                      <p className="mt-2 text-red-500 text-xs sm:text-sm">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Расскажите о ваших требованиях... *"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border ${errors.message ? "border-red-500" : "border-white/10"
                      } focus:border-[#d4af37] text-white placeholder:text-white/40 outline-none resize-none transition-colors duration-300 text-sm sm:text-base`}
                    required
                  />
                  {errors.message && (
                    <p className="mt-2 text-red-500 text-xs sm:text-sm">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="group w-full md:w-auto px-10 sm:px-12 py-4 sm:py-5 bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c49d2e] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <span>Отправить сообщение</span>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <p className="text-white/40 text-xs sm:text-sm">
                  * Поля, обязательные для заполнения
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
