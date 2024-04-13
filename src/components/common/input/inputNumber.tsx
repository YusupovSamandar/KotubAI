import { ConfigProvider, InputNumber } from 'antd';
import { themeColors } from 'src/theme/index';
import { CustomInputNumberProps } from './type';

function CustomInputNumber({
  bgColor,
  borderRadius,
  borderColor,
  ...rest
}: CustomInputNumberProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: themeColors.dark.primary,
        },
        components: {
          InputNumber: {
            // colorBgContainer: bgColor || colors.light_gray,
            // colorBorder: borderColor || colors.dark_gray,
            // colorTextPlaceholder: colors.primary_05,
            // colorText: colors.primary,
            controlHeight: 48,
            borderRadius: borderRadius || 8,
          },
        },
      }}
    >
      <InputNumber {...rest} />
    </ConfigProvider>
  );
}

export default CustomInputNumber;
