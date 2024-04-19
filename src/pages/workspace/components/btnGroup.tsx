import { Button } from 'antd';
import { IBtnLangList } from './../types';
import { useTypedSelector } from 'src/app/store';
import { workspaceLanguageData } from '../languageData';
function btnGroup({
  btns,
  activeLangBtn,
  activeActionId,
  activeArticleType,
  articleTypes,
}: {
  btns: IBtnLangList[];
  activeLangBtn: string;
  activeActionId: number;
  activeArticleType: string;
  articleTypes: IBtnLangList[];
}) {
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

      {activeActionId === 2 && (
        <div>
          <div className="ant-modal-header">
            <div className="ant-modal-title">
              {workspaceLanguageData[lang].modal.article.type}
            </div>
          </div>
          <div className="btn-article-group btn-group-underline">
            {articleTypes.map((btn) => (
              <Button
                key={btn.id}
                className={btn.id === activeArticleType ? 'active' : ''}
                type={btn.id === activeArticleType ? 'primary' : 'default'}
                shape="round"
                onClick={btn.onclickFC}
                size={'large'}
                style={{ width: '100%' }} // Add this line
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </div>
      )}
      <br />
    </div>
  );
}

export default btnGroup;
