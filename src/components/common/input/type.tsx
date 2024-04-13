import { InputNumberProps, InputProps } from 'antd';

export interface CustomInputProps extends InputProps {
  borderRadius?: number;
  height?: number;
  borderColor?: string;
  bgColor?: string;
  masked?: boolean;
}

export interface CustomInputNumberProps extends InputNumberProps {
  borderRadius?: number;
  height?: number;
  borderColor?: string;
  bgColor?: string;
  masked?: boolean;
}
