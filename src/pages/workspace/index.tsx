import {
  Button,
  Input,
  Modal,
  Skeleton,
  Spin,
  Typography,
  message,
  Col,
  Row,
} from 'antd';
import { useEffect, useState } from 'react';
import { FileTextOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { useGetSpeechToTextMutation } from 'src/app/services/uploads';
import { ISpeechToTextRes } from 'src/app/services/uploads/type';
import { CopyIcon, MusicSvg } from 'src/assets/svg/dashboard_svg';
import BtnGroup from './components/btnGroup';
import FileCmp from './components/fileCmp';
import './styles.scss';
import { useTypedSelector } from 'src/app/store';
import useWorkspace from './useWorkspace';
import { workspaceLanguageData } from './languageData';
import HeavyLoadSpinner from 'src/components/common/heavyLoadSpinner';
const { Paragraph } = Typography;
const { TextArea } = Input;

function Workspace() {
  const { id } = useParams();
  const [activeBtn, setActiveBtn] = useState(null);
  const { isMobile } = useTypedSelector((state) => state.layout);
  const lang = useTypedSelector((state) => state.language);
  const [data, setData] = useState<ISpeechToTextRes>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionsLoading, setActionsLoading] = useState(false);
  const [executeFC, setExecuteFC] = useState<number>(null);
  const [question, setQuestion] = useState<string>('');
  const [showPageContent, setShowPageContent] = useState<boolean>(true);
  const [isTranscriptActive, setIsTranscriptActive] = useState<boolean>(true);

  const {
    pageContent,
    actionsList,
    actionsLangList,
    activeLangBtn,
    activeArticleType,
    articleTypes,
    fileURL,
    setPageContent,
  } = useWorkspace();

  const [getWorkspaceContent, { isLoading }] = useGetSpeechToTextMutation();

  useEffect(() => {
    getWorkspaceContent(id)
      .unwrap()
      .then((res) => {
        if (res.result_text && res.result_docx) {
          setData(res);
          setPageContent(res.result_text);
        }
      });
  }, []);
  if (isLoading && !data) {
    return;
  }
  return (
    <div className="main-loading-wrapper">
      <HeavyLoadSpinner
        txt={workspaceLanguageData[lang].pageOnLoad}
        isLoading={!data && !isLoading}
      >
        <div className="workspace-load-wrapper">
          <div className="workspace">
            <div
              style={{ margin: isMobile ? '0px 0 30px 0' : '47px 0 100px 0' }}
            >
              <FileCmp
                Icon={MusicSvg}
                fileTxt={data?.file_name}
                downloadUrl={data?.result_docx}
              />
            </div>
            <div className="workspace-buttons">
              <div className="workspace-buttons-item">
                <Button
                  disabled={actionsLoading}
                  className={isTranscriptActive ? 'active' : ''}
                  type={isTranscriptActive ? 'primary' : 'default'}
                  shape="round"
                  onClick={() => {
                    setActiveBtn(null);
                    setShowPageContent(!isTranscriptActive);
                    setIsTranscriptActive((prev) => !prev);
                    if (!isTranscriptActive) {
                      setPageContent(data.result_text);
                    }
                  }}
                  icon={<FileTextOutlined />}
                  size={'large'}
                >
                  {workspaceLanguageData[lang].transcript}
                </Button>
              </div>
              {actionsList.map((action) => (
                <div className="workspace-buttons-item" key={action.id}>
                  <Button
                    key={action.id}
                    disabled={actionsLoading}
                    className={action.id === activeBtn ? 'active' : ''}
                    type={action.id === activeBtn ? 'primary' : 'default'}
                    shape="round"
                    onClick={() => {
                      // setIsTranscriptActive(false);
                      setIsModalOpen(true);
                      setExecuteFC(action.id);
                      // await action.onclickFC(data);
                    }}
                    icon={<action.Icon />}
                    size={'large'}
                  >
                    {action.label}
                  </Button>
                </div>
              ))}
            </div>
            {showPageContent &&
              (!pageContent ? (
                <>
                  {!actionsLoading ? (
                    <FileCmp
                      Icon={MusicSvg}
                      downloadUrl={fileURL}
                      fileTxt={fileURL}
                    />
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Spin />
                    </div>
                  )}
                </>
              ) : (
                <div className="workspace-results">
                  <Typography>
                    {!actionsLoading ? (
                      pageContent.split('\n').map((line, index) => (
                        <Paragraph key={index} style={{ color: '#fff' }}>
                          {line}
                          <br />
                        </Paragraph>
                      ))
                    ) : (
                      <Skeleton
                        className="custom-skeleton"
                        active
                        title={false}
                        paragraph={{ rows: 4 }}
                      />
                    )}
                    {!actionsLoading && pageContent.length > 1 && (
                      <div style={{ textAlign: 'right' }}>
                        {contextHolder}
                        <Button
                          onClick={() => {
                            navigator.clipboard
                              .writeText(pageContent)
                              .then(() => {
                                messageApi.open({
                                  type: 'success',
                                  content: 'copied to clipboard',
                                });
                              });
                          }}
                          style={{ border: 'none', background: 'none' }}
                        >
                          <CopyIcon />
                        </Button>
                      </div>
                    )}
                  </Typography>
                </div>
              ))}
            <br />
            <Link to="/">
              <Button type="primary" className="create-btn-worspace-mobile">
                {workspaceLanguageData[lang].uploadNewFileTxt}
              </Button>
            </Link>
          </div>
        </div>
      </HeavyLoadSpinner>

      <Modal
        okText={workspaceLanguageData[lang].modal.confirms.ok}
        cancelText={workspaceLanguageData[lang].modal.confirms.cancel}
        centered
        title={
          executeFC === 4
            ? workspaceLanguageData[lang].modal.askQuestion.label
            : workspaceLanguageData[lang].modal.summarize.language
        }
        open={isModalOpen}
        onOk={() => {
          (async function () {
            setActionsLoading(true);
            setIsModalOpen(false);

            const execObj = actionsList.find(
              (action) => action.id === executeFC
            );
            if (executeFC === 1 || executeFC === 3) {
              await execObj.onclickFC(data, activeLangBtn);
            } else if (executeFC === 2) {
              await execObj.onclickFC(data, activeLangBtn, activeArticleType);
            } else if (executeFC === 4) {
              await execObj.onclickFC(data, question);
            }
            setIsTranscriptActive(false);
            setActiveBtn(executeFC);
            setActionsLoading(false);
          })();
        }}
        onCancel={() => {
          setIsModalOpen(false);
          // setActiveBtn(null);
        }}
      >
        {executeFC === 4 ? (
          <>
            <TextArea
              style={{
                minWidth: '300px',
                width: '600px',
                margin: '10px 0',
                padding: '10px 20px',
              }}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={6}
            />
            <br />
            <br />
          </>
        ) : (
          <BtnGroup
            btns={actionsLangList}
            activeLangBtn={activeLangBtn}
            activeActionId={executeFC}
            activeArticleType={activeArticleType}
            articleTypes={articleTypes}
          />
        )}
      </Modal>
    </div>
  );
}

export default Workspace;
