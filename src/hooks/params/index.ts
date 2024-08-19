import { useSearchParams } from 'react-router-dom';

export default function useParamsHook() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleMakeParams = (key: string, value: string) => {
    if (value) {
      if (searchParams.has(key)) searchParams.set(key, value);
      else searchParams.append(key, value);
    } else searchParams.delete(key);
    setSearchParams(searchParams);
  };
  const handleRemoveAllParams = () => {
    setSearchParams(new URLSearchParams());
  };

  return {
    searchParams,
    handleMakeParams,
    handleRemoveAllParams,
  };
}
