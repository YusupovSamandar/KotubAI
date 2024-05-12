import { Spin } from 'antd';
import { heavyLoadSpinnerLang } from './langData';
import { useTypedSelector } from 'src/app/store';
export default function HeavyLoadSpinner({ children, isLoading }) {
  const currentLang = useTypedSelector((state) => state.language);
  if (!isLoading) {
    return children;
  }
  return (
    <Spin tip={heavyLoadSpinnerLang[currentLang].message}>{children}</Spin>
  );
}
