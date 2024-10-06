import { Button, Input, Modal, Spin, Switch, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetProfileMutation } from 'src/app/services/auth';
import { useGetProjectMutation } from 'src/app/services/uploads';
import { outputTypes } from 'src/app/services/uploads/type';
import { useTypedSelector } from 'src/app/store';
import HeavyLoadSpinner from 'src/components/common/heavyLoadSpinner';
import BtnGroup from './components/btnGroup';
import FileCmp from './components/fileCmp';
import { TranscriptIcon } from './icons';
import { workspaceErrorLangData, workspaceLanguageData } from './languageData';
import './styles.scss';
import useWorkspace from './useWorkspace';
import WorkspaceTextResult from './components/textResult';
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
    currentServiceId,
    setCurrentServiceId,
  } = useWorkspace();

  const [getWorkspaceContent, { isLoading }] = useGetProjectMutation();
  const [getProfile] = useGetProfileMutation();

  const fetchPageData = () => {
    getWorkspaceContent(id)
      .unwrap()
      .then((res) => {
        setContentType(res.output_type);
        setData(res);
        const defaultServiceId =
          res.action_type === 'stt' ? res.stt.id : res[res.action_type][0].id;
        const responseTxt =
          res.action_type === 'stt'
            ? res[res.action_type].output_text
            : res[res.action_type][0].output_text;
        const responseFile =
          res.action_type === 'stt'
            ? res[res.action_type].output_docx
            : res[res.action_type][0].output_docx;
        setCurrentServiceId(defaultServiceId);
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
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    );
  }
  return (
    <div className="main-loading-wrapper">
      <HeavyLoadSpinner
        txt={workspaceLanguageData[lang].pageOnLoad}
        isLoading={
          (!data?.[data?.action_type] ||
            (data?.action_type !== 'stt' &&
              data[data.action_type].length === 0)) &&
          !isLoading
        }
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
                    icon={<action.Icon active={action.id === activeBtn} />}
                    size={'large'}
                  >
                    {action.label}
                  </Button>
                </div>
              ))}
            </div>
            <div className="workspace-content_wrapper">
              {contentType === 'docx' ? (
                <>
                  {!actionsLoading ? (
                    <FileCmp downloadUrl={fileURL} fileTxt={fileURL} />
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px',
                      }}
                    >
                      <Spin />
                    </div>
                  )}
                </>
              ) : (
                pageContent &&
                pageContent.length > 1 && (
                  <div className="workspace-results">
                    <WorkspaceTextResult
                      id={id}
                      setContent={setPageContent}
                      sttId={currentServiceId}
                      activeBtn={activeBtn}
                      playerUrl={data?.action_type === 'stt' && data.input_file}
                      actionsLoading={actionsLoading}
                      contextHolder={contextHolder}
                      messageApi={messageApi}
                      pageContent={pageContent}
                    />
                  </div>
                )
              )}
            </div>

            <br />
            <div className="workspace-content_toggle">
              <p>Tekst format</p>
              <Switch
                checked={contentType === 'docx'}
                defaultChecked
                onChange={(checked) =>
                  setContentType(checked ? 'docx' : 'text')
                }
              />
              <p>Doc format</p>
            </div>
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
                setCurrentServiceId(existingServiceData.id);
                return;
              }
            }
            try {
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
              getProfile().unwrap();
            } catch (error) {
              const errorMsg = workspaceErrorLangData[lang].find(
                (er) => er.errorCode === error.data.errors[0].code
              ).errorMessage;
              message.error(errorMsg, 10);
              setActionsLoading(false);
            }
            setActionsLoading(false);
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
