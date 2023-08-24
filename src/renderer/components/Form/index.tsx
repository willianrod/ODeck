import React, { ReactElement } from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

interface FormProps {
  form: UseFormReturn<FieldValues, object>;
  onSubmit(values: unknown): void;
  children: ReactElement | ReactElement[];
}

const Form: React.FC<FormProps> = ({ children, form, onSubmit }) => {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        style={{ width: '100%' }}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
