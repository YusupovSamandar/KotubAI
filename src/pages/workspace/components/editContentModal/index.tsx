import { Button, Input, Modal } from 'antd';
import { useState } from 'react';
import { EditContentIcon } from 'src/assets/svg/dashboard_svg';
import { workspaceLanguageData } from '../../languageData';
import { useTypedSelector } from 'src/app/store';
import WorkspaceAudioPlayer from '../audio';
import {
  useEditArticleMutation,
  useEditSttMutation,
  useEditSummaryMutation,
  useEditTranslateMutation,
} from 'src/app/services/workspace-actions';
const { TextArea } = Input;

function EditContentModal({
  content,
  playerUrl,
  id,
  sttId,
  activeBtn,
  setPageContent,
}: {
  content: string;
  playerUrl?: string;
  sttId?: number;
  id: string;
  activeBtn: number | null;
  setPageContent: (content: string) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContentValue, setNewContentValue] = useState(content);
  const lang = useTypedSelector((state) => state.language);

  const [editStt, { isLoading: isLoadingStt }] = useEditSttMutation();
  const [editSummary, { isLoading: isLoadingSum }] = useEditSummaryMutation();
  const [editArticle, { isLoading: isLoadingArticle }] =
    useEditArticleMutation();
  const [editTranslate, { isLoading: isLoadingTranslate }] =
    useEditTranslateMutation();
  const isLoading =
    isLoadingStt || isLoadingSum || isLoadingArticle || isLoadingTranslate;

  const onChange = (e: any) => {
    setNewContentValue(e.target.value);
  };

  const saveNewChanges = async () => {
    const newTextObj = {
      output_text: newContentValue,
      serviceId: sttId,
      projectId: id,
    };
    if (!activeBtn) {
      await editStt(newTextObj);
    } else if (activeBtn === 1) {
      await editSummary(newTextObj);
    } else if (activeBtn === 2) {
      await editArticle(newTextObj);
    } else if (activeBtn === 3) {
      await editTranslate(newTextObj);
    }
    setPageContent(newContentValue);
    setIsModalOpen(false);
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
        onOk={saveNewChanges}
        confirmLoading={isLoading}
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
