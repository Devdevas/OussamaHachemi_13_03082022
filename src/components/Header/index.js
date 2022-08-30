import { NavLink } from 'react-router-dom'
import logo from '../../assets/argentBankLogo.png'
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, logOut } from '../../features/userAuth';
import { selectfirstName, selectToken } from '../../utils/selectors';

function Header({ className = '' }) {
    const token = useSelector(selectToken)
    const firstName = useSelector(selectfirstName)
    const dispatch = useDispatch()
    function signOut() {
        localStorage.removeItem("token")
        dispatch(logOut())
    }
    if (token) {
        dispatch(getProfile(token))
    }
    return (<header>
        <NavLink to='/'>
            <img className="logo-img" src={logo} alt="Argent Bank Logo" />
            <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <nav>
            <NavLink to="/profile" className={`main-nav-item`} >
                <FontAwesomeIcon icon={faCircleUser} />
                {token ? firstName : 'Sign In'}
            </NavLink>
            <div onClick={signOut}>
                <NavLink to="/" className={`main-nav-item ${className}`}>
                    <FontAwesomeIcon icon={faSignOut} />
                    <p className='signout-text'>Sign Out</p>
                </NavLink>
            </div>
        </nav>
    </header>)
}

export default Header