import { Button } from 'antd';
import '../modal.scss';
import 'src/styles/help.scss';

interface Props {
  okText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onOk?: () => void;
  okLoading?: boolean;
  okDisabled?: boolean;
}

function ModalFooter({
  okText,
  cancelText,
  onCancel,
  onOk,
  okLoading,
  okDisabled,
}: Props) {
  return (
    <div className="modal-footer">
      <Button onClick={() => onCancel?.()} className="modal-cancel-btn">
        {cancelText ?? 'Bekor qilish'}
      </Button>
      <Button
        type="primary"
        htmlType="submit"
        loading={okLoading}
        onClick={() => onOk?.()}
        className="modal-add-btn"
        disabled={okDisabled}
      >
        {okText || 'Saqlash'}
      </Button>
    </div>
  );
}

export default ModalFooter;
