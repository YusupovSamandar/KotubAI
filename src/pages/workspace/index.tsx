import {
  CloudDownloadOutlined,
  EditOutlined,
  FileDoneOutlined,
  MessageOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import { Button, Flex, Typography, message } from 'antd';
import { useState, useEffect } from 'react';
import { CopyIcon, MusicSvg } from 'src/assets/svg/dashboard_svg';
import './styles.scss';
import { useGetSpeechToTextMutation } from 'src/app/services/uploads';
import { ISpeechToTextRes } from 'src/app/services/uploads/type';
import { useParams } from 'react-router-dom';
const { Title, Paragraph } = Typography;

const actionsList = [
  { Icon: FileDoneOutlined, label: 'summarize', content: 'txt', id: 1 },
  { Icon: EditOutlined, label: 'Create Article', content: 'txt', id: 2 },
  { Icon: TranslationOutlined, label: 'Translate', content: 'txt', id: 3 },
  { Icon: MessageOutlined, label: 'Ask Question', content: 'asdsd', id: 4 },
  { Icon: CloudDownloadOutlined, label: 'Download', content: 'asdsd', id: 5 },
];
function Workspace() {
  const { id } = useParams();
  const [activeBtn, setActiveBtn] = useState(1);
  const [data, setData] = useState<ISpeechToTextRes>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const [getWorkspaceContent, { isLoading }] = useGetSpeechToTextMutation();

  useEffect(() => {
    console.log('rendered');

    getWorkspaceContent(id)
      .unwrap()
      .then((res) => {
        setData(res);
      });
  }, []);

  return (
    <div className="workspace">
      <div className="workspace-file">
        <div className="workspace-file-header">
          <MusicSvg />
        </div>
        <div className="workspace-file-desc">
          <Typography>
            <Title level={4} style={{ margin: 0 }}>
              Resume.pdf
            </Title>
            <Paragraph style={{ color: '#A6AAAF' }}>file size 100mb</Paragraph>
          </Typography>
        </div>
      </div>
      <div className="workspace-buttons-list">
        <Flex gap="large" wrap="wrap">
          {actionsList.map((action) => (
            <Button
              className={action.id === activeBtn ? 'active' : ''}
              type={action.id === activeBtn ? 'primary' : 'default'}
              shape="round"
              onClick={() => {
                setActiveBtn(action.id);
              }}
              icon={<FileDoneOutlined />}
              size={'large'}
            >
              {action.label}
            </Button>
          ))}
        </Flex>
      </div>
      <div className="workspace-results">
        <Typography>
          <Paragraph style={{ color: '#fff' }}>{data?.text_result}</Paragraph>
          <div style={{ textAlign: 'right' }}>
            {contextHolder}
            <Button
              onClick={() => {
                messageApi.open({
                  type: 'success',
                  content: 'copied to clipboard',
                });
              }}
              style={{ border: 'none', background: 'none' }}
            >
              <CopyIcon />
            </Button>
          </div>
        </Typography>
      </div>
    </div>
  );
}

export default Workspace;
