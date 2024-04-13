export const findDashboardPageTitle = (path: string) => {
  const defPath = path.split('/')[1];
  if (defPath === 'lots') return 'Lot';
  else if (defPath === 'store_remains') return 'Skald Qoldigi';
  else if (defPath === 'store_sale') return 'Omborlar Sotuvi';
  else if (defPath === 'production') return 'Ishlab chiqarish';
  else if (defPath === 'status') return 'Status';
  else if (defPath === 'cash') return 'Tranzaksiyalar';
  else if (defPath === 'salary') return 'Ish haqi';
  else if (defPath === 'checkout') return 'Kassa Chiqarish';
  else if (defPath === 'transfer') return 'O’tkazma';
  else if (defPath === 'team') return 'Jamoa';
  else if (defPath === 'currencies') return 'Valyutalar';
  else if (defPath === 'sources') return 'Manbalar';
  else if (defPath === 'accounts') return 'Hisob Raqamlar';
  else if (defPath === 'directions') return 'Yo’nalishlar';
  else if (defPath === 'employees') return 'Xodimlar';
  else if (defPath === 'contingent') return 'Kontragentlar';
  else if (defPath === 'store') return 'Ombor';
  else if (defPath === 'row_material') return 'Hom Ashyo';
  else if (defPath === 'basic_tools') return 'Asosiy Vositalar';
  else if (defPath === 'company') return 'Kompaniya';
  else return 'Balans';
};

const storeSubKeys = ['store_remains', 'store_sale'];
const bankSubKeys = ['cash'];
const hrSubKeys = ['employees', 'salary'];
const cashflowSubKeys = ['currencies', 'sources', 'accounts', 'directions'];
const materialSubKeys = ['store', 'row_material', 'ready_tool', 'basic_tools'];

export const findSubKey = (path: string) => {
  const defPath = path.split('/')[1];
  if (storeSubKeys.includes(defPath)) return 'store';
  else if (bankSubKeys.includes(defPath)) return 'bank';
  else if (hrSubKeys.includes(defPath)) return 'hr';
  else if (cashflowSubKeys.includes(defPath)) return 'cashflow';
  else if (materialSubKeys.includes(defPath)) return 'material_means';
  else return '';
};
