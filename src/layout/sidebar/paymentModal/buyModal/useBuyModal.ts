import { useState } from 'react';
import {
  useGenerateClickPaymentlinkMutation,
  useGenerateOrderIdMutation,
  useGeneratePaymePaymentlinkMutation,
} from 'src/app/services/finance';
interface ILangList {
  label: string;
  value: 'click' | 'payme';
  onclickFC: () => void;
  additional?: ['humo', 'uzcard'];
}
export default function useBuyModal({ amount }: { amount: number }) {
  const [payWithClick, { isLoading: clickLoading }] =
    useGenerateClickPaymentlinkMutation();
  const [generateOrderId, { isLoading: generateOrderLoading }] =
    useGenerateOrderIdMutation();
  const [payWithPayme, { isLoading: paymeLoading }] =
    useGeneratePaymePaymentlinkMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePaymentType, setActivePaymentType] = useState<'click' | 'payme'>(
    'payme'
  );
  const [activeCardType, setActiveCardType] = useState<'humo' | 'uzcard'>(
    'humo'
  );
  const langList: ILangList[] = [
    {
      label: 'Click',
      value: 'click',
      onclickFC: async () => {
        setActivePaymentType('click');
      },
    },
    {
      label: 'Payme',
      value: 'payme',
      onclickFC: async () => {
        setActivePaymentType('payme');
      },
      additional: ['humo', 'uzcard'],
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const { id: orderId } = await generateOrderId({
      amount,
      type: activePaymentType,
    }).unwrap();
    if (activePaymentType === 'click') {
      const { pay_link } = await payWithClick({
        order_id: orderId,
        card_type: activeCardType,
      }).unwrap();
      window.location.href = pay_link;
    } else {
      const { pay_link } = await payWithPayme({ order_id: orderId }).unwrap();
      window.location.href = pay_link;
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return {
    isModalOpen,
    handleCancel,
    handleOk,
    showModal,
    langList,
    activePaymentType,
    activeCardType,
    setActiveCardType,
    loadings: {
      clickLoading,
      generateOrderLoading,
      paymeLoading,
    },
  };
}
