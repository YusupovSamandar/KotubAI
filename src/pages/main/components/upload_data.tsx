import React from 'react';
import { UZBflag } from './../../../assets/svg/dashboard_svg';
interface OptionValueProps {
  component: React.ElementType;
  txt: string;
}
const OptionValue: React.FC<OptionValueProps> = ({
  component: Component,
  txt,
}) => (
  <div className="language-opt">
    <Component /> {txt}
  </div>
);
const fileLanguageOptions = [
  {
    value: 'uz-UZ',
    label: <OptionValue component={UZBflag} txt="O'zbekcha" />,
  },
  {
    value: 'ru-RU',
    label: (
      <div>
        <OptionValue component={UZBflag} txt="Русский" />
      </div>
    ),
  },
  {
    value: 'en-US',
    label: <OptionValue component={UZBflag} txt="English" />,
  },
];

export default fileLanguageOptions;
