import { Button, Flex, Typography } from 'antd';
import { DownloadIcon } from '../icons';
import { workspaceLanguageData } from '../languageData';
import { useTypedSelector } from 'src/app/store';
const { Title } = Typography;

function fileCmp({
  fileTxt,
  downloadUrl,
  size,
}: {
  fileTxt: string;
  downloadUrl: string;
  size?: string;
}) {
  const lang = useTypedSelector((state) => state.language);
  return (
    <div className="workspace_file_container">
      <div className="workspace_file_container-title">
        <Title level={4}>{workspaceLanguageData[lang].fileReady}</Title>
      </div>
      <div className="workspace_file_container-button">
        <Button
          onClick={() => window.open(downloadUrl, '_blank')}
          type="primary"
        >
          <Flex align="center" justify="center" gap={18}>
            <span>YUKLAB OLISH</span> <DownloadIcon />
          </Flex>
        </Button>
      </div>
      <div></div>
    </div>
  );
}

export default fileCmp;
