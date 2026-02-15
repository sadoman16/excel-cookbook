import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-excel-green disabled:pointer-events-none disabled:opacity-50";

    const variants = {
        primary: "bg-excel-green text-white hover:bg-[#1b5e3a]",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700",
        outline: "border border-slate-200 bg-transparent hover:bg-slate-100 dark:border-excel-dark dark:hover:bg-slate-800 text-slate-900 dark:text-slate-50"
    };

    const sizes = {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-8 text-base"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
