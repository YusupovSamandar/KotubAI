import {
  Button,
  Input,
  Modal,
  Skeleton,
  Spin,
  Typography,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import { FileTextOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { useGetProjectMutation } from 'src/app/services/uploads';
import { IProject, outputTypes } from 'src/app/services/uploads/type';
import { CopyIcon } from 'src/assets/svg/dashboard_svg';
import BtnGroup from './components/btnGroup';
import FileCmp from './components/fileCmp';
import './styles.scss';
import { useTypedSelector } from 'src/app/store';
import useWorkspace from './useWorkspace';
import { workspaceLanguageData } from './languageData';
import HeavyLoadSpinner from 'src/components/common/heavyLoadSpinner';
import Title from 'antd/es/typography/Title';
import { useGetProfileMutation } from 'src/app/services/auth';
import { TranscriptIcon } from './icons';
const { Paragraph } = Typography;
const { TextArea } = Input;

function Workspace() {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const { id: notifyID } = useTypedSelector((state) => state.notifySlice);
  const { isMobile } = useTypedSelector((state) => state.layout);
  const lang = useTypedSelector((state) => state.language);

  const [activeBtn, setActiveBtn] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionsLoading, setActionsLoading] = useState(false);
  const [executeFC, setExecuteFC] = useState<number>(null);
  const [question, setQuestion] = useState<string>('');

  const [contentType, setContentType] = useState<outputTypes>('text');
  const {
    data,
    setData,
    pageContent,
    actionsList,
    actionsLangList,
    activeLangBtn,
    activeArticleType,
    articleTypes,
    fileURL,
    setPageContent,
    setFileURL,
  } = useWorkspace();

  const [getWorkspaceContent, { isLoading }] = useGetProjectMutation();
  const [getProfile] = useGetProfileMutation();

  const fetchPageData = () => {
    getWorkspaceContent(id)
      .unwrap()
      .then((res) => {
        setContentType(res.output_type);
        setData(res);
        const responseTxt =
          res.action_type === 'stt'
            ? res[res.action_type].output_text
            : res[res.action_type][0].output_text;
        const responseFile =
          res.action_type === 'stt'
            ? res[res.action_type].output_docx
            : res[res.action_type][0].output_docx;
        setPageContent(responseTxt);
        setFileURL(responseFile);
        if (res.action_type !== 'stt') {
          setActiveBtn(
            res.action_type === 'summary'
              ? 1
              : res.action_type === 'article'
              ? 2
              : 3
          );
        } else {
          setContentType('docx');
        }
      });
  };

  useEffect(() => {
    if (notifyID === id) {
      fetchPageData();
    }
  }, [notifyID]);

  useEffect(() => {
    fetchPageData();
  }, []);
  if (isLoading && !data) {
    return;
  }
  return (
    <div className="main-loading-wrapper">
      <HeavyLoadSpinner
        txt={workspaceLanguageData[lang].pageOnLoad}
        isLoading={!data?.[data?.action_type] && !isLoading}
      >
        <div className="workspace-load-wrapper">
          <div className="workspace">
            <div
              style={{ margin: isMobile ? '0px 0 30px 0' : '47px 0 100px 0' }}
            >
              {/* <FileCmp
                fileTxt={workspaceLanguageData[lang].yourFile}
                downloadUrl={data?.input_file || '#'}
              /> */}
            </div>
            <div className="workspace-buttons">
              <div className="workspace-buttons-item">
                {data?.action_type === 'stt' && (
                  <Button
                    disabled={actionsLoading}
                    className={!activeBtn ? 'active' : ''}
                    type={!activeBtn ? 'primary' : 'default'}
                    shape="round"
                    onClick={() => {
                      setActiveBtn(null);
                      setPageContent(data.stt.output_text);
                      setFileURL(data.stt.output_docx);
                    }}
                    icon={<TranscriptIcon />}
                    size={'large'}
                  >
                    {workspaceLanguageData[lang].transcript}
                  </Button>
                )}
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
            {contentType === 'docx' ? (
              <>
                {!actionsLoading ? (
                  <FileCmp downloadUrl={fileURL} fileTxt={fileURL} />
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
                    pageContent?.split('\n').map((line, index) => (
                      <Paragraph key={index} style={{ color: '#fff' }}>
                        {line}
                        <br />
                      </Paragraph>
                    ))
                  ) : (
                    <div>
                      <Title style={{ textAlign: 'center' }} level={5}>
                        {workspaceLanguageData[lang].contentLoading}
                      </Title>
                      <Skeleton
                        className="custom-skeleton"
                        active
                        title={false}
                        paragraph={{ rows: 4 }}
                      />
                    </div>
                  )}
                  {!actionsLoading && pageContent?.length > 1 && (
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
            )}
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
        className="workspace-modal"
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
            if (execObj.service !== 'question') {
              const existingServiceData = data[execObj.service].find(
                (service) =>
                  service.lang === activeLangBtn &&
                  (!service?.type || service?.type === activeArticleType)
              );
              if (existingServiceData) {
                setPageContent(existingServiceData.output_text);
                setFileURL(existingServiceData.output_docx);
                setActiveBtn(executeFC);
                setActionsLoading(false);
                return;
              }
            }
            if (executeFC === 1 || executeFC === 3) {
              await execObj.onclickFC(data.id, activeLangBtn);
            } else if (executeFC === 2) {
              await execObj.onclickFC(
                data.id,
                activeLangBtn,
                activeArticleType
              );
            } else if (executeFC === 4) {
              await execObj.onclickFC(data.id, question);
            }
            setActiveBtn(executeFC);
            setActionsLoading(false);
            getProfile().unwrap();
          })();
        }}
        onCancel={() => {
          setIsModalOpen(false);
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
            setContentType={setContentType}
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
