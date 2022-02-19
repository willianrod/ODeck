import React from 'react';
import { FormProvider } from 'react-hook-form';

interface FormProps {
  form: any;
  onSubmit(values: unknown): any;
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
