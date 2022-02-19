import { FormControl, CheckboxProps, FormLabel } from '@chakra-ui/react';
import React, { useCallback, memo, useMemo } from 'react';
import {
  Controller,
  useFormContext,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form';
import FormError from '../FormError';
import styles from './ColorInput.module.scss';

export interface CheckboxInputProps extends CheckboxProps {
  label?: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const ColorInput: React.FC<CheckboxInputProps> = ({
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
      <input
        type="color"
        style={{ height: '38px' }}
        name={field.name}
        onChange={field.onChange}
        value={field.value}
        ref={field.ref}
      />
    ),
    []
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
          defaultValue={defaultValue || '#fff'}
          {...rest}
        />
        <FormError>{formState.errors[name]?.message}</FormError>
      </div>
    </FormControl>
  );
};

export default memo(ColorInput);
