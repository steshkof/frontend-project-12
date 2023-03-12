import Nav from '../components/Nav';
import images from '../images/images';

const Page404 = () => {
  return (
    <>
      <Nav />
      <div className="text-center">
        <img
          alt="Страница не найдена"
          class="img-fluid w-25"
          src={images.notFound}
        />
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">
          Но вы можете перейти <a href="/">на главную страницу</a>
        </p>
      </div>
    </>
  );
};

export default Page404;
