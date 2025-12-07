import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Eye } from 'lucide-react';

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex bg-gray-200 dark:bg-gray-700 rounded-full p-1 shadow-inner">
            <button
                onClick={() => toggleTheme('light')}
                className={`p-2 rounded-full transition-all ${theme === 'light'
                        ? 'bg-white text-yellow-500 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                title="Light Mode"
            >
                <Sun size={18} />
            </button>
            <button
                onClick={() => toggleTheme('dark')}
                className={`p-2 rounded-full transition-all ${theme === 'dark'
                        ? 'bg-gray-800 text-blue-400 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                title="Dark Mode"
            >
                <Moon size={18} />
            </button>
            <button
                onClick={() => toggleTheme('high-contrast')}
                className={`p-2 rounded-full transition-all ${theme === 'high-contrast'
                        ? 'bg-black text-yellow-300 border-2 border-white shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                title="High Contrast"
            >
                <Eye size={18} />
            </button>
        </div>
    );
};

export default ThemeSwitcher;
