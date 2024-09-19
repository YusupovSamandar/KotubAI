import { Button, Flex, Typography } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import FileLogo from 'src/assets/img/fileLogo.png';
import CustomButton from 'src/components/common/button';
import { DownloadIcon } from '../icons';
import { Link } from 'react-router-dom';
const { Title, Paragraph } = Typography;

function fileCmp({
  fileTxt,
  downloadUrl,
  size,
}: {
  fileTxt: string;
  downloadUrl: string;
  size?: string;
}) {
  return (
    <div className="workspace_file_container">
      <div className="workspace_file_container-title">
        <Title level={4}>Transkriptsiya fayli tayyor!</Title>
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
