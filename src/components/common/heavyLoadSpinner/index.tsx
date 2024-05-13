import { Spin } from 'antd';
import { heavyLoadSpinnerLang } from './langData';
import { useTypedSelector } from 'src/app/store';
export default function HeavyLoadSpinner({
  children,
  isLoading,
  txt,
}: {
  children: React.ReactNode;
  isLoading: boolean;
  txt?: string;
}) {
  const currentLang = useTypedSelector((state) => state.language);
  if (!isLoading) {
    return children;
  }
  return (
    <Spin tip={txt ? txt : heavyLoadSpinnerLang[currentLang].message}>
      {children}
    </Spin>
  );
}
