import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { HandlerInput, IPage } from 'interfaces';
import FileInput from '../Form/FileInput';
import InputBindings from '../Form/InputBindings';
import SelectInput from '../Form/SelectInput';
import TextInput from '../Form/TextInput';
import ColorInput from '../Form/ColorInput';

const HandlerInputs: React.FC<{
  inputs: HandlerInput[] | never[];
  prefix?: string;
}> = ({ inputs, prefix }) => {
  const { t } = useTranslation('handlers');
  const { pages } = useSelector((state: any) => ({
    pages: state.pages.items,
  }));

  const renderInputByType = ({
    type,
    name,
    defaultValue,
    props,
    description,
    label,
  }: HandlerInput) => {
    switch (type) {
      case 'file':
        return (
          <FileInput
            key={name}
            name={prefix ? [prefix, name].join('.') : name}
            label={t(label)}
            defaultValue={defaultValue}
            hint={t(description)}
            size="md"
            {...props}
          />
        );
      case 'hotkey':
        return (
          <InputBindings
            key={name}
            name={prefix ? [prefix, name].join('.') : name}
            label={t(label)}
            defaultValue={defaultValue}
            hint={t(description)}
            size="md"
            {...props}
          />
        );
      case 'pages':
        return (
          <SelectInput
            key={name}
            name={prefix ? [prefix, name].join('.') : name}
            label={t(label)}
            options={pages?.map((p: IPage) => ({ key: p.id, label: p.name }))}
            {...props}
          />
        );
      case 'string':
        return (
          <TextInput
            key={name}
            size="md"
            name={prefix ? [prefix, name].join('.') : name}
            label={t(label)}
            defaultValue={defaultValue}
            hint={t(description)}
            {...props}
          />
        );
      case 'color':
        return (
          <ColorInput
            key={name}
            size="md"
            name={prefix ? [prefix, name].join('.') : name}
            label={t(label)}
            defaultValue={defaultValue}
            {...props}
          />
        );

      default:
        return null;
    }
  };

  return <>{inputs?.map(renderInputByType)}</>;
};

export default HandlerInputs;
