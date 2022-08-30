import Banner from '../../components/Banner';
import FeatureItem from '../../components/FeatureItem';
import chatIcon from '../../assets/icon-chat.png'
import moneyIcon from '../../assets/icon-money.png'
import securityIcon from '../../assets/icon-security.png'
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './style.css';
import { useSelector } from 'react-redux';
import { selectToken } from '../../utils/selectors';

function Home() {
  const token = useSelector(selectToken)

  return (
    <div>
      {token ? <Header /> : <Header className="hidden-signout" />}
      <main>
        <Banner />
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <FeatureItem iconSrc={chatIcon} iconName='Chat Icon' title='You are our #1 priority'
            content='Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.'/>
          <FeatureItem iconSrc={moneyIcon} iconName='Money Icon' title='More savings means higher rates'
            content='The more you save with us, the higher your interest rate will be!' />
          <FeatureItem iconSrc={securityIcon} iconName='Security Icon' title='Security you can trust'
            content='We use top of the line encryption to make sure your data and money
        is always safe.'/>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
