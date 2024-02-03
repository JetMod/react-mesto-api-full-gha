import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Header({ name, userEmail }) {
  const navigate = useNavigate();
  
  function onSignOut() {
    localStorage.removeItem('jwt');
    navigate('/signin');
  }

  return (
    <header className="header">
      <div className="header__logo" />
      {name !== 'signup' && name !== 'signin' ?
        <div className="header__conteiner">
          <p className="header__email">{userEmail}</p>
          <button className="header__link-out" onClick={onSignOut}>Выйти</button>
        </div>
      :
      <Link to={name === 'signup' ? '/signin' : '/signup'} className="header__link">
      {name === 'signup' ? 'Войти' : 'Регистрация'}</Link> 
      }
    </header>
  )
}

export default Header;
