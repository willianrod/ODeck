import React from 'react';
import { FormErrorMessageProps } from '@chakra-ui/react';
import styles from './styles.module.scss';

const FormError: React.FC<FormErrorMessageProps> = ({ children }) => {
  return <span className={styles.errorMessage}>{children}</span>;
};

export default FormError;
