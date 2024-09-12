import Header from '../components/header';
import PageTitle from '../components/pageTitle';
import Hero from '../components/hero';

const Home = () => {
  return (
    <div className="content__width max-h-full h-full overflow-auto">
      <PageTitle />
      <Header />
      <Hero />
    </div>
  );
};

export default Home;
