import { Button, Typography } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import FileLogo from 'src/assets/img/fileLogo.png';
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
    <div className="workspace-file">
      <div className="workspace-file-header">
        <img src={FileLogo} width={39} alt="" />
      </div>
      <div className="workspace-file-desc">
        <Typography>
          <Title level={4} style={{ margin: 0 }}>
            {fileTxt?.substring(0, 10) || 'No file'}...
          </Title>
          {size && (
            <Paragraph style={{ color: '#A6AAAF' }}>file: {size}</Paragraph>
          )}
        </Typography>
      </div>
      <div>
        <Button
          onClick={() => window.open(downloadUrl, '_blank')}
          icon={<CloudDownloadOutlined />}
        ></Button>
      </div>
    </div>
  );
}

export default fileCmp;
