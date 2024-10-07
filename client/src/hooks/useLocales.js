import { useTranslation } from 'react-i18next';
import useSettings from './useSettings';
// config
import { allLangs, defaultLang } from '../config';

export default function useLocales() {
    const { i18n, t: translate } = useTranslation();
    const { onChangeDirectionByLang } = useSettings();
    const langStorage = localStorage.getItem("i18nextLng");
    const currentLang = allLangs.find((_lang) => _lang.value === langStorage) || defaultLang;

    const handleChangeLanguage = (newLang) => {
        i18n.changeLanguage(newLang);
        onChangeDirectionByLang(newLang);
    };

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text, options) => translate(text, options),
    currentLang,
    allLangs,
  };
}
