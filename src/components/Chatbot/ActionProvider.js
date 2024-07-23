class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleOption1 = () => {
    const message = this.createChatBotMessage("Une fois connecté à votre espace membre, vous pouvez modifier vos informations personnelles telles que votre numéro de téléphone, adresse e-mail et adresse physique en accédant à la section 'Mon profil'.");
    this.updateChatbotState(message);
  };

  handleOption2 = () => {
    const message = this.createChatBotMessage("Dans votre espace membre, vous pouvez voir la liste des activités disponibles. Pour vous inscrire ou vous désinscrire, cliquez simplement sur l'activité souhaitée et suivez les instructions.");
    this.updateChatbotState(message);
  };

  handleOption3 = () => {
    const message = this.createChatBotMessage("Si vous avez les droits d'accès, vous pouvez consulter les documents de l'association dans la section 'Documents' de votre espace membre. Vous pouvez également effectuer des recherches sur les documents disponibles.");
    this.updateChatbotState(message);
  };

  handleOption4 = () => {
    const message = this.createChatBotMessage("Pour participer à une AG, connectez-vous à votre espace membre et allez dans la section 'Assemblées Générales'. Vous pouvez voir les AG programmées, vous inscrire et même voter si une session de vote est active.");
    this.updateChatbotState(message);
  };

  handleUnknown = () => {
    const message = this.createChatBotMessage("Je ne comprends pas. Veuillez choisir ou poser une question relative aux options suivantes :", {
      widget: "faqOptions",
    });
    this.updateChatbotState(message);
  };

  updateChatbotState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;