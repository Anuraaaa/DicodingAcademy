import React, { useState, useContext, useEffect } from 'react';

const LocaleContext = React.createContext();

const useLocaleProvider = () => useContext(LocaleContext);

const LocaleProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'id' : 'en';
        localStorage.setItem('language', newLanguage);
        setLanguage(newLanguage);        
    }

    return (
        <LocaleContext.Provider value={{ theme, toggleTheme, language, toggleLanguage }}>
            {children}
        </LocaleContext.Provider>
    );
};

export {LocaleProvider, useLocaleProvider};