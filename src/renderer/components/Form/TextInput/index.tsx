import {
  FormControl,
  Input,
  InputGroup,
  InputProps,
  FormHelperText,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';

import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './TextInput.module.scss';

export interface TextInputProps extends InputProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  hint?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  defaultValue,
  name,
  required,
  disabled,
  className,
  maxLength,
  hint,
  ...rest
}) => {
  const { register, formState } = useFormContext();

  const error = useMemo(
    () => formState.errors[name]?.message,
    [formState, name]
  );

  return (
    <FormControl
      isInvalid={Boolean(error)}
      isDisabled={disabled}
      isRequired={required}
    >
      <FormLabel htmlFor={name} required={required}>
        {label}
      </FormLabel>
      {hint && <FormHelperText marginBottom={4}>{hint}</FormHelperText>}
      <div className={styles.inputContainer}>
        <InputGroup>
          <Input
            className={className}
            defaultValue={defaultValue}
            data-testid={name}
            isInvalid={formState.errors[name]}
            isDisabled={disabled}
            {...rest}
            {...register(name, { required, disabled, maxLength })}
          />
        </InputGroup>
      </div>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default TextInput;
