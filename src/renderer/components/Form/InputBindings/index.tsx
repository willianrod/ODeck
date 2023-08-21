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
import useRecordKeybindings from 'hooks/useRecordKeybindings';

import React, { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from './InputBindings.module.scss';

export interface InputBindingsProps extends InputProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  hint?: string;
}

const InputBindings: React.FC<InputBindingsProps> = ({
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
  const { register, formState, setValue } = useFormContext();
  const { t } = useTranslation('editor');

  const handleEnd = useCallback(
    (keys: string[]) => {
      setValue(name, keys);
    },
    [setValue, name]
  );

  const { startRecording, stopRecording, isRecording } = useRecordKeybindings({
    onEnd: handleEnd,
  });

  const error = useMemo(
    () => formState.errors[name]?.message,
    [formState.errors, name]
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
            isDisabled
            {...rest}
            {...register(name, { required, disabled, maxLength })}
          />
          <Button
            size="sm"
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording
              ? t('bindings.stop_recording')
              : t('bindings.start_recording')}
          </Button>
        </InputGroup>
      </div>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputBindings;
