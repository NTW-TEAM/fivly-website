class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("modifier mes informations") || lowerCaseMessage.includes("informations personnelles")) {
      this.actionProvider.handleOption1();
    } else if (lowerCaseMessage.includes("s'inscrire") || lowerCaseMessage.includes("désinscrire") || lowerCaseMessage.includes("activité")) {
      this.actionProvider.handleOption2();
    } else if (lowerCaseMessage.includes("documents")) {
      this.actionProvider.handleOption3();
    } else if (lowerCaseMessage.includes("assemblée générale") || lowerCaseMessage.includes("ag")) {
      this.actionProvider.handleOption4();
    } else {
      this.actionProvider.handleUnknown();
    }
  }
}

export default MessageParser;
