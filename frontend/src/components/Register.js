import SectionSign from "./SectionSign";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import { useEffect } from "react";

function Register({ onRegister }) {

  const { values, handleChange, setValues } = useForm({ email: '', password: '' });

  function handleSubmit(e) {
    e.preventDefault();
    
    onRegister({ email: values.email, password: values.password });
    setValues({ email: '', password: '' });
  }

  useEffect(() => {
    setValues({ email: '', password: '' });
  }, [setValues]);

  return (
    <SectionSign 
      name="signup"
      title="Регистрация"
      onSubmit={handleSubmit}>
        <input type="email" name="email" value={values.email} onChange={handleChange} className="login-register__input" placeholder="Email" minLength="2" maxLength="40" required/>
        <span className="popup__error"/>
        <input type="password" name="password" value={values.password} onChange={handleChange} className="login-register__input" placeholder="Пароль" minLength="2" maxLength="40" required/>
        <span className="popup__error"/>
        <button type="submit" className="login-register__button login-register__button_type_signup">Зарегистрироваться</button>
        <p className="login-register__subtitle">Уже зарегистрированы? 
          <Link to={`/signin`} className="login-register__signup-link"> Войти</Link>
        </p>
    </SectionSign>
  );
}

export default Register;
