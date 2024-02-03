import usePopupClose from "../hooks/usePopupClose";

function InfoTooltip({isOpen, onClose, isSuccess, text}) {

  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__info-container">
        <button onMouseDown={onClose} type="reset" className="popup__button-close" aria-label="Закрыть" />
        <div className={`popup__icon ${isSuccess ? 'popup__icon_type_success' : 'popup__icon_type_error'}`}/>
        <p className="popup__text">{text}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;