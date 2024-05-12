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
import { useParams } from 'react-router-dom';
import { baseUrl } from 'src/app/services/api/const';
import { useGetSpeechToTextMutation } from 'src/app/services/uploads';
import { ISpeechToTextRes } from 'src/app/services/uploads/type';
import { CopyIcon, MusicSvg } from 'src/assets/svg/dashboard_svg';
import BtnGroup from './components/btnGroup';
import FileCmp from './components/fileCmp';
import './styles.scss';
import { useTypedSelector } from 'src/app/store';
import useWorkspace from './useWorkspace';
import { workspaceLanguageData } from './languageData';
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
        setData(res);
        setPageContent(res.result_text);
      });
  }, []);
  if (isLoading || !data) {
    return;
  }
  return (
    <div className="workspace">
      <div style={{ margin: isMobile ? '0px 0 30px 0' : '47px 0 100px 0' }}>
        <FileCmp
          Icon={MusicSvg}
          fileTxt={data?.file_name}
          downloadUrl={data?.result_docx}
        />
      </div>
      <div className="workspace-buttons-list">
        <Row justify={'center'} gutter={[20, 20]}>
          {actionsList.map((action) => (
            <Col
              key={action.id}
              style={{ textAlign: 'center' }}
              xs={24}
              sm={12}
              md={6}
              lg={6}
              xl={6}
            >
              <Button
                key={action.id}
                disabled={actionsLoading}
                className={action.id === activeBtn ? 'active' : ''}
                type={action.id === activeBtn ? 'primary' : 'default'}
                shape="round"
                onClick={() => {
                  setIsModalOpen(true);
                  setExecuteFC(action.id);
                  // await action.onclickFC(data);
                  setActiveBtn(action.id);
                }}
                icon={<action.Icon />}
                size={'large'}
              >
                {action.label}
              </Button>
            </Col>
          ))}
        </Row>
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
              setActionsLoading(false);
            })();
          }}
          onCancel={() => {
            setIsModalOpen(false);
            setActiveBtn(null);
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
      {!pageContent ? (
        <>
          {!actionsLoading ? (
            <FileCmp
              Icon={MusicSvg}
              downloadUrl={`${baseUrl}/api/download/` + fileURL}
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
                    navigator.clipboard.writeText(pageContent).then(() => {
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
    </div>
  );
}

export default Workspace;
