// reusable button component 

import React from 'react';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    className?: string;
}

const Buttons:React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size:"md",
    className="",
    ...props
}) => {
    const basseClasses = 'rounded-md font-medium transition-all duration-200 focus:outline-none';

    const basseClasses = 'rounded-md font-medium transition-all duration-200 focus:outline-none';
    
