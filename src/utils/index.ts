import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { getRootState } from 'src/app/store';

export const clearMask = (val: string) => {
  return val
    .replaceAll(' ', '')
    .replaceAll('(', '')
    .replaceAll(')', '')
    .replaceAll('-', '');
};

export const makePhoneMask = (val: string) => {
  return `(${val[0] + val[1]})-${val[2] + val[3] + val[4]}-${val[5] + val[6]}-${
    val[7] + val[8]
  }`;
};

export const handlePreviewFile = async (file: UploadFile) => {
  let src = file.url as string;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as RcFile);
      reader.onload = () => resolve(reader.result as string);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};

export const handleMakeUrl = (
  searchParams: URLSearchParams,
  additionalParams?: any
) => {
  let url = `?`;
  let size = Number(searchParams.get('size') || 50);
  let page = Number(searchParams.get('page') || 1);

  for (let key of Array.from(searchParams.keys())) {
    if (key === 'size') url = url + `&limit=${size}`;
    else if (key === 'page') url = url + `&offset=${(page - 1) * size}`;
    else {
      let value = searchParams.get(key);
      url = url + `&${key}=${value}`;
    }
  }

  if (additionalParams) {
    if (url === '') url = 'limit=10&offset=0';
    for (let key in additionalParams) {
      url = url + `&${key}=${additionalParams[key]}`;
    }
  }
  return url === '?' ? '?limit=50&offset=0' : url;
};

export const handleMakeUrlNoPage = (searchParams: URLSearchParams) => {
  let url = ``;

  for (let key of Array.from(searchParams.keys())) {
    let value = searchParams.get(key);
    url = url + `&${key}=${value}`;
  }

  return url;
};

export const redirectToNewTab = (url: string) => {
  window.open(url, '_blank');
};

export const prettierNumber = (val: number | undefined, seperator?: string) => {
  if (val) {
    let val_amount = val < 0 ? val * -1 : val;
    let val_arr = val_amount.toString().split('.');
    let number = val_arr[0].split('').reverse();
    let number_rest = val_arr[1] ? '.' + val_arr[1] : '';
    let prettier_number_arr: string[] = [];

    number.forEach((item, index) => {
      if (index > 0 && index % 3 === 0)
        prettier_number_arr.push(seperator || ',');
      prettier_number_arr.push(item);
    });
    const result = prettier_number_arr.reverse().join('') + number_rest;
    return val < 0 ? '-' + result : result;
  } else return '0';
};

export const prettierInn = (val: number | undefined, seperator?: string) => {
  if (val) {
    let inn = val.toString();
    let prettier_number_arr: string[] = [];
    for (let index = 0; index < inn.length; index++) {
      if (index > 0 && index % 3 === 0)
        prettier_number_arr.push(seperator || ',');
      prettier_number_arr.push(inn[index]);
    }

    return prettier_number_arr.join('');
  } else return '0';
};

// Total price
export const totalPriceProduct = (
  data: { price: number; quantity?: number }[]
) => {
  let total_price = data?.reduce(
    (prev: number, current) => prev + current?.price * (current?.quantity || 1),
    0
  );
  return total_price;
};

export const findMonth = (key: string) => {
  switch (key) {
    case '1':
      return 'Yanvar';
    case '2':
      return 'Fevral';
    case '3':
      return 'Mart';
    case '4':
      return 'Aprel';
    case '5':
      return 'May';
    case '6':
      return 'Iyun';
    case '7':
      return 'Iyul';
    case '8':
      return 'Avgust';
    case '9':
      return 'Sentabr';
    case '10':
      return 'Oktabr';
    case '11':
      return 'Noyabr';
    case '12':
      return 'Dekabr';
    default:
      return '';
  }
};

export const updateNegativeCellColor = async () => {
  var intervalId = setInterval(updateColor, 100);

  function updateColor() {
    document.querySelectorAll('td').forEach(function (td) {
      let prefix = td.textContent[0];
      if (prefix === '-') {
        td.style.color = getRootState().layout.colors.red;
      }
    });
  }

  setTimeout(function () {
    clearInterval(intervalId);
  }, 400);
};

export const prettierCellNumbers = async (seperator = ' ') => {
  document.querySelectorAll('td').forEach(function (td) {
    let value = parseInt(td.textContent, 10);
    if (!isNaN(value)) {
      td.textContent = prettierNumber(value, seperator);
    }
  });
  setTimeout(() => {
    document.querySelectorAll('td').forEach(function (td) {
      let value = parseInt(td.textContent, 10);
      if (!isNaN(value)) {
        td.textContent = prettierNumber(value, seperator);
      }
    });
  }, 100);
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
