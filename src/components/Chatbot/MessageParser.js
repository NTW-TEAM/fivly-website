class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("modifier mes informations")) {
        this.actionProvider.handleOption1();
      } else if (lowerCaseMessage.includes("s'inscrire") || lowerCaseMessage.includes("désinscrire")) {
        this.actionProvider.handleOption2();
      } else if (lowerCaseMessage.includes("documents")) {
        this.actionProvider.handleOption3();
      } else if (lowerCaseMessage.includes("assemblée générale")) {
        this.actionProvider.handleOption4();
      } else if (lowerCaseMessage.includes("thème")) {
        this.actionProvider.handleOption5();
      } else {
        this.actionProvider.handleUnknown();
      }
    }
  }
  
  export default MessageParser;
  