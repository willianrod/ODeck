import { FormLabel as ChakraFormLabel } from '@chakra-ui/react';
import React from 'react';
import styles from './styles.module.scss';

interface FormLabelProps {
  // eslint-disable-next-line react/require-default-props
  required?: boolean;
}

const FormLabel: React.FC<FormLabelProps> = ({
  required,
  children,
  ...props
}) => {
  if (!children) return null;
  return (
    <ChakraFormLabel className={styles.label} {...props}>
      {children} {required && <span className={styles.required}>*</span>}
    </ChakraFormLabel>
  );
};

export default FormLabel;
