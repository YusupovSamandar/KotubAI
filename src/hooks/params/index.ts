import { useSearchParams } from 'react-router-dom';

export default function useParamsHook() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleMakeParams = (
    key: string,
    value: string,
    multipleValues?: {
      value: string;
      key: string;
    }[]
  ) => {
    if (multipleValues) {
      multipleValues.forEach((item) => {
        if (item.value) {
          if (searchParams.has(item.key))
            searchParams.set(item.key, item.value);
          else searchParams.append(item.key, item.value);
        } else searchParams.delete(item.key);
      });
      setSearchParams(searchParams);
    } else {
      if (value) {
        if (searchParams.has(key)) searchParams.set(key, value);
        else searchParams.append(key, value);
      } else searchParams.delete(key);
      setSearchParams(searchParams);
    }
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
