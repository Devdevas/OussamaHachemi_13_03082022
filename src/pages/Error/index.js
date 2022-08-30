import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './style.css'

function Error() {
    return (
        <div>
            <Header navText='Tony' />
            <div className="error404">
                <h1>404</h1>
                <p>Oups! La page que vous demandez n'existe pas.</p>
            </div>
            <Footer />
        </div>
    );
}

export default Error