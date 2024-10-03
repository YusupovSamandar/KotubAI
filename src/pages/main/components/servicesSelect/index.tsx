import { Col, Row, Typography } from 'antd';
import {
  ArticleSvg,
  SummarySvg,
  TranscriptSvg,
  TranslateSvg,
} from 'src/assets/svg/dashboard_svg';
import './styles.scss';
import useParamsHook from 'src/hooks/params';
import { mainLangData } from '../../langData';
import { useTypedSelector } from 'src/app/store';
import { Dispatch, SetStateAction } from 'react';
const { Title } = Typography;
function ServicesSelect() {
  const { handleMakeParams } = useParamsHook();
  const lang = useTypedSelector((state) => state.language);
  const allServices = [
    {
      Icon: () => <TranscriptSvg />,
      title: mainLangData[lang].services.transcript,
      service: 'transcript',
    },
    {
      Icon: () => <SummarySvg />,
      title: mainLangData[lang].services.summary,
      service: 'summary',
    },
    {
      Icon: () => <ArticleSvg />,
      title: mainLangData[lang].services.article,
      service: 'article',
    },
    {
      Icon: () => <TranslateSvg />,
      title: mainLangData[lang].services.translate,
      service: 'translate',
    },
  ];
  return (
    <div className="services">
      <Title className="services-title" level={2}>
        {mainLangData[lang].serviceTitle}
      </Title>
      <Row gutter={[13, 13]} className="services-container">
        {allServices.map((service) => (
          <Col sm={12} key={service.service}>
            <div
              onClick={() => {
                handleMakeParams('service', service.service);
                // setSteps(2);
              }}
              className="services-container-item"
            >
              <service.Icon />
              <p>{service.title}</p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ServicesSelect;
