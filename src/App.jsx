import { useTranslation } from 'react-i18next';
import ThemeSelector from './components/ThemeSelector';
import LanguageSelector from './components/LanguageSelector';

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="flex justify-between">
        <ThemeSelector />
        <LanguageSelector />
      </div>

      <h1 className="text-3xl font-bold text-primary">
        {t('welcome')}
      </h1>

      <p className="mt-4 text-text">
        {t('description', { defaultValue: 'This is a multi-language app with theme support' })}
      </p>

      <button className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors">
        {t('actions.click_me')}
      </button>
    </div>
  );
}

export default App;
