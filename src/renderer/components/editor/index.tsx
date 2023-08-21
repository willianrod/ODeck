import { useCallback, useEffect } from 'react';
import {
  Button,
  Grid,
  GridItem,
  Heading,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import Form from 'renderer/components/Form';
import CheckboxInput from 'renderer/components/Form/CheckboxInput';
import TextInput from 'renderer/components/Form/TextInput';
import KeyTypes from 'server/enums/keys.enum';
import { IPage } from 'interfaces';
import { deleteKey, updateKey } from 'renderer/redux/ducks/keys';
import { MdDragIndicator } from 'react-icons/md';
import styles from './home.module.css';
import SelectInput from '../Form/SelectInput';
import ColorInput from '../Form/ColorInput';
import InputBindings from '../Form/InputBindings';
import FileInput from '../Form/FileInput';

const Editor = () => {
  const { t } = useTranslation('editor');

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
            bindings: values.bindings,
            url: values.url,
            pageId: values.destinationPageId,
            soundPath: values.soundPath,
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
    if (!currentKey) return null;

    switch (currentKey.type) {
      case KeyTypes.EXECUTABLE:
        return (
          <FileInput
            name="exePath"
            label={t('label.path')}
            defaultValue=""
            maxLength={200}
            accept=".exe"
            size="md"
          />
        );
      case KeyTypes.HOTKEY:
        return (
          <InputBindings
            name="bindings"
            label={t('label.bindings')}
            defaultValue=""
            maxLength={200}
            size="md"
          />
        );
      case KeyTypes.SOUND:
        return (
          <FileInput
            name="soundPath"
            label={t('label.play_sound')}
            defaultValue=""
            maxLength={200}
            accept=".mp3,.wav"
            size="md"
          />
        );
      case KeyTypes.URL:
        return (
          <TextInput
            size="md"
            name="url"
            label={t('label.url')}
            defaultValue=""
            maxLength={200}
            hint={t('hint.url')}
          />
        );

      case KeyTypes.NAVIGATE:
        return (
          <SelectInput
            name="destinationPageId"
            label={t('label.page')}
            options={pages?.map((p: IPage) => ({ key: p.id, label: p.name }))}
          />
        );

      default:
        return null;
    }
  };

  const renderInputs = () => {
    return (
      <Form form={form} onSubmit={handleSubmit}>
        <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
          <GridItem colSpan={1}>
            <TextInput
              name="label"
              label={t('label.label')}
              defaultValue=""
              maxLength={100}
              size="md"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <ColorInput
              name="backgroundColor"
              label={t('label.background_color')}
              defaultValue="#fff"
              size="md"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <TextInput
              name="backgroundUrl"
              label={t('label.background_url')}
              defaultValue=""
              maxLength={1000}
              size="md"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <ColorInput
              name="color"
              label={t('label.text_color')}
              defaultValue=""
              size="md"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <CheckboxInput name="hideLabel" label={t('label.hide_label')} />
          </GridItem>
        </Grid>

        {renderInputByType()}

        <div className={styles.buttons}>
          <Button onClick={handleDeleteKey} color="red.500">
            {t('label.remove')}
          </Button>
          <Button
            className={styles.saveButton}
            colorScheme="teal"
            type="submit"
          >
            {t('label.save')}
          </Button>
        </div>
      </Form>
    );
  };

  const renderEmptyContent = () => {
    return (
      <Flex justifyContent="center" alignItems="center" h="100%" w="100%">
        <Box
          bg="gray.800"
          position="relative"
          borderRadius={8}
          padding={8}
          width="60%"
        >
          <Flex justifyContent="center">
            <Flex
              width={12}
              position="absolute"
              top={-6}
              height={12}
              alignItems="center"
              justifyContent="center"
              bgColor="teal"
              borderRadius="50%"
              mb={4}
            >
              <MdDragIndicator size={26} />
            </Flex>
          </Flex>
          <Heading as="h4" size="md" mb={2} textAlign="left">
            {t('empty.title')}
          </Heading>
          <Text fontSize="lg" color="gray.500">
            {t('empty.description')}
          </Text>
        </Box>
      </Flex>
    );
  };

  useEffect(() => {
    const exePath = currentKey?.actionConfig?.exePath || '';
    const bindings = currentKey?.actionConfig?.bindings?.join(',') || '';
    const url = currentKey?.actionConfig?.url || '';
    const soundPath = currentKey?.actionConfig?.soundPath || '';
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
      soundPath,
    });
  }, [form, currentKey]);

  if (!currentKey?.id) return renderEmptyContent();

  return renderInputs();
};

export default Editor;
