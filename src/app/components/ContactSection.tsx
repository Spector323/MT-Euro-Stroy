import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Mail, Phone, MapPin, CheckCircle, MessageCircle } from "lucide-react";

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
  const [phoneTouched, setPhoneTouched] = useState(false);

  const YOUR_PHONE_NUMBER = "79280935333";
  const YOUR_PHONE_WITH_CODE = "+7 (928) 093-53-33";

  // Используем ref для отслеживания позиции курсора
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  // Улучшенная функция форматирования с сохранением позиции курсора
  const formatPhone = (value: string, cursorPos?: number): { formatted: string; newCursorPos: number } => {
    // Убираем все нецифровые символы кроме + в начале
    let digits = value.replace(/\D/g, "");
    
    // Если начинается с 7 или 8, убираем первую цифру (она уже в +7)
    if (digits.length > 0 && (digits[0] === '7' || digits[0] === '8')) {
      digits = digits.substring(1);
    }
    
    // Ограничиваем до 10 цифр (российский номер)
    digits = digits.substring(0, 10);
    
    // Форматируем
    let formatted = "+7 ";
    let newCursor = 3; // Начинаем после "+7 "
    
    if (digits.length > 0) {
      formatted += `(${digits.substring(0, 3)}`;
      newCursor += 1 + Math.min(3, digits.length); // Позиция после скобки и цифр
      
      if (digits.length > 3) {
        formatted += `) ${digits.substring(3, 6)}`;
        newCursor += 2 + Math.min(3, digits.length - 3); // Позиция после ") " и цифр
        
        if (digits.length > 6) {
          formatted += `-${digits.substring(6, 8)}`;
          newCursor += 1 + Math.min(2, digits.length - 6); // Позиция после "-" и цифр
          
          if (digits.length > 8) {
            formatted += `-${digits.substring(8, 10)}`;
            newCursor += 1 + Math.min(2, digits.length - 8); // Позиция после "-" и цифр
          }
        }
      } else if (digits.length === 3) {
        formatted += ")";
        newCursor += 1; // Позиция после закрывающей скобки
      }
    }
    
    // Корректируем позицию курсора на основе предыдущей позиции
    if (cursorPos !== undefined) {
      // Если курсор был в старом значении, пытаемся сохранить его логическую позицию
      const oldDigits = value.replace(/\D/g, "");
      const oldDigitPos = getDigitPositionFromCursor(value, cursorPos);
      
      if (oldDigitPos !== null) {
        // Находим новую позицию курсора на основе позиции цифры
        newCursor = getCursorPositionFromDigit(formatted, oldDigitPos);
      }
    }
    
    return { formatted, newCursorPos: newCursor };
  };

  // Функция для получения позиции цифры по позиции курсора
  const getDigitPositionFromCursor = (value: string, cursorPos: number): number | null => {
    const digitsBeforeCursor = value.substring(0, cursorPos).replace(/\D/g, "");
    return digitsBeforeCursor.length;
  };

  // Функция для получения позиции курсора по позиции цифры
  const getCursorPositionFromDigit = (value: string, digitPos: number): number => {
    let digitCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (/\d/.test(value[i])) {
        digitCount++;
        if (digitCount === digitPos) {
          return i + 1; // Курсор после цифры
        }
      }
    }
    return value.length; // Если цифра не найдена, ставим в конец
  };

  // Улучшенная функция валидации
  const validatePhone = (phone: string): { isValid: boolean; error: string; cleanNumber: string } => {
    const digits = phone.replace(/\D/g, "");
    
    // Убираем начальную 7 или 8 если есть
    let cleanDigits = digits;
    if (digits.length > 0 && (digits[0] === '7' || digits[0] === '8')) {
      cleanDigits = digits.substring(1);
    }
    
    if (cleanDigits.length === 0) {
      return { isValid: false, error: "Введите номер телефона", cleanNumber: "" };
    }
    
    if (cleanDigits.length !== 10) {
      return { isValid: false, error: "Номер должен содержать 10 цифр", cleanNumber: digits };
    }
    
    const operatorCode = cleanDigits.substring(0, 3);
    const validOperatorCodes = [
      '900', '901', '902', '903', '904', '905', '906', '908', '909', 
      '910', '911', '912', '913', '914', '915', '916', '917', '918', '919',
      '920', '921', '922', '923', '924', '925', '926', '927', '928', '929',
      '930', '931', '932', '933', '934', '936', '937', '938', '939',
      '950', '951', '952', '953', '954', '955', '956', '958',
      '960', '961', '962', '963', '964', '965', '966', '967', '968', '969',
      '970', '971', '977', '978',
      '980', '981', '982', '983', '984', '985', '986', '987', '988', '989',
      '991', '992', '993', '994', '995', '996', '997', '999'
    ];
    
    if (!validOperatorCodes.includes(operatorCode)) {
      return { isValid: false, error: "Неверный код оператора", cleanNumber: digits };
    }
    
    const cleanNumber = `7${cleanDigits}`;
    return { isValid: true, error: "", cleanNumber };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPhoneTouched(true);

    const newErrors = {
      name: "",
      phone: "",
      message: "",
    };

    if (formData.name.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    }

    if (formData.message.trim().length < 5) {
      newErrors.message = "Сообщение должно содержать минимум 5 символов";
    }

    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.error;
    }

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error !== "")) {
      try {
        const cleanNumber = phoneValidation.cleanNumber;
        const formattedPhone = `+7 (${cleanNumber.substring(1, 4)}) ${cleanNumber.substring(4, 7)}-${cleanNumber.substring(7, 9)}-${cleanNumber.substring(9, 11)}`;

        const message = `📋 *Новая заявка с сайта МТ Евро Строй*%0A%0A👤 *Имя:* ${formData.name.trim()}%0A📱 *Телефон:* ${formattedPhone}%0A📝 *Сообщение:* ${formData.message.trim()}%0A%0A⏰ *Дата:* ${new Date().toLocaleString("ru-RU")}`;

        const whatsappUrl = `https://wa.me/${YOUR_PHONE_NUMBER}?text=${message}`;
        window.open(whatsappUrl, "_blank");
        
        setIsSubmitted(true);
        
        setTimeout(() => {
          setFormData({
            name: "",
            phone: "",
            message: "",
          });
          setIsSubmitted(false);
          setPhoneTouched(false);
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart } = e.target;
    
    // Получаем позицию курсора перед изменением
    const cursorBefore = selectionStart || 0;
    
    // Форматируем новое значение
    const { formatted, newCursorPos } = formatPhone(value, cursorBefore);
    
    // Устанавливаем новое значение
    setFormData(prev => ({
      ...prev,
      phone: formatted
    }));
    
    // Сохраняем позицию курсора для установки после рендера
    setCursorPosition(newCursorPos);
    
    // Валидируем если поле было тронуто
    if (phoneTouched) {
      const phoneValidation = validatePhone(formatted);
      setErrors(prev => ({
        ...prev,
        phone: phoneValidation.error
      }));
    }
  };

  // Устанавливаем позицию курсора после рендера
  useEffect(() => {
    if (cursorPosition !== null && phoneInputRef.current) {
      phoneInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      setCursorPosition(null);
    }
  }, [cursorPosition, formData.phone]);

  const handlePhoneBlur = () => {
    setPhoneTouched(true);
    if (formData.phone) {
      const phoneValidation = validatePhone(formData.phone);
      if (!phoneValidation.isValid) {
        setErrors(prev => ({
          ...prev,
          phone: phoneValidation.error
        }));
      }
    }
  };

  const handlePhoneFocus = () => {
    if (!formData.phone) {
      setFormData(prev => ({
        ...prev,
        phone: "+7 ("
      }));
    }
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const cursorPos = input.selectionStart || 0;
    
    // Если нажали Backspace и курсор в начале форматированной части (+7)
    if (e.key === 'Backspace' && cursorPos <= 3) {
      e.preventDefault();
      return;
    }
    
    // Если нажали Delete и удаляем форматирующие символы
    if (e.key === 'Delete') {
      const value = input.value;
      const nextChar = value[cursorPos];
      
      // Если следующий символ - форматирующий (скобка, пробел, дефис)
      if (nextChar && !/\d/.test(nextChar)) {
        e.preventDefault();
        // Перемещаем курсор на следующую позицию
        setTimeout(() => {
          input.setSelectionRange(cursorPos + 1, cursorPos + 1);
        }, 0);
      }
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      name: e.target.value
    }));
    
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: "" }));
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      message: e.target.value
    }));
    
    if (errors.message) {
      setErrors(prev => ({ ...prev, message: "" }));
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
              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 border border-white/10 hover:border-green-500/50 bg-gradient-to-r to-transparent hover:from-green-500/10 transition-all duration-300">
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
                      onChange={handleNameChange}
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
                      ref={phoneInputRef}
                      type="tel"
                      name="phone"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onBlur={handlePhoneBlur}
                      onFocus={handlePhoneFocus}
                      onKeyDown={handlePhoneKeyDown}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border ${
                        errors.phone ? "border-red-500" : phoneTouched && formData.phone && !errors.phone ? "border-green-500/50" : "border-white/10"
                      } focus:border-[#d4af37] text-white placeholder:text-white/40 outline-none transition-colors duration-300 text-sm sm:text-base`}
                      required
                    />
                    {errors.phone ? (
                      <p className="mt-2 text-red-500 text-xs sm:text-sm">
                        {errors.phone}
                      </p>
                    ) : phoneTouched && formData.phone && !errors.phone ? (
                      <p className="mt-2 text-green-500 text-xs sm:text-sm">
                        ✓ Корректный номер
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Расскажите о ваших требованиях... *"
                    value={formData.message}
                    onChange={handleMessageChange}
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
                </div>

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