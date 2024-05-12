import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import './styles.scss';
import { paymentLangData, paymentsPlans } from './langData';
import { useTypedSelector } from 'src/app/store';
const PaymentModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentLang = useTypedSelector((state) => state.language);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" className="buy-button" onClick={showModal}>
        {paymentLangData[currentLang].buy}
      </Button>
      <Modal
        className="payment-modal"
        open={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <div>
          <div className="payment-modal-title">
            <h2>{paymentLangData[currentLang].title}</h2>
          </div>
          <br />
          <Row gutter={[20, 20]} align={'stretch'} className="prices-container">
            {paymentsPlans.map((plan, index) => (
              <Col key={index} sm={24} md={12} className="price-container">
                <div>
                  <h1>
                    {plan.amount} {paymentLangData[currentLang].currencyName}
                  </h1>
                  <p>
                    {plan.hours} {paymentLangData[currentLang].buyDescription}{' '}
                  </p>
                  <Button type="primary">
                    {paymentLangData[currentLang].buy}
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default PaymentModal;
