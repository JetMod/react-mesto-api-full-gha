import SectionSign from "./SectionSign";
import useForm from "../hooks/useForm";
import { useEffect } from "react";


function Login({ onLogin }) {
  const { values, handleChange, setValues } = useForm({ email: '', password: '' });

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email: values.email, password: values.password });

    setValues({ email: '', password: '' });
  }

  useEffect(() => {
    setValues({ email: '', password: '' });
  }, [setValues]);

  return (
    <SectionSign 
      name="signin"
      title="Вход"
      onSubmit={handleSubmit}>
        <input type="email" name="email" value={values.email} onChange={handleChange} className="login-register__input" placeholder="Email" minLength="2" maxLength="40" required/>
        <span className="popup__error"/>
        <input type="password" name="password" value={values.password} onChange={handleChange} className="login-register__input" placeholder="Пароль" minLength="2" maxLength="40" required/>
        <span className="popup__error"/>
        <button type="submit" className="login-register__button login-register__button_type_signin">Войти</button>
    </SectionSign>
  );
}

export default Login;