import { useState, SetStateAction, Dispatch } from 'react';
import Greeting from './components/greeting';
import Select from './components/select';
export default function Main() {
  const [actionType, setActionType] = useState<'s-t-t' | 'lucy' | 't-t-s'>(
    's-t-t'
  );
  return (
    <div className="main-page">
      <Select
        optionsValue={actionType}
        setActionType={setActionType as Dispatch<SetStateAction<string>>}
      />
      <Greeting actionType={actionType} />
    </div>
  );
}
