// ----------------------- IMPORT JS -------------------------
import Card from "./card.js";
import FormValidator from "./formValidator.js";
import Section from "./section.js";
import UserInfo from "./userInfo.js";
import PopupWithForm from "./popupWithForm.js";
import PopupWithImage from "./popupWithImage.js";
import PopupWithConfirmation from "./popupWithConfirmation.js";
import Api from "./api.js";
import {
  editButton,
  closeButton,
  indexName,
  indexAbout,
  addButton,
  closeBtnCardPopup,
  indexTitle,
  indexLink,
  containerCard,
  buttonCloseImage,
  token,
  cardOwner,
  avatarEditBtn,
  avatarPopupClose,
  avatarLinkInput,
  deletePopupCloseBtn,
} from "./utils.js";

// --------------------- VALIDAÇÃO ---------------------------
new FormValidator({
  config: {
    formSelector: "form",
    inputSelector: "input",
    saveButtonSelector: "#profile-saveButton",
    inactiveButtonClass: "popup__button-error",
    inputErrorClass: "popup__input-error",
    messageErrorClass: "popup__message-error",
  },
  formSelector: "#profile-form",
}).enableValidation();

new FormValidator({
  config: {
    formSelector: "form",
    inputSelector: "input",
    saveButtonSelector: "#create-button",
    inactiveButtonClass: "popup__button-error",
    inputErrorClass: "popup__input-error",
    messageErrorClass: "popup__message-error",
  },
  formSelector: "#card-form",
}).enableValidation();

new FormValidator({
  config: {
    formSelector: "form",
    inputSelector: "input",
    saveButtonSelector: "#profileImg-saveButton",
    inactiveButtonClass: "popup__button-error",
    inputErrorClass: "popup__input-error",
    messageErrorClass: "popup__message-error",
  },
  formSelector: "#profileImg-form",
}).enableValidation();

// --------------------- cria API ----------------------------
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});

// ------------------------------------ PROFILE POPUP ------------------------------------------

// ------ ABERTURA E FECHAMENTO DO PROFILE INFO POPUP
const PopupProfile = new PopupWithForm("#editProfilePopup", updateProfileInfo);
PopupProfile.setEventListeners();
editButton.addEventListener("click", () => PopupProfile.open());

closeButton.addEventListener("click", () => PopupProfile.close());

// ------ CHAMAMENTO DAS INFORMAÇÕES DO PROFILE
const userInfo = new UserInfo({
  name: ".profile__title",
  about: ".profile__subtitle-text",
  img: ".profile__avatar",
});

// ARRUMAR A CHAMADA DA API ABAIXO PARA FICAR ORGANIZADA E FECHAR

api
  .getUsersInfo()
  .then((res) => {
    if (res.status !== 200) {
      return Promise.reject("Erro no get users");
    }
    return res.json();
  })
  .then((user) => {
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setUserImg(user.avatar);
  })
  .catch((error) => {
    console.log(`[GET] - user - ${error}`);
  });

// ----- ALTERAÇÃO DE PROFILE

function updateProfileInfo() {
  api
    .editProfileInfo({
      name: indexName.value,
      about: indexAbout.value,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((newUserInfo) => {
      userInfo.setUserInfo(newUserInfo.name, newUserInfo.about);
    })
    .catch((error) => {
      console.log(`[PATCH] - new user info - ${error}`);
      return Promise.reject("Erro no patch das informações dos users");
    })
    .finally(() => {
      PopupProfile.close();
    });
}

// ---------------------------------- AVATAR POPUP ---------------------------------------

const avatarPopup = new PopupWithForm("#editProfileImg", updateAvatarImg);
avatarPopup.setEventListeners();

// ------------ ABERTURA E FECHAMENTO

avatarEditBtn.addEventListener("click", () => avatarPopup.open());

avatarPopupClose.addEventListener("click", () => avatarPopup.close());

//------------- FUNÇÃO DE MUDANÇA DO AVATAR

function updateAvatarImg() {
  api
    .editAvatarImg({ avatar: avatarLinkInput.value })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((avatarImg) => {
      userInfo.setUserImg(avatarImg.avatar);
    })
    .catch((error) => {
      console.log(`[PATCH] - new avatar image - ${error}`);
      return Promise.reject("Erro no patch da nova imagem do avatar");
    })
    .finally(() => {
      avatarPopup.close();
    });
  avatarLinkInput.value = "";
}

// ------------------------------------ CARD POPUP ------------------------------------------

// ------- ABERTURA E FECHAMENTO DO CARD POPUP
const PopupCard = new PopupWithForm("#addCardPopup", addNewCard);
addButton.addEventListener("click", () => PopupCard.open());

closeBtnCardPopup.addEventListener("click", () => PopupCard.close());
PopupCard.setEventListeners();

// ------- CHAMANDO CARD COM API

let section;
api
  .getInitialCards()
  .then((res) => {
    if (res.status !== 200) {
      return Promise.reject("Erro no get cards");
    }
    return res.json();
  })
  .then((cards) => {
    section = new Section(
      {
        items: cards,
        renderer: renderCard,
      },
      ".elements"
    );
    section.renderItems();
  })
  .catch((error) => {
    console.log(`[GET] - cards - ${error}`);
  });

// ------- FUNÇÃO CRIA CARD (COM API)

function renderCard(card) {
  const newCard = new Card({
    card,
    cardselector: "#card-template",
    openBigImage,
    openConfirmationPopup: (card, cardId) => {
      openConfirmationPopup(card);
      confirmDelPopup.setDeleteAction(() => deleteCard(cardId));
    },
    ownerId: cardOwner,
    handleLiked: isLiked,
    removeLiked: removeLike,
  }).generateCard();
  section.addItem(newCard);
}

function addNewCard() {
  api
    .createNewCard({
      isLiked: false,
      name: indexTitle.value,
      link: indexLink.value,
      owner: cardOwner,
    })
    .then((res) => {
      if (res.status !== 201) {
        return Promise.reject("Erro no post card");
      }
      return res.json();
    })
    .then((card) => {
      const newCard = new Card({
        card: card,
        cardselector: "#card-template",
        openBigImage,
        openConfirmationPopup: (card, cardId) => {
          openConfirmationPopup(card);
          confirmDelPopup.setDeleteAction(() => deleteCard(cardId));
        },
        ownerId: cardOwner,
        handleLiked: isLiked,
        removeLiked: removeLike,
      }).generateCard();
      containerCard.prepend(newCard);
    })
    .catch((error) => {
      console.log(`[GET] - card - ${error}`);
    })
    .finally(() => {
      PopupCard.close();
    });

  indexTitle.value = "";
  indexLink.value = "";
}

// ------------------ DELETAR CARTÕES ((( FALTA O POPUP DE CONFIRMAÇÃO )))

const confirmDelPopup = new PopupWithConfirmation("#popupDelete");
confirmDelPopup.setEventListeners();

function openConfirmationPopup(card) {
  confirmDelPopup.open(card);
  deletePopupCloseBtn.addEventListener("click", () => confirmDelPopup.close());
}

function deleteCard(cardId) {
  api
    .deleteCard(cardId)
    .then((res) => {
      if (res.status !== 200) {
        return Promise.reject("Erro no delete card");
      }
    })
    .catch((error) => {
      console.error(`[DELETE] - cards - ${error}`);
    });
}

//-------------FUNÇÃO DO LIKE DO CARTÃO

function isLiked(card, isLiked) {
  api
    .addLikes({ cardId: card._card._id, isLiked })
    .then((res) => {
      if (!res.ok) {
        return Promisse.reject("Erro no put do like");
      }
      return res.json();
    })
    .then((like) => {
      card.updateLikesView();
    })
    .catch((error) => {
      console.log(`[PUT] - likes - ${error}`);
    });
}

function removeLike(card) {
  api
    .removeLikes(card._card._id)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject("Erro no remove like");
      }
      card.updateLikesView();
    })
    .catch((error) => {
      console.log(`[DELETE] - remove likes -  ${card._card._id} - ${error}`);
    });
}

// ------ AMPLIAÇÃO DA IMAGEM
const popupImage = new PopupWithImage("#PopupImage");
popupImage.setEventListeners();

function openBigImage(card) {
  popupImage.open(card);
  buttonCloseImage.addEventListener("click", () => popupImage.close());
}
