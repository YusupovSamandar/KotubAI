import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Space, Modal } from 'antd';
import {
  useDeleteSpeechToTextMutation,
  useGetHistoryMutation,
} from 'src/app/services/uploads';
import { red } from '@ant-design/colors';
import type { MenuProps } from 'antd';

const ActionsDropdown = ({
  itemId,
  editClick,
}: {
  itemId: number;
  editClick: () => void;
}) => {
  const navigate = useNavigate();
  const [deleteSpeechToText, { isLoading }] = useDeleteSpeechToTextMutation();
  const [updateHistory] = useGetHistoryMutation();

  const items: MenuProps['items'] = [
    {
      icon: <DeleteOutlined />,
      label: 'Delete',
      key: 'delete',
      onClick: () => {
        Modal.confirm({
          className: 'edit-confirm-modal',
          centered: true,
          title: 'Delete File?',
          content: 'This will delete the file permanently.',
          footer: (_, { OkBtn, CancelBtn }) => (
            <>
              <CancelBtn />
              <OkBtn />
            </>
          ),
          onOk: async () => {
            await deleteSpeechToText({ id: itemId }).unwrap();
            await updateHistory().unwrap();
            navigate('/');
          },
        });
      },
    },
    {
      icon: <EditOutlined />,
      label: 'Edit',
      key: 'edit',
      onClick: () => {
        editClick();
      },
    },
  ];
  return (
    <div>
      <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <MoreOutlined style={{ color: red[0] }} />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default ActionsDropdown;
