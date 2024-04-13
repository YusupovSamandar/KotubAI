import { Button, ConfigProvider } from 'antd';
import { CustomButtonProps } from './type';
import { themeColors } from 'src/theme/index';

function CustomButton({
  color,
  fontSize = 18,
  borderRadius = 36,
  colorBgContainer = themeColors.dark.primary,
  controlHeight = 44,
  paddingContentHorizontal = 150,
  colorText = '#29CB8A',
  ...rest
}: CustomButtonProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            fontSize: fontSize,
            colorBgContainer: colorBgContainer,
            colorPrimary: themeColors.dark.primary,
            colorPrimaryActive: null || '',
            colorPrimaryHover: null || '',
            borderRadius: borderRadius,
            controlHeight: controlHeight || 33,
            colorText: colorText || 'white',
            colorBorder: null || '',
          },
        },
      }}
    >
      <Button {...rest} />
    </ConfigProvider>
  );
}

export default CustomButton;
