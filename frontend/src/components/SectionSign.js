function SectionSign ({ name, title, onSubmit, children }) {

  return (
   <section className="login-register">
    <h2 className="login-register__title">{title}</h2>
    <form name={`${name}-form`} onSubmit={onSubmit} className={`login-register__form form_${name}`}>
      {children}
    </form>
  </section>
  );
}

export default SectionSign;
