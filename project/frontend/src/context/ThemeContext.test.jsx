import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from './ThemeContext';
import ThemeSwitcher from '../components/ThemeSwitcher';

// Helper component to display current theme
const ThemeConsumer = () => {
    return <div data-testid="theme-consumer"></div>;
};

describe('ThemeContext and ThemeSwitcher', () => {
    beforeEach(() => {
        // Clear localStorage and reset document classes before each test
        localStorage.clear();
        document.documentElement.className = '';
    });

    it('renders with default light theme', () => {
        render(
            <ThemeProvider>
                <ThemeSwitcher />
            </ThemeProvider>
        );

        // Check if light mode button is active (yellow-500 text)
        const lightButton = screen.getByTitle('Light Mode');
        expect(lightButton).toHaveClass('bg-white');

        // Check document class
        expect(document.documentElement.classList.contains('dark')).toBe(false);
        expect(document.documentElement.classList.contains('high-contrast')).toBe(false);
    });

    it('switches to dark mode', () => {
        render(
            <ThemeProvider>
                <ThemeSwitcher />
            </ThemeProvider>
        );

        const darkButton = screen.getByTitle('Dark Mode');
        fireEvent.click(darkButton);

        // Check if dark mode button is active
        expect(darkButton).toHaveClass('bg-gray-800');

        // Check document class
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(document.documentElement.classList.contains('high-contrast')).toBe(false);

        // Check localStorage
        expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('switches to high contrast mode', () => {
        render(
            <ThemeProvider>
                <ThemeSwitcher />
            </ThemeProvider>
        );

        const hcButton = screen.getByTitle('High Contrast');
        fireEvent.click(hcButton);

        // Check if high contrast button is active
        expect(hcButton).toHaveClass('bg-black');

        // Check document class
        expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
        expect(document.documentElement.classList.contains('dark')).toBe(false);

        // Check localStorage
        expect(localStorage.getItem('theme')).toBe('high-contrast');
    });

    it('persists theme from localStorage', () => {
        localStorage.setItem('theme', 'dark');

        render(
            <ThemeProvider>
                <ThemeSwitcher />
            </ThemeProvider>
        );

        // Check document class
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
});
