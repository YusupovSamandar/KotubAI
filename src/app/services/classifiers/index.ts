import { api } from '../api';
import { IBaseDataRes } from '../type';
import { ICategoryRes, IDistrict, IRegion } from './type';

export const classifiersApi = api.injectEndpoints({
  endpoints: (build) => ({
    //////// Place ////////
    //Get regions endpoint
    getRegions: build.mutation<IRegion[], void>({
      query: () => ({ url: '/others/regions/' }),
    }),
    
    //Get districts endpoint
    getDistricts: build.mutation<IDistrict[], number>({
      query: (id) => ({ url: `/others/districts/${id}/` }),
    }),
    //////// Category //////// <IBaseDataRes<ICategoryRes>, void>
    //Get categories endpoint
    getCategories: build.mutation<IBaseDataRes<ICategoryRes>, void>({
      query: () => ({ url: '/finance/category' }),
    }),
  }),
});

export const {
  // Place
  useGetRegionsMutation,
  useGetDistrictsMutation,
  useGetCategoriesMutation,
} = classifiersApi;
