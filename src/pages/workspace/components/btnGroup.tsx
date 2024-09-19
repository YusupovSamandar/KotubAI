import { Button, Flex } from 'antd';
import { IBtnLangList } from './../types';
import { useTypedSelector } from 'src/app/store';
import { workspaceLanguageData } from '../languageData';
import { Col, Row } from 'antd';
import { useState } from 'react';
import { DocxSvg, TextSvg } from 'src/assets/svg/dashboard_svg';
function btnGroup({
  btns,
  activeLangBtn,
  activeActionId,
  activeArticleType,
  articleTypes,
  setContentType,
}: {
  btns: IBtnLangList[];
  activeLangBtn: string;
  activeActionId: number;
  activeArticleType: string;
  articleTypes: IBtnLangList[];
  setContentType: any;
}) {
  const [isfileType, setisFileType] = useState(true);
  const lang = useTypedSelector((state) => state.language);
  return (
    <div>
      <div className="btn-group-underline btn-lang-group">
        {btns.map((btn) => (
          <Button
            key={btn.id}
            className={btn.id === activeLangBtn ? 'active' : ''}
            type={btn.id === activeLangBtn ? 'primary' : 'default'}
            shape="round"
            onClick={btn.onclickFC}
            size={'large'}
          >
            {btn.label}
          </Button>
        ))}
      </div>
      <br />

      <div className="btn-group-underline btn-lang-group">
        <Button
          className={isfileType ? 'active' : ''}
          type={isfileType ? 'primary' : 'default'}
          shape="round"
          onClick={() => {
            setContentType('text');
            setisFileType(true);
          }}
          size={'large'}
        >
          <Flex align="center" gap={10}>
            <TextSvg />
            <span>Matn</span>
          </Flex>
        </Button>
        <Button
          className={!isfileType ? 'active' : ''}
          type={!isfileType ? 'primary' : 'default'}
          shape="round"
          onClick={() => {
            setContentType('docx');
            setisFileType(false);
          }}
          size={'large'}
        >
          <Flex align="center" gap={10}>
            <DocxSvg />
            <span>Doc file</span>
          </Flex>
        </Button>
      </div>
      <br />

      {activeActionId === 2 && (
        <div>
          <div className="ant-modal-header">
            <div className="ant-modal-title">
              {workspaceLanguageData[lang].modal.article.type}
            </div>
          </div>
          <Row
            gutter={[20, 20]}
            className="btn-article-group btn-group-underline"
          >
            {articleTypes.map((btn) => (
              <Col key={btn.id} xs={12} sm={12} md={12} lg={12} xl={6}>
                <Button
                  key={btn.id}
                  className={btn.id === activeArticleType ? 'active' : ''}
                  type={btn.id === activeArticleType ? 'primary' : 'default'}
                  shape="round"
                  onClick={btn.onclickFC}
                  size={'large'}
                  style={{ width: '100%', minWidth: '150px' }} // Add this line
                >
                  {btn.label}
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      )}
      <br />
    </div>
  );
}

export default btnGroup;
