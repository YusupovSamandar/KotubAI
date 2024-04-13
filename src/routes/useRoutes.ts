import { useEffect } from 'react';
import { useGetCompanyMutation } from 'src/app/services/management';
import { changeTheme } from 'src/app/slices/layoutSlice';
import { useAppDispatch, useTypedSelector } from 'src/app/store';
import { isDarkTheme } from 'src/constants/storage';

export default function useRoutes() {
  //Set default colors
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(changeTheme(isDarkTheme ? 'dark' : 'light'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Authenticate
  const { isAuthenticated } = useTypedSelector((state) => state.auth);

  return {
    isAuthenticated,
    // hasCompany,
  };
}
