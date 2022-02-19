import {
  FormControl,
  Checkbox,
  CheckboxProps,
  FormLabel,
} from '@chakra-ui/react';
import React, { useCallback, memo, useMemo } from 'react';
import {
  Controller,
  useFormContext,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form';
import FormError from '../FormError';
import styles from './CheckboxInput.module.scss';

export interface CheckboxInputProps extends CheckboxProps {
  label?: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  name,
  required,
  disabled,
  children,
  defaultValue,
  ...rest
}) => {
  const { control, formState } = useFormContext();

  const renderInput = useCallback(
    ({ field }: { field: ControllerRenderProps<FieldValues, string> }) => (
      <Checkbox
        ref={field.ref}
        onChange={field.onChange}
        isChecked={field.value}
        isInvalid={formState.errors[name]}
        {...rest}
      >
        {children}
      </Checkbox>
    ),
    [children, formState.errors, rest, name]
  );

  const rules = useMemo(
    () => ({
      disabled,
      required,
    }),
    [disabled, required]
  );

  return (
    <FormControl>
      <FormLabel htmlFor={name} required={required}>
        {label}
      </FormLabel>
      <div className={styles.checkboxContainer}>
        <Controller
          rules={rules}
          control={control}
          name={name}
          render={renderInput}
          defaultValue={defaultValue || false}
          {...rest}
        />
        <FormError>{formState.errors[name]?.message}</FormError>
      </div>
    </FormControl>
  );
};

export default memo(CheckboxInput);
