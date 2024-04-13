import { useEffect, useState } from 'react';
import AmountFormItem from './AmountFormItem';
import CurrenciesFormItem from './CurrenciesFormItem';

interface Props {
  form?: any;
  name_amount?: string;
}

export default function UsdAmountFormItem({
  form,
  name_amount = 'cost',
}: Props) {
  const [currency, setCurrency] = useState('uzs');
  const [costUsd, setCostUsd] = useState(0);
  const [rate, setRate] = useState(0);
  const onChangeUsd = (val: number, type: 'cost' | 'rate') => {
    let cost = 0;
    if (type === 'cost') {
      cost = val * rate;
      setCostUsd(val);
    } else if (type === 'rate') {
      cost = val * costUsd;
      setRate(val);
    }
    form.setFieldsValue({ [name_amount]: cost });
  };

  const name_amount_usd = name_amount + '_usd';
  let defCurrency = form.getFieldValue('currency');
  let defCostUsd = form.getFieldValue(name_amount_usd);
  let defRate = form.getFieldValue('exchange_rate');

  useEffect(() => {
    if (defCurrency) setCurrency(defCurrency);
  }, [defCurrency]);

  useEffect(() => {
    if (defCostUsd) setCostUsd(defCostUsd);
  }, [defCostUsd]);

  useEffect(() => {
    if (defRate) setRate(defRate);
  }, [defRate]);

  return (
    <>
      {/* Currency */}
      <CurrenciesFormItem
        className="half"
        onChange={(val) => setCurrency(val)}
      />

      {/* Cost */}
      <AmountFormItem
        name={name_amount}
        label="Narx (so`m)"
        className="half"
        placeholder="Narxni kiriting"
        required
        message={'Narxni kiriting'}
        disabled={currency === 'usd'}
      />

      {currency === 'usd' && (
        <>
          {/* Cost usd */}
          <AmountFormItem
            name={name_amount_usd}
            label="Narx (do`llar)"
            className="half"
            placeholder="Narxni kiriting"
            required
            message={'Narxni kiriting'}
            onChange={(val) => onChangeUsd(val, 'cost')}
          />
          {/* Exchange rate */}
          <AmountFormItem
            name="exchange_rate"
            label="Valyuta kursi (1 do`llar uchun)"
            className="half"
            placeholder="Kursni kiriting"
            required
            message={'Kursni kiriting'}
            onChange={(val) => onChangeUsd(val, 'rate')}
          />
        </>
      )}
    </>
  );
}
