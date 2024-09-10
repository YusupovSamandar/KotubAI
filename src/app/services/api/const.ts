const productionHostName = 'https://api.kotibai.uz';
const testHostName = 'https://test.kotib.ai';

const clientId = import.meta.env.VITE_APP_ENV;

export const hostName =
  clientId === 'development' ? testHostName : productionHostName;
export const baseUrl = `${hostName}/api/v1/users`;
export const paymentUrl = `${hostName}/api/v1/payments`;
export const apiTagTypes = ['Auth'];
