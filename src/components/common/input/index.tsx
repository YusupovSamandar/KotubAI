import { themeColors } from 'src/theme/index';
import { ConfigProvider, Input } from 'antd';
import { CustomInputProps } from './type';

function CustomInput({
  bgColor,
  borderRadius,
  borderColor,
  ...rest
}: CustomInputProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: themeColors.dark.primary,
        },
        components: {
          Input: {
            // colorBgContainer: bgColor || colors.light_gray,
            colorBorder: borderColor || themeColors.dark.stroke,
            // colorTextPlaceholder: colors.primary_05,
            // colorText: colors.primary,
            controlHeight: 48,
            borderRadius: borderRadius || 36,
            colorBgContainer: themeColors.dark.white,
          },
        },
      }}
    >
      <Input {...rest} />
    </ConfigProvider>
  );
}

export default CustomInput;
