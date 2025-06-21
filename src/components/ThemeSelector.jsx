import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const ThemeSelector = () => {
  const { theme, changeTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 p-4">
      <label htmlFor="theme-select" className="text-sm font-medium text-text">
        {t('theme.title', { defaultValue: 'Theme' })}:
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={(e) => changeTheme(e.target.value)}
        className="rounded border border-secondary px-2 py-1 text-sm bg-background text-text"
      >
        <option value="light">{t('theme.light')}</option>
        <option value="dark">{t('theme.dark')}</option>
      </select>
    </div>
  );
};

export default ThemeSelector;
