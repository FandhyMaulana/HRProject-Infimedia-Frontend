import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '', disabled = false }) => {
  const buttonClasses = `${styles.button} ${styles[variant]} ${className}`;

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
