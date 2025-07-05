import { useTranslation } from 'react-i18next';
import { useUserContext } from "../../context/UserContext.jsx";
import { DEFINED_LANGUAGES } from "../../constants/languages.js";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const { changeLanguage } = useUserContext();

  return (
    <div className="flex items-center gap-2">
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="rounded border border-secondary px-2 py-1 text-sm bg-background text-text"
      >
        <option value={DEFINED_LANGUAGES.EN}>English</option>
        <option value={DEFINED_LANGUAGES.VN}>Tiếng Việt</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
