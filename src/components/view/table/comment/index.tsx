import { Modal } from 'antd';
import { useState } from 'react';
import { useModalHeaderClick } from '../../modal/useModalHeaderClick';

interface IProps {
  comment: string;
  width?: number;
}

export default function TableComment({ comment, width }: IProps) {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useModalHeaderClick(handleCancel);

  return (
    <div className="table-comment" style={width ? { width } : {}}>
      <p onClick={showModal}>{comment}</p>
      <Modal title={'Izoh'} open={open} onCancel={handleCancel} footer={null}>
        <p>{comment}</p>
      </Modal>
    </div>
  );
}
