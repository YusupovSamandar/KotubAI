import { ConfigProvider } from 'antd';
import { ProviderProps } from '../type';
import { useTypedSelector } from 'src/app/store';
import { themeColors } from 'src/theme';
import useHelper from './useHelper';

function AntConfigProvider({ children }: ProviderProps) {
  const { colors } = useTypedSelector((state) => state.layout);
  useHelper();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.primary,
          colorBorder: colors.stroke,
          colorBgBase: colors.form_bg,
          colorText: colors.white,
          colorTextDisabled: colors.silver,
          colorTextPlaceholder: colors.silver,
          fontSize: 14,
          fontFamily: 'Poppins',
        },
        components: {
          Button: {
            controlHeight: 40,
            borderRadius: 48,
            paddingContentHorizontal: 20,
            colorBorder: colors.primary,
            colorText: colors.primary,
            colorIcon: colors.primary,
          },
          Input: {
            borderRadius: 24,
            controlHeight: 40,
            hoverBorderColor: colors.primary,
          },
          InputNumber: {
            borderRadius: 24,
            controlHeight: 40,
          },
          Select: {
            borderRadius: 24,
            controlHeight: 40,
            optionSelectedBg: colors.silver,
            colorBorder: colors.selectTxtColor,
            colorText: colors.selectTxtColor,
          },
          Badge: {
            colorText: colors.white,
          },
          Table: {
            colorBgBase: colors.dark,
            borderColor: colors.onyx,
            colorText: themeColors.light.tableText,
            rowHoverBg: colors.over_dark_2x,
            stickyScrollBarBg: 'green',
            stickyScrollBarBorderRadius: 1,
          },
          Breadcrumb: {
            itemColor: colors.taupe_gray,
            linkColor: colors.taupe_gray,
            separatorColor: colors.taupe_gray,
          },
          Modal: {
            paddingContentHorizontal: 0,
            contentBg: colors.over_dark,
            headerBg: colors.over_dark,
            borderRadius: 32,
            borderRadiusOuter: 32,
          },
          Form: {
            labelColor: colors.white,
            labelFontSize: 12,
          },
          Segmented: {
            colorText: colors.white,
            controlHeight: 42,
            borderRadius: 32,
            borderRadiusLG: 32,
            borderRadiusSM: 32,
            controlPaddingHorizontal: 38,
          },
          DatePicker: {
            controlHeight: 40,
          },
          Pagination: {
            fontSize: 12,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntConfigProvider;
