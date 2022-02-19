import { useCallback, useEffect } from 'react';
import { Button, Grid, GridItem } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Form from 'renderer/components/Form';
import CheckboxInput from 'renderer/components/Form/CheckboxInput';
import TextInput from 'renderer/components/Form/TextInput';
import KeyTypes from 'server/enums/keys.enum';
import { IPage } from 'interfaces';
import { deleteKey, updateKey } from 'renderer/redux/ducks/keys';
import styles from './home.module.css';
import SelectInput from '../Form/SelectInput';
import ColorInput from '../Form/ColorInput';

const Editor = () => {
  const { currentKey, pages } = useSelector((state: any) => ({
    currentKey: state.keys.currentKey,
    pages: state.pages.items,
  }));

  const dispatch = useDispatch();

  const form = useForm<any>({
    mode: 'onSubmit',
    defaultValues: {},
  });

  const handleSubmit = useCallback(
    (values) => {
      dispatch(
        updateKey({
          ...currentKey,
          ...values,
          actionConfig: {
            exePath: values.exePath,
            bindings: values.bindings?.split(','),
            url: values.url,
            pageId: values.destinationPageId,
          },
        })
      );
    },
    [dispatch, currentKey]
  );

  const handleDeleteKey = useCallback(() => {
    dispatch(deleteKey(currentKey));
  }, [dispatch, currentKey]);

  const renderInputByType = () => {
    if (currentKey?.type === KeyTypes.EXECUTABLE) {
      return (
        <TextInput
          name="exePath"
          label="Path"
          defaultValue=""
          maxLength={200}
          size="md"
        />
      );
    }
    if (currentKey?.type === KeyTypes.HOTKEY) {
      return (
        <TextInput
          name="bindings"
          label="Bindings"
          defaultValue=""
          maxLength={200}
          size="md"
        />
      );
    }
    if (currentKey?.type === KeyTypes.URL) {
      return (
        <TextInput
          size="md"
          name="url"
          label="URL"
          defaultValue=""
          maxLength={200}
          hint="Place here the URL you want to open when the button is pressed"
        />
      );
    }

    if (currentKey?.type === KeyTypes.NAVIGATE) {
      return (
        <SelectInput
          name="destinationPageId"
          label="Page"
          options={pages?.map((p: IPage) => ({ key: p.id, label: p.name }))}
        />
      );
    }

    return null;
  };

  useEffect(() => {
    const exePath = currentKey?.actionConfig?.exePath || '';
    const bindings = currentKey?.actionConfig?.bindings?.join(',') || '';
    const url = currentKey?.actionConfig?.url || '';
    form.reset({
      destinationPageId: currentKey?.actionConfig?.pageId || '',
      label: currentKey?.label || '',
      backgroundColor: currentKey?.backgroundColor || '',
      backgroundUrl: currentKey?.backgroundUrl || '',
      color: currentKey?.color || '#fff',
      hideLabel: currentKey?.hideLabel || '',
      exePath,
      bindings,
      url,
    });
  }, [form, currentKey]);

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
        <GridItem colSpan={1}>
          <TextInput
            name="label"
            label="Label"
            defaultValue=""
            maxLength={100}
            size="md"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <ColorInput
            name="backgroundColor"
            label="Background Color"
            defaultValue="#fff"
            size="md"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <TextInput
            name="backgroundUrl"
            label="Background URL"
            defaultValue=""
            maxLength={1000}
            size="md"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <ColorInput
            name="color"
            label="Text Color"
            defaultValue=""
            size="md"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <CheckboxInput name="hideLabel" label="Hide Label" />
        </GridItem>
      </Grid>

      {renderInputByType()}

      <div className={styles.buttons}>
        <Button onClick={handleDeleteKey} color="red.500">
          Remove
        </Button>
        <Button className={styles.saveButton} colorScheme="teal" type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default Editor;
