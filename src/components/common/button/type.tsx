type ButtonColorAttribute = 'income' | 'outcome' | 'primary';

import { ButtonProps } from 'antd';

export interface CustomButtonProps extends ButtonProps {
  borderRadius?: number;
  fontSize?: number;
  color?: ButtonColorAttribute;
  colorBgContainer?: string;
  controlHeight?: number;
  paddingContentHorizontal?: number;
  colorText?: string;
}
