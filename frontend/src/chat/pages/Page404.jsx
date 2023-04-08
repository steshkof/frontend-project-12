import TopPanel from '../components/TopPanel';
import images from '../images/images';
import { useTranslation } from 'react-i18next';

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <>
      <TopPanel />
      <div className="text-center">
        <img
          alt={t('page404.pagenotFound')}
          class="img-fluid w-25"
          src={images.notFound}
        />
        <h1 className="h4 text-muted">{t('page404.pagenotFound')}</h1>
        <p className="text-muted">{t('page404.message')} <a href="/">{t('page404.homepage')}</a></p>
      </div>
    </>
  );
};

export default Page404;
