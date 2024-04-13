import { Modal } from 'antd';
import { Edit2, Trash } from 'iconsax-react';
import { useState } from 'react';
import { useTypedSelector } from 'src/app/store';
import ModalFooter from '../../modal/footer';
import { useModalHeaderClick } from '../../modal/useModalHeaderClick';
import '../table.scss';

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
  deleteText?: string;
  editVisible?: boolean;
}

function TableActions({
  onEdit,
  onDelete,
  deleteText,
  editVisible = true,
}: Props) {
  const { colors } = useTypedSelector((state) => state.layout);
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onDelete?.();
    setOpen(false);
  };

  const closeModal = () => {
    setOpen(false);
  };
  useModalHeaderClick(closeModal);

  return (
    <div className="table-action">
      {editVisible && (
        <div onClick={onEdit}>
          <Edit2 size="20" color={colors.primary} variant="Bold" />
        </div>
      )}

      <div onClick={() => setOpen(true)}>
        <Trash size="20" color={colors.primary} variant="Bold" />
      </div>

      {open && (
        <Modal
          title="O`chhirishni tasdiqlaysizmi?"
          open={open}
          onCancel={closeModal}
          footer={null}
          width={400}
        >
          <ModalFooter
            onCancel={closeModal}
            onOk={handleConfirm}
            okText="Ha"
            cancelText="Yo`q"
          />
        </Modal>
      )}
    </div>
  );
}

export default TableActions;
