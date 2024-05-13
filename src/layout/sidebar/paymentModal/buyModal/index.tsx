import { Button, Modal } from 'antd';
import React from 'react';
import './styles.scss';
import useBuyModal from './useBuyModal';
import HeavyLoadSpinner from './../../../../components/common/heavyLoadSpinner/index';
import { buyModalLangData } from './langData';
import { useTypedSelector } from 'src/app/store';

const BuyModal: React.FC<{ btnTxt: string; amount: number }> = ({
  btnTxt,
  amount,
}) => {
  const currLang = useTypedSelector((state) => state.language);
  const {
    activeCardType,
    activePaymentType,
    handleCancel,
    handleOk,
    isModalOpen,
    langList,
    setActiveCardType,
    showModal,
    loadings: { clickLoading, generateOrderLoading, paymeLoading },
  } = useBuyModal({ amount });

  return (
    <div className="buy-plan">
      <Button type="primary" onClick={showModal}>
        {btnTxt}
      </Button>
      <Modal
        className="payment-type-modal"
        title={buyModalLangData[currLang].modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        centered
        onCancel={handleCancel}
      >
        <HeavyLoadSpinner
          isLoading={clickLoading || generateOrderLoading || paymeLoading}
          txt={buyModalLangData[currLang].heavyloadSpinnerTxt}
        >
          <br />
          <div className="payment-btn-group">
            {langList.map((btn) => (
              <Button
                key={btn.value}
                className={btn.value === activePaymentType ? 'active' : ''}
                type={btn.value === activePaymentType ? 'primary' : 'default'}
                shape="round"
                onClick={btn.onclickFC}
                size={'large'}
              >
                {btn.label}
              </Button>
            ))}
          </div>
          {activePaymentType === 'click' && (
            <div>
              <div className="ant-modal-header">
                <div className="ant-modal-title">
                  {buyModalLangData[currLang].cardTypeTitle}
                </div>
              </div>
              <br />
              <div className="payment-btn-group">
                {langList[1].additional.map((addt) => (
                  <Button
                    className={addt === activeCardType ? 'active' : ''}
                    type={addt === activeCardType ? 'primary' : 'default'}
                    shape="round"
                    size={'large'}
                    onClick={() => setActiveCardType(addt)}
                  >
                    {addt}
                  </Button>
                ))}
                <br />
                <br />
              </div>
            </div>
          )}
          <br />
        </HeavyLoadSpinner>
      </Modal>
    </div>
  );
};

export default BuyModal;
