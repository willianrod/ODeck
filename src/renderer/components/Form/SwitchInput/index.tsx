import { FormControl, SwitchProps, Switch } from '@chakra-ui/react';
import React, { useCallback, memo, useMemo } from 'react';
import {
  Controller,
  useFormContext,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form';
import FormError from '../FormError';
import styles from './SwitchInput.module.scss';
import FormLabel from '../FormLabel';

export interface SwitchInputProps extends SwitchProps {
  label?: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const SwitchInput: React.FC<SwitchInputProps> = ({
  label,
  name,
  required,
  disabled,
  defaultValue,
  ...rest
}) => {
  const { control, formState } = useFormContext();

  const renderInput = useCallback(
    ({ field }: { field: ControllerRenderProps<FieldValues, string> }) => (
      <Switch
        ref={field.ref}
        onChange={field.onChange}
        isChecked={field.value}
        isInvalid={formState.errors[name]}
        {...rest}
      />
    ),
    [formState.errors, rest, name]
  );

  const rules = useMemo(
    () => ({
      disabled,
      required,
    }),
    [disabled, required]
  );

  return (
    <FormControl w="fit-content">
      <FormLabel htmlFor={name} required={required}>
        {label}
      </FormLabel>
      <div className={styles.switchContainer}>
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

export default memo(SwitchInput);
