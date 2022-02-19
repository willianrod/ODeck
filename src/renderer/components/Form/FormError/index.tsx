import React from 'react';
import styles from './styles.module.scss';

const FormError: React.FC = ({ children }) => {
  return <span className={styles.errorMessage}>{children}</span>;
};

export default FormError;
