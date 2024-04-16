import { Button, Typography } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function fileCmp({ Icon, fileTxt, downloadUrl }) {
  return (
    <div className="workspace-file">
      <div className="workspace-file-header">
        <Icon />
      </div>
      <div className="workspace-file-desc">
        <Typography>
          <Title level={4} style={{ margin: 0 }}>
            {fileTxt?.substring(0, 10) || 'No file'}...
          </Title>
          <Paragraph style={{ color: '#A6AAAF' }}>file size 100mb</Paragraph>
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
