import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle } from "lucide-react";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const YOUR_PHONE_NUMBER = "79280928761"; // Твой номер без +7
  const YOUR_PHONE_WITH_CODE = "+79280928761"; // Твой полный номер для ссылки

  const validatePhone = (phone: string) => {
    // Убираем все нецифровые символы
    const cleanPhone = phone.replace(/\D/g, "");
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    const newErrors = {
      name: "",
      phone: "",
      message: "",
    };

    if (formData.name.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Введите корректный номер телефона";
    }

    if (formData.message.trim().length < 5) {
      newErrors.message = "Сообщение должно содержать минимум 5 символов";
    }

    setErrors(newErrors);

    // If no errors, send to WhatsApp
    if (!Object.values(newErrors).some((error) => error !== "")) {
      try {
        // Формируем сообщение для WhatsApp
        const cleanPhone = formData.phone.replace(/\D/g, "");
        const phoneForMessage = cleanPhone.startsWith("8") 
          ? `+7${cleanPhone.substring(1)}` 
          : `+7${cleanPhone}`;

        const message = `📋 *Новая заявка с сайта МТ Евро Строй*%0A%0A👤 *Имя:* ${formData.name}%0A📱 *Телефон:* ${phoneForMessage}%0A📝 *Сообщение:* ${formData.message}%0A%0A⏰ *Дата:* ${new Date().toLocaleString("ru-RU")}`;

        // Формируем URL для WhatsApp
        const whatsappUrl = `https://wa.me/${YOUR_PHONE_NUMBER}?text=${message}`;
        
        // Открываем WhatsApp в новой вкладке
        window.open(whatsappUrl, "_blank");
        
        // Показываем успешную отправку
        setIsSubmitted(true);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setFormData({
            name: "",
            phone: "",
            message: "",
          });
          setIsSubmitted(false);
        }, 5000);

      } catch (error) {
        console.error("Error sending to WhatsApp:", error);
        alert("Произошла ошибка при отправке. Попробуйте еще раз.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Маска для телефона
    let formattedValue = value;
    if (name === "phone") {
      // Удаляем все нецифровые символы
      let digits = value.replace(/\D/g, "");
      
      // Форматируем номер
      if (digits.length > 0) {
        if (digits.startsWith("8")) {
          digits = "7" + digits.substring(1);
        }
        
        if (digits.length <= 1) {
          formattedValue = `+7${digits}`;
        } else if (digits.length <= 4) {
          formattedValue = `+7 (${digits.substring(1, 4)})`;
        } else if (digits.length <= 7) {
          formattedValue = `+7 (${digits.substring(1, 4)}) ${digits.substring(4, 7)}`;
        } else if (digits.length <= 9) {
          formattedValue = `+7 (${digits.substring(1, 4)}) ${digits.substring(4, 7)}-${digits.substring(7, 9)}`;
        } else {
          formattedValue = `+7 (${digits.substring(1, 4)}) ${digits.substring(4, 7)}-${digits.substring(7, 9)}-${digits.substring(9, 11)}`;
        }
      } else {
        formattedValue = "";
      }
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue,
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
            {/* WhatsApp Button */}
            <a 
              href={`https://wa.me/${YOUR_PHONE_NUMBER}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 border border-white/10 hover:border-green-500/50 bg-gradient-to-r from-white/5 to-transparent hover:from-green-500/10 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-green-500/30 group-hover:border-green-500 bg-green-500/10 group-hover:bg-green-500/20 transition-all duration-300 flex-shrink-0 rounded-full">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                </div>
                <div>
                  <div className="mb-1 sm:mb-2 text-white/80 text-sm sm:text-base">Написать в WhatsApp</div>
                  <div className="text-white/60 text-xs sm:text-sm">{YOUR_PHONE_WITH_CODE}</div>
                  <div className="text-green-400/80 text-xs sm:text-sm mt-1">Нажмите для быстрой связи</div>
                </div>
              </div>
            </a>

            <a href="tel:+79280928761" className="group block">
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

            <a href="mailto:stroyinvesting@mail.ru" className="group block">
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
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                  <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-400" />
                </div>
                <h3 className="mb-4 text-xl sm:text-2xl text-center">Заявка отправлена!</h3>
                <p className="text-white/60 text-center text-sm sm:text-base mb-6">
                  Сейчас откроется WhatsApp для отправки сообщения.
                </p>
                <p className="text-white/40 text-xs text-center">
                  Если WhatsApp не открылся автоматически,<br />
                  <a 
                    href={`https://wa.me/${YOUR_PHONE_NUMBER}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 underline"
                  >
                    нажмите здесь для отправки вручную
                  </a>
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
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border ${
                        errors.name ? "border-red-500" : "border-white/10"
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
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border ${
                        errors.phone ? "border-red-500" : "border-white/10"
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
                    className={`w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border ${
                      errors.message ? "border-red-500" : "border-white/10"
                    } focus:border-[#d4af37] text-white placeholder:text-white/40 outline-none resize-none transition-colors duration-300 text-sm sm:text-base`}
                    required
                  />
                  {errors.message && (
                    <p className="mt-2 text-red-500 text-xs sm:text-sm">{errors.message}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group w-full sm:w-auto px-10 sm:px-12 py-4 sm:py-5 ${
                      isSubmitting 
                        ? "bg-gray-600 cursor-not-allowed" 
                        : "bg-green-600 hover:bg-green-700"
                    } text-white transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base font-medium`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Отправка...</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Отправить в WhatsApp</span>
                      </>
                    )}
                  </button>

                  <div className="text-white/50 text-xs sm:text-sm">
                    После отправки откроется WhatsApp<br />
                    для подтверждения отправки сообщения
                  </div>
                </div>

                <p className="text-white/40 text-xs sm:text-sm">
                  * Поля, обязательные для заполнения. Сообщение будет отправлено в WhatsApp менеджеру.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}