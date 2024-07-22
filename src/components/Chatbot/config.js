import { createChatBotMessage } from 'react-chatbot-kit';
import FaqOptions from './FaqOptions';

const botName = "FivlyBot";

const config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage(`Bonjour ! Je suis le ${botName}. Choisissez une question parmi les options suivantes :`, {
      widget: "faqOptions",
    }),
  ],
  widgets: [
    {
      widgetName: "faqOptions",
      widgetFunc: (props) => <FaqOptions {...props} />,
    },
  ],
};

export default config;
