import { Button, Input, Modal } from 'antd';
import { useState } from 'react';
import { EditContentIcon } from 'src/assets/svg/dashboard_svg';
import { workspaceLanguageData } from '../../languageData';
import { useTypedSelector } from 'src/app/store';
import WorkspaceAudioPlayer from '../audio';
const { TextArea } = Input;

function EditContentModal({
  content,
  playerUrl,
}: {
  content: string;
  playerUrl?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContentValue, setNewContentValue] = useState(content);
  const lang = useTypedSelector((state) => state.language);

  const onChange = (e: any) => {
    setNewContentValue(e.target.value);
  };

  return (
    <div>
      <Button
        style={{
          backgroundColor: 'unset',
          border: 'none',
        }}
        onClick={() => setIsModalOpen(true)}
        icon={<EditContentIcon />}
      ></Button>
      <Modal
        className="workspace-content_editModal"
        // footer={null}
        okText={workspaceLanguageData[lang].save}
        cancelText={workspaceLanguageData[lang].modal.confirms.cancel}
        centered
        title={null}
        open={isModalOpen}
        onOk={() => {}}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        {playerUrl && (
          <div>
            <br />
            <br />
            <WorkspaceAudioPlayer audioUrl={playerUrl} />
          </div>
        )}
        <TextArea
          className="workspace-content_editModal-textArea"
          rows={10}
          value={newContentValue}
          onChange={onChange}
        />
      </Modal>
    </div>
  );
}

export default EditContentModal;
