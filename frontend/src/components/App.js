import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import HomePage from './HomePage';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import { register, authorize, checkToken } from '../utils/Auth';
//
function App() {

  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoPopupOpen, setisInfoPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  
  const handleRequestUserInfo = () => {
    api.loadUserInfo()
      .then((currentUser) => {
        setCurrentUser(currentUser);
      })
      .catch(console.error)
  } 
  
  const handleRequestCards = () => {
    api.getInitialCards(currentUser._id)
      .then((data) => {
        setCards(data);
      })
      .catch(console.error)
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      handleRequestUserInfo();
      handleRequestCards();
    }
  }, [loggedIn]) 
     
  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(id => id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error)
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch(console.error)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (selectedCard) => {
    setSelectedCard(selectedCard);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setisInfoPopupOpen(false);
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser({ name, about }) {
    function makeRequest() {
      return api.patchUserInfo({
        name: name,
        about: about,
      })
      .then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar(avatar) {
    function makeRequest() {
      return api.patchAvatar(avatar)
        .then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleAddPlaceSubmit({ name, link }) {
    function makeRequest() {
      return api.addCard({
        name: name,
        link: link,
      })
      .then((data) => {
        const newCard = data;
        setCards([newCard, ...cards]);
      })
    }
    handleSubmit(makeRequest);
  }

  useEffect(() => {
    if (localStorage.jwt) {
      checkToken(localStorage.jwt)
        .then((res) => {
          setUserEmail(res.email);
          setLoggedIn(true);
          navigate('/');
        })
        .catch(console.err)
    } else {
      setLoggedIn(false);
    }
  }, [navigate])

  function handleLogin({ email, password }) {
    authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        setisInfoPopupOpen(true);
        setIsSuccess(false);
        console.error(`Ошибка при авторизации ${err}`);
      })
  }

  function handleRegister({ email, password }) {
    register(email, password)
      .then(() => {
        setisInfoPopupOpen(true);
        setIsSuccess(true);
        navigate('/signin');
      })
      .catch((err) => {
        setisInfoPopupOpen(true);
        setIsSuccess(false);
        console.error(`Ошибка при регистрации ${err}`);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
          <Routes>
            <Route path='/' element={<ProtectedRoute 
              component={HomePage}
              loggedIn={loggedIn} 
              userEmail={userEmail}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              setCards={setCards}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} />
            }/>
            <Route path='/signin' element={
              <>
                <Header name="signin"/>
                <Login onLogin={handleLogin} />
              </>
            }/>
            <Route path='/signup' element={
              <>
                <Header name="signup"/>
                <Register onRegister={handleRegister} />
              </>
            }/>
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes> 
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading} />
          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading} />
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading} />
          <PopupWithForm 
            name="delete-card"
            title="Вы уверены?"
            containerName="delete-card-container"
            textBtn="Да" />
          <ImagePopup 
            card={selectedCard} 
            isOpen={selectedCard._id !== undefined} 
            onClose={closeAllPopups} />
          <InfoTooltip
            isSuccess={isSuccess}
            isOpen={isInfoPopupOpen}
            onClose={closeAllPopups}
            text={isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'} />
        </div>
    </CurrentUserContext.Provider> 
  );
}

export default App;
