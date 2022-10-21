import {
  FormControl,
  Input,
  InputGroup,
  InputProps,
  FormHelperText,
  FormErrorMessage,
  FormLabel,
  Button,
} from '@chakra-ui/react';

import React, { useCallback, useMemo, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from './FileInput.module.scss';

export interface FileInputProps extends InputProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  hint?: string;
}

const FileInput: React.FC<FileInputProps> = ({
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
  const { formState, control } = useFormContext();
  const { t } = useTranslation('editor');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const error = useMemo(
    () => formState.errors[name]?.message,
    [formState.errors, name]
  );

  const handleOpenFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

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
          <Controller
            control={control}
            name={name}
            render={({
              field: { onChange, onBlur, value, name: fieldName },
            }) => (
              <>
                <Input
                  className={className}
                  name={fieldName}
                  onChange={(event) => {
                    onChange(event.target.files?.item(0)?.path);
                  }}
                  onBlur={onBlur}
                  ref={inputRef}
                  defaultValue={defaultValue}
                  data-testid={name}
                  isInvalid={formState.errors[name]}
                  type="file"
                  hidden
                  isDisabled={disabled}
                  {...rest}
                />
                <Input value={value} disabled />
                <Button onClick={handleOpenFilePicker} size="sm">
                  {t('file_picker.label')}
                </Button>
              </>
            )}
          />
        </InputGroup>
      </div>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FileInput;
