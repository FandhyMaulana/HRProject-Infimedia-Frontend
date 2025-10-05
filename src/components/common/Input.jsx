import React from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef(({ type = 'text', className = '', ...props }, ref) => {
  return <input type={type} ref={ref} className={`${styles.input} ${className}`} {...props} />;
});

export default Input;
