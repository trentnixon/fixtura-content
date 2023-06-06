'use client';
import React from 'react';
import buttonStyles from './buttonStyles';

export const Button = ({ children, onClick, type = "button", variant = "primary", isDisabled = false }) => {
    let baseClasses = "py-2 px-4 rounded-md font-semibold focus:outline-none border ";
  
    let colorClasses = isDisabled
      ? "bg-gray-200 border-gray-00 text-gray-400 cursor-not-allowed"
      : buttonStyles[variant];
  
    return (
      <button
        onClick={isDisabled ? undefined : onClick}
        type={type}
        disabled={isDisabled}
        className={baseClasses + colorClasses}
      >
        {children}
      </button>
    );
  };


export const TextInput = ({ placeholder, value, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="p-2 border border-gray-300 rounded-md focus:outline-none"
  />
);

export const Card = ({ children }) => (
  <div className="shadow-md p-4 bg-white rounded-md">
    {children}
  </div>
);

export const Typography = ({ children, variant = "p" }) => {
  const Tag = variant;
  return (
    <Tag className={`text-${variant === 'h1' ? '4xl' : 'base'} font-${variant.startsWith('h') ? 'semibold' : 'normal'}`}>
      {children}
    </Tag>
  );
};

export const Icon = ({ icon, color = "black" }) => (
  <i className={`text-${color} ${icon}`}></i>
);
