import {
  FormControl,
  FormLabel,
  InputGroup,
  Select,
  SelectProps,
} from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormError from '../FormError';

interface SelectOptions {
  key: string | number;
  label: string;
}

export interface SelectInputProps {
  label: string;
  name: string;
  options: Array<SelectOptions>;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
}

const SelectInput: React.FC<SelectInputProps & SelectProps> = ({
  label,
  name,
  required,
  disabled,
  options,
  ...rest
}) => {
  const { register, formState } = useFormContext();

  return (
    <FormControl>
      <FormLabel color="white">{label}</FormLabel>
      <InputGroup>
        <Select
          data-testid={name}
          isInvalid={formState.errors[name]}
          isDisabled={disabled}
          {...rest}
          {...register(name, {
            required,
            disabled,
          })}
        >
          {options.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </Select>
      </InputGroup>
      <FormError>{formState.errors[name]?.message}</FormError>
    </FormControl>
  );
};

export default SelectInput;
