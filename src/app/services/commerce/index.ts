import { api } from '../api';
import { IBaseDataRes, IBaseDelete, IBaseDeleteRes, IBaseEdit } from '../type';
import {
  IAvilableProduct,
  IBasicTool,
  IBasicToolRes,
  ILot,
  ILotIncome,
  ILotIncomeOutcome,
  ILotIncomeOutcomeRes,
  ILotIncomeRes,
  ILotOutcome,
  ILotOutcomeRes,
  ILotRes,
  IProduct,
  IProductRes,
  IRoll,
  IRollProductFetch,
  IRollProductFetchRes,
  IRollRes,
  IStorageSell,
  IStorageTransaction,
  IStorageTransactionRes,
  IStore,
  IStoreStat,
  IStoreRes,
  ITransferProductAdd,
  ISalesHistory,
  IRevaluateRes,
  IRevaluate,
} from './type';

export const commerceApi = api.injectEndpoints({
  endpoints: (build) => ({
    //////// Store ////////
    //Get store endpoint
    getStore: build.mutation<IBaseDataRes<IStoreRes>, string | undefined>({
      query: (params = '') => ({ url: '/commerce/stores' + params }),
    }),

    //Get store endpoint
    getStoreById: build.mutation<IStoreRes, number>({
      query: (id) => ({ url: '/commerce/stores/' + id }),
    }),

    //Add store endpoint
    addStore: build.mutation<IStoreRes, IStore>({
      query: (body) => ({
        url: '/commerce/stores',
        method: 'POST',
        body,
      }),
    }),

    //Edit store endpoint
    editStore: build.mutation<IStoreRes, IBaseEdit<IStore>>({
      query: ({ id, body }) => ({
        url: '/commerce/stores/' + id,
        method: 'PUT',
        body,
      }),
    }),

    //Delete store endpoint
    deleteStore: build.mutation<IStoreRes, number>({
      query: (id) => ({
        url: '/commerce/stores/' + id,
        method: 'DELETE',
      }),
    }),

    //////// Products ////////
    //Get Products endpoint
    getProducts: build.mutation<IBaseDataRes<IProductRes>, string | void>({
      query: (params = '') => ({ url: '/commerce/products' + params }),
    }),

    //Add Products endpoint
    addProducts: build.mutation<IProductRes, IProduct>({
      query: (body) => ({
        url: '/commerce/products',
        method: 'POST',
        body,
      }),
    }),

    //Edit Products endpoint
    editProducts: build.mutation<IProductRes, IBaseEdit<IProduct>>({
      query: ({ id, body }) => ({
        url: '/commerce/products/' + id,
        method: 'PUT',
        body,
      }),
    }),

    //Delete Products endpoint
    deleteProducts: build.mutation<IProductRes, number>({
      query: (id) => ({
        url: '/commerce/products/' + id,
        method: 'DELETE',
      }),
    }),

    //////////////////////// Basic Tool ////////////////
    //Get Products endpoint
    getBasicTool: build.mutation<IBaseDataRes<IBasicToolRes>, void>({
      query: () => ({ url: '/commerce/amortizations' }),
    }),

    //Get Products endpoint
    getBasicToolById: build.mutation<IBasicToolRes, number>({
      query: (id) => ({ url: '/commerce/amortizations/' + id }),
    }),

    //Add Products endpoint
    addBasicTool: build.mutation<IBasicToolRes, IBasicTool>({
      query: (body) => ({
        url: '/commerce/amortizations',
        method: 'POST',
        body,
      }),
    }),

    //Edit Products endpoint
    editBasicTool: build.mutation<IBasicToolRes, IBaseEdit<IBasicTool>>({
      query: ({ id, body }) => ({
        url: '/commerce/amortizations/' + id,
        method: 'PUT',
        body,
      }),
    }),

    //Delete Products endpoint
    deleteBasicTool: build.mutation<IBasicToolRes, number>({
      query: (id) => ({
        url: '/commerce/amortizations/' + id,
        method: 'DELETE',
      }),
    }),

    //////////////////////// Revaluate ////////////////
    //Get revaluate endpoint
    getRevaluate: build.mutation<IBaseDataRes<IRevaluateRes>, number>({
      query: (id) => ({ url: `/commerce/amortizations/${id}/revaluate` }),
    }),

    //Add revaluate endpoint
    addRevaluate: build.mutation<IRevaluateRes, IBaseEdit<Partial<IRevaluate>>>(
      {
        query: ({ id, body }) => ({
          url: `/commerce/amortizations/${id}/revaluate`,
          method: 'POST',
          body,
        }),
      }
    ),

    //Edit revaluate endpoint
    editRevaluate: build.mutation<IRevaluateRes, IBaseEdit<IRevaluate>>({
      query: ({ id, body, id2 }) => ({
        url: `/commerce/amortizations/${id}/revaluate/${id2}`,
        method: 'PUT',
        body,
      }),
    }),

    //Delete revaluate endpoint
    deleteRevaluate: build.mutation<IBaseDeleteRes, IBaseDelete>({
      query: ({ id, id2 }) => ({
        url: `/commerce/amortizations/${id}/revaluate/${id2}`,
        method: 'DELETE',
      }),
    }),

    //Delete revaluate all endpoint
    deleteRevaluateAll: build.mutation<IBaseDeleteRes, number>({
      query: (id) => ({
        url: `/commerce/amortizations/${id}/revaluate/delete-all`,
        method: 'DELETE',
      }),
    }),

    //////////////////////// Storage transaction ////////////////
    //Get Products endpoint
    getStorageTransaction: build.mutation<
      IBaseDataRes<IStorageTransactionRes>,
      void
    >({
      query: () => ({ url: '/commerce/store-transactions' }),
    }),

    //Add Products endpoint
    addStorageTransaction: build.mutation<
      IStorageTransactionRes,
      IStorageTransaction
    >({
      query: (body) => ({
        url: '/commerce/store-transactions',
        method: 'POST',
        body,
      }),
    }),

    //Edit Products endpoint
    editStorageTransaction: build.mutation<
      IStorageTransactionRes,
      IBaseEdit<IStorageTransaction>
    >({
      query: ({ id, body }) => ({
        url: '/commerce/store-transactions/' + id,
        method: 'PUT',
        body,
      }),
    }),

    //Delete Products endpoint
    deleteStorageTransaction: build.mutation<IStorageTransactionRes, number>({
      query: (id) => ({
        url: '/commerce/store-transactions/' + id,
        method: 'DELETE',
      }),
    }),

    //Get store monthly statistics endpoint
    getStoreMonthlyStat: build.mutation<IBaseDataRes<IStoreStat>, number>({
      query: (id) => ({ url: `/commerce/stores/${id}/monthly-statistics` }),
    }),

    /////////////// Sales history /////////////////
    //Get sales history endpoint
    getSalesHistory: build.mutation<IBaseDataRes<ISalesHistory>, void>({
      query: () => ({ url: '/commerce/stores/sales-history' }),
    }),

    //////// Production rolls ////////

    //Get rolls endpoint
    getRolls: build.mutation<IBaseDataRes<IRollRes>, void>({
      query: () => ({ url: '/commerce/rolls' }),
    }),

    //Get rolls endpoint
    getRoll: build.mutation<IRollRes, number>({
      query: (id) => ({ url: '/commerce/rolls/' + id }),
    }),

    //Add roll endpoint
    addRoll: build.mutation<IRollRes, IRoll>({
      query: (body) => ({
        url: '/commerce/rolls',
        method: 'POST',
        body,
      }),
    }),

    //Edit roll endpoint
    editRoll: build.mutation<IRollRes, IBaseEdit<Partial<IRoll>>>({
      query: ({ id, body }) => ({
        url: '/commerce/rolls/' + id,
        method: 'PATCH',
        body,
      }),
    }),

    //Delete roll endpoint
    deleteRoll: build.mutation<IRollRes, number>({
      query: (id) => ({
        url: '/commerce/rolls/' + id,
        method: 'DELETE',
      }),
    }),

    //// Roll products ////
    //Get roll products endpoint
    getRollProducts: build.mutation<IBaseDataRes<IRollProductFetchRes>, void>({
      query: () => ({ url: '/commerce/roll-products' }),
    }),

    //Add roll products endpoint
    addRollProducts: build.mutation<IRollProductFetchRes, IRollProductFetch>({
      query: (body) => ({
        url: '/commerce/roll-products',
        method: 'POST',
        body,
      }),
    }),

    //Edit roll products endpoint
    editRollProducts: build.mutation<
      IRollProductFetchRes,
      IBaseEdit<IRollProductFetch>
    >({
      query: ({ id, body }) => ({
        url: '/commerce/roll-products/' + id,
        method: 'PATCH',
        body,
      }),
    }),

    //Delete roll products endpoint
    deleteRollProducts: build.mutation<IRollProductFetchRes, number>({
      query: (id) => ({
        url: '/commerce/roll-products/' + id,
        method: 'DELETE',
      }),
    }),

    //// Transfer products ////
    //Transfer products endpoint
    transferProducts: build.mutation<ITransferProductAdd, ITransferProductAdd>({
      query: (body) => ({
        url: '/commerce/roll-transfer',
        method: 'POST',
        body,
      }),
    }),

    //Get available products endpoint
    getAvailableProducts: build.mutation<IAvilableProduct[], void>({
      query: () => ({ url: '/commerce/rolls/available-products' }),
    }),

    ///////////// Lot /////////////////////////////////////////
    //Get Lot endpoint
    getLots: build.mutation<IBaseDataRes<ILotRes>, void>({
      query: () => ({ url: '/commerce/lots' }),
    }),

    //Get lot endpoint
    getLot: build.mutation<ILotRes, number>({
      query: (id) => ({ url: '/commerce/lots/' + id }),
    }),

    //Get lot endpoint
    getLotNumber: build.mutation<{ next_number: number }, void>({
      query: () => ({ url: '/commerce/lots/next-number' }),
    }),

    //Add lot endpoint
    addLot: build.mutation<ILotRes, ILot>({
      query: (body) => ({
        url: '/commerce/lots',
        method: 'POST',
        body,
      }),
    }),

    //Edit lot endpoint
    editLot: build.mutation<ILotRes, IBaseEdit<ILot>>({
      query: ({ id, body }) => ({
        url: '/commerce/lots/' + id,
        method: 'PUT',
        body,
      }),
    }),

    //Delete lot endpoint
    deleteLot: build.mutation<ILotRes, number>({
      query: (id) => ({
        url: '/commerce/lots/' + id,
        method: 'DELETE',
      }),
    }),

    ///////////////////// Lot income outcome ///////////////
    //Get lot income endpoint
    getLotIncome: build.mutation<IBaseDataRes<ILotIncomeRes>, number>({
      query: (id) => ({
        url: `/commerce/lots/${id}/income`,
      }),
    }),

    //Get lot outcome outcome endpoint
    getLotOutcome: build.mutation<IBaseDataRes<ILotOutcomeRes>, number>({
      query: (id) => ({
        url: `/commerce/lots/${id}/outcome`,
      }),
    }),

    //Add lot income outcome endpoint
    addLotIncomeOutcome: build.mutation<
      ILotIncomeOutcomeRes,
      ILotIncomeOutcome
    >({
      query: (body) => ({
        url: '/commerce/lots/income-outcome/',
        method: 'POST',
        body,
      }),
    }),

    //Edit lot income endpoint
    editLotIncome: build.mutation<ILotIncomeRes, IBaseEdit<ILotIncome>>({
      query: ({ id, body, id2 }) => ({
        url: `/commerce/lots/${id}/income/` + id2,
        method: 'PATCH',
        body,
      }),
    }),

    //Edit lot outcome endpoint
    editLotOutcome: build.mutation<ILotOutcomeRes, IBaseEdit<ILotOutcome>>({
      query: ({ id, body, id2 }) => ({
        url: `/commerce/lots/${id}/outcome/` + id2,
        method: 'PATCH',
        body,
      }),
    }),

    //Delete lot income endpoint
    deleteLotIncome: build.mutation<
      ILotIncomeOutcomeRes,
      { lotId: number; id: number }
    >({
      query: ({ lotId, id }) => ({
        url: `/commerce/lots/${lotId}/income/` + id,
        method: 'DELETE',
      }),
    }),

    //Delete lot outcome endpoint
    deleteLotOutcome: build.mutation<
      ILotIncomeOutcomeRes,
      { lotId: number; id: number }
    >({
      query: ({ lotId, id }) => ({
        url: `/commerce/lots/${lotId}/outcome/` + id,
        method: 'DELETE',
      }),
    }),

    //Get stotage sell endpoint
    getStorageSell: build.mutation<IBaseDataRes<IStorageSell>, void>({
      query: () => ({
        url: `/commerce/stotages/sales-history`,
      }),
    }),
  }),
});

export const {
  ////////// Store//////
  useGetStoreMutation,
  useGetStoreByIdMutation,
  useAddStoreMutation,
  useEditStoreMutation,
  useDeleteStoreMutation,

  //////// Product ////////////
  useGetProductsMutation,
  useAddProductsMutation,
  useEditProductsMutation,
  useDeleteProductsMutation,

  ////// Basic tool //////
  useGetBasicToolMutation,
  useGetBasicToolByIdMutation,
  useAddBasicToolMutation,
  useEditBasicToolMutation,
  useDeleteBasicToolMutation,

  ////// Revaluate //////
  useGetRevaluateMutation,
  useAddRevaluateMutation,
  useEditRevaluateMutation,
  useDeleteRevaluateMutation,
  useDeleteRevaluateAllMutation,

  ////// Storage Transaction ////////
  useGetStorageTransactionMutation,
  useAddStorageTransactionMutation,
  useEditStorageTransactionMutation,
  useDeleteStorageTransactionMutation,
  useGetStoreMonthlyStatMutation,

  ////////// Sales history //////////
  useGetSalesHistoryMutation,

  ////// Production rolls ////////
  useGetRollsMutation,
  useGetRollMutation,
  useAddRollMutation,
  useEditRollMutation,
  useDeleteRollMutation,

  ////// Production roll products ////////
  useGetRollProductsMutation,
  useAddRollProductsMutation,
  useEditRollProductsMutation,
  useDeleteRollProductsMutation,

  ////// Production transfer ////////
  useTransferProductsMutation,
  useGetAvailableProductsMutation,

  ////////////// Lot //////////////////
  useGetLotsMutation,
  useGetLotMutation,
  useGetLotNumberMutation,
  useAddLotMutation,
  useEditLotMutation,
  useDeleteLotMutation,

  ////////////  Lot income outtcome ///////////
  useGetLotIncomeMutation,
  useGetLotOutcomeMutation,
  useAddLotIncomeOutcomeMutation,
  useEditLotIncomeMutation,
  useEditLotOutcomeMutation,
  useDeleteLotIncomeMutation,
  useDeleteLotOutcomeMutation,

  ////////////// Storage sale /////////
  useGetStorageSellMutation,
} = commerceApi;
