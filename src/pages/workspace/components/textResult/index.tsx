import { Button, Flex, Input, Skeleton, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { CopyIcon, EditContentIcon } from 'src/assets/svg/dashboard_svg';
import { workspaceLanguageData } from './../../languageData';
import { useTypedSelector } from 'src/app/store';
import { Dispatch, SetStateAction, useState } from 'react';
import EditContentModal from '../editContentModal';
import WorkspaceAudioPlayer from '../audio';
const { Paragraph } = Typography;

interface Props {
  id: string;
  sttId?: number;
  pageContent: string;
  actionsLoading: boolean;
  messageApi: any;
  contextHolder: any;
  playerUrl?: string;
  activeBtn: number | null;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

function WorkspaceTextResult({
  id,
  sttId,
  actionsLoading,
  contextHolder,
  messageApi,
  pageContent,
  playerUrl,
  activeBtn,
  setContent,
}: Props) {
  const lang = useTypedSelector((state) => state.language);
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  const previewContent = pageContent?.split('\n').slice(0, 1).join('\n');
  return (
    <div>
      <Typography>
        {playerUrl && <WorkspaceAudioPlayer audioUrl={playerUrl} />}
        {!actionsLoading ? (
          <div>
            {showFullContent
              ? pageContent?.split('\n').map((line, index) => (
                  <Paragraph key={index} style={{ color: '#fff' }}>
                    {line}
                    <br />
                  </Paragraph>
                ))
              : previewContent?.split('\n').map((line, index) => (
                  <Paragraph key={index} style={{ color: '#fff' }}>
                    {line}
                    <br />
                  </Paragraph>
                ))}
            <button
              className="workspace-results-readMore_btn"
              onClick={toggleContent}
            >
              ...
              {showFullContent
                ? workspaceLanguageData[lang].readLess
                : workspaceLanguageData[lang].readMore}
            </button>
          </div>
        ) : (
          <TextResultLoading txt={workspaceLanguageData[lang].contentLoading} />
        )}
        {!actionsLoading && pageContent?.length > 1 && showFullContent ? (
          <CopyContentButton
            contextHolder={contextHolder}
            messageApi={messageApi}
            pageContent={pageContent}
          />
        ) : !actionsLoading ? (
          <Flex justify="end">
            <EditContentModal
              setPageContent={setContent}
              id={id}
              sttId={sttId}
              playerUrl={playerUrl}
              content={pageContent}
              activeBtn={activeBtn}
            />
          </Flex>
        ) : null}
      </Typography>
    </div>
  );
}

const CopyContentButton = ({ pageContent, messageApi, contextHolder }) => {
  return (
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
  );
};

const TextResultLoading = ({ txt }) => (
  <div>
    <Title style={{ textAlign: 'center' }} level={5}>
      {txt}
    </Title>
    <Skeleton
      className="custom-skeleton"
      active
      title={false}
      paragraph={{ rows: 4 }}
    />
  </div>
);

export default WorkspaceTextResult;
