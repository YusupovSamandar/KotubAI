import { message, type UploadProps } from 'antd';

export const phonePattern = /^\(\d{2}\)-\d{3}-\d{2}-\d{2}$/;
export const smsPattern = /^\d-\d-\d-\d$/;
export const innPattern = /^\d{3}-\d{3}-\d{3}$/;
export const sourceNumberPattern = /^\d{4}$/;

type ValueType = string | number | undefined;
export const amountFormatter = (value: ValueType) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export const amountParser = (value: ValueType) =>
  `${value}`!.replace(/\$\s?|(,*)/g, '');

export const dateFormat = 'YYYY-MM-DD';
export const monthFormat = 'YYYY-MM';
export const yearFormat = 'YYYY';
export const windowSize =
  typeof window !== 'undefined' ? window.innerWidth : 1440;

export const uploadProps: UploadProps = {
  accept: 'audio/*, video/mp4',
  name: 'file',
  beforeUpload: (file) => {
    return new Promise((resolve, reject) => {
      // alert('You can only upload images');
      const isLt5M = file.size / 1024 / 1024 <= 10;
      // if (!isLt5M) {
      //   // alert('Image must smaller than 5MB!');
      //   resolve(true);
      // } else {
      reject(false);
      // }
    });
  },
  multiple: false,
  maxCount: 1,
  onChange(info) {
    const { status } = info.file;
    const size = info.file.size / (1024 * 1024);
    if (status == 'uploading') {
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      // if (size > 10) {
      //   message.error(`file too big`);
      // } else {
      message.error(`${info.file.name} file upload failed.`);
      // }
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
