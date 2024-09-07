import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from 'src/app/store';
import { Dropdown, Space, Modal } from 'antd';
import {
  useDeleteProjectMutation,
  useGetHistoryMutation,
} from 'src/app/services/uploads';
import { red } from '@ant-design/colors';
import type { MenuProps } from 'antd';
import { confirmData } from './data';

const ActionsDropdown = ({
  itemId,
  editClick,
}: {
  itemId: number;
  editClick: () => void;
}) => {
  const navigate = useNavigate();
  const [deleteSpeechToText, { isLoading }] = useDeleteProjectMutation();
  const lang = useTypedSelector((state) => state.language);
  const [updateHistory] = useGetHistoryMutation();

  const items: MenuProps['items'] = [
    {
      icon: <DeleteOutlined />,
      label: lang === 'en' ? 'delete' : lang === 'ru' ? 'удалить' : 'o`chirish',
      key: 'delete',
      onClick: () => {
        Modal.confirm({
          className: 'edit-confirm-modal',
          centered: true,
          title: confirmData[lang].title,
          content: confirmData[lang].content,
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
      label:
        lang === 'en' ? 'Edit' : lang === 'ru' ? 'редактировать' : 'tahrirlash',
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
