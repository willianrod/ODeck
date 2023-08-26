import {
  FormLabel as ChakraFormLabel,
  FormLabelProps as BaseFormLabelProps,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import styles from './styles.module.scss';

interface FormLabelProps extends BaseFormLabelProps {
  // eslint-disable-next-line react/require-default-props
  required?: boolean;
  children: string | ReactElement | undefined;
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
