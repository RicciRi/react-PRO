import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../translations/messages.en.json'; // Английский перевод
import ukTranslations from '../translations/messages.ua.json'; // Украинский перевод

// Словарь всех переводов
const translations = {
    en: enTranslations,
    ua: ukTranslations,
};

// Создаем контекст для переводов
const TranslationContext = createContext();

// Провайдер для управления состоянием переводов и сменой языка
export const TranslationProvider = ({ children }) => {
    const [locale, setLocale] = useState(
        localStorage.getItem('locale') || 'en'
    );

    const changeLocale = (newLocale) => {
        if (translations[newLocale]) {
            setLocale(newLocale);
        }
    };

    const trans = (key) => {
        return translations[locale][key] || key; // Если нет перевода, возвращаем ключ
    };

    useEffect(() => {
        localStorage.setItem('locale', locale);
    }, [locale]);

    return (
        <TranslationContext.Provider value={{ locale, changeLocale, trans }}>
            {children}
        </TranslationContext.Provider>
    );
};

// Пользовательский хук для доступа к контексту переводов
export const useTranslation = () => {
    return useContext(TranslationContext);
};
