import { ReactElement, useCallback, useEffect, useMemo } from 'react';
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
import { FieldValues, useForm } from 'react-hook-form';
import { AnyAction } from 'redux';

import Form from 'renderer/components/Form';
import CheckboxInput from 'renderer/components/Form/CheckboxInput';
import TextInput from 'renderer/components/Form/TextInput';
import KeyTypes from 'server/enums/keys.enum';
import {
  HandlerConfig,
  HandlerInput,
  HandlerInputValues,
  IActionConfig,
  IButtonKey,
  IPage,
} from 'interfaces';
import { deleteKey, updateKey } from 'renderer/redux/ducks/keys';
import { MdDragIndicator } from 'react-icons/md';
import styles from './home.module.css';
import SelectInput from '../Form/SelectInput';
import ColorInput from '../Form/ColorInput';
import InputBindings from '../Form/InputBindings';
import FileInput from '../Form/FileInput';

const HandlerInputs: React.FC<{
  inputs: [HandlerInputValues<unknown>] | never[];
}> = ({ inputs }) => {
  const { t } = useTranslation('handlers');
  const { pages } = useSelector((state: any) => ({
    pages: state.pages.items,
  }));

  const renderInputByType = ({
    type,
    props,
    description,
    label,
  }: HandlerInputValues<unknown>) => {
    switch (type) {
      case 'file':
        return (
          <FileInput
            name={`actionConfig.${props.name}`}
            label={t(label)}
            defaultValue={props.defaultValue}
            maxLength={props.maxLength}
            accept={props.accept}
            hint={t(description)}
            size="md"
          />
        );
      case 'hotkey':
        return (
          <InputBindings
            name={`actionConfig.${props.name}`}
            label={t(label)}
            defaultValue={props.defaultValue}
            maxLength={props.maxLength}
            hint={t(description)}
            size="md"
          />
        );
      case 'pages':
        return (
          <SelectInput
            name={`actionConfig.${props.name}`}
            label={t(label)}
            options={pages?.map((p: IPage) => ({ key: p.id, label: p.name }))}
          />
        );
      case 'string':
        return (
          <TextInput
            size="md"
            name={`actionConfig.${props.name}`}
            label={t(label)}
            defaultValue={props.defaultValue}
            maxLength={props.maxLength}
            hint={t(description)}
          />
        );

      default:
        return null;
    }
  };

  return <>{inputs?.map(renderInputByType)}</>;
};

const Editor = () => {
  const { t } = useTranslation('editor');

  const { currentKey, pages, handlers } = useSelector((state: any) => ({
    currentKey: state.keys.currentKey as IButtonKey,
    pages: state.pages.items,
    handlers: state.handlers,
  }));

  const dispatch = useDispatch();

  const form = useForm<FieldValues>({
    mode: 'onSubmit',
    defaultValues: {
      actionConfig: {},
    },
  });

  const inputs = useMemo(() => {
    if (!currentKey?.type) return [];
    const tempInputs = handlers.reduce(
      (
        acc: { [key in KeyTypes]: HandlerInput<unknown> },
        curr: HandlerConfig<unknown>
      ) => {
        return {
          ...acc,
          ...curr.inputs,
        };
      },
      {}
    );

    return tempInputs[currentKey.type] as HandlerInput<unknown>;
  }, [currentKey, handlers]);

  const handleSubmit = useCallback(
    ({ pageId, ...values }: FieldValues) => {
      dispatch(
        updateKey({
          ...currentKey,
          ...values,
        }) as unknown as AnyAction
      );
    },
    [dispatch, currentKey]
  );

  const handleDeleteKey = useCallback(() => {
    dispatch(deleteKey(currentKey) as unknown as AnyAction);
  }, [dispatch, currentKey]);

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

        <HandlerInputs inputs={inputs} />

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
    const values = {} as { [key: string]: unknown };
    inputs?.forEach((input) => {
      if (!currentKey?.actionConfig)
        values[input.props.name] = input.props.defaultValue;
      else
        values[input.props.name] =
          currentKey.actionConfig[input.props.name as keyof IActionConfig] ||
          input.props.defaultValue;
    });

    form.reset({
      label: currentKey?.label || '',
      backgroundColor: currentKey?.backgroundColor || '',
      backgroundUrl: currentKey?.backgroundUrl || '',
      color: currentKey?.color || '#fff',
      hideLabel: currentKey?.hideLabel || '',
      actionConfig: values,
    });
  }, [form, currentKey, handlers, inputs]);

  if (!currentKey?.id) return renderEmptyContent();

  return renderInputs();
};

export default Editor;
