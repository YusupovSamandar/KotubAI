import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProfileMutation } from 'src/app/services/auth';
import { useGetHistoryMutation } from 'src/app/services/uploads';
import { useAppDispatch, useTypedSelector } from 'src/app/store';
import { sidebarLangData } from './sidebar/langData';
export default function useSidebar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [getHistory, { isLoading }] = useGetHistoryMutation();
  const [getProfile, { isLoading: isProfileLoading }] = useGetProfileMutation();
  const { colors, collapsed, isMobile, deviceType } = useTypedSelector(
    (state) => state.layout
  );
  const lang = useTypedSelector((state) => state.language);
  const historyData = useTypedSelector((state) => state.userHistory);
  const profileDetails = useTypedSelector((state) => state.auth.profile);
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = (seconds % 60).toString().slice(0, 2);
    return `${hours} ${sidebarLangData[lang].hour} ${minutes} ${sidebarLangData[lang].minute} ${secondsLeft} ${sidebarLangData[lang].second}`;
  };
  const userBalanceDisplay = {
    en: {
      title: 'Remaining Time:',
      time: formatTime(Number(profileDetails?.credit_seconds)),
    },
    uz: {
      title: 'Qolgan Vaqt :',
      time: formatTime(Number(profileDetails?.credit_seconds)),
    },
    ru: {
      title: 'Оставшееся время:',
      time: formatTime(Number(profileDetails?.credit_seconds)),
    },
  };

  useEffect(() => {
    getHistory().unwrap();
    getProfile().unwrap();
  }, []);

  const mode = collapsed ? 'close' : 'open';
  return {
    colors,
    collapsed,
    isMobile,
    deviceType,
    lang,
    historyData,
    profileDetails,
    isProfileLoading,
    isLoading,
    userBalanceDisplay,
    navigate,
    dispatch,
    mode,
  };
}
