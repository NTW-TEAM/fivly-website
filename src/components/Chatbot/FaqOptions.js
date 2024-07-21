import React from "react";

const FaqOptions = (props) => {
  const options = [
    { text: "Modifier mes informations personnelles", handler: props.actionProvider.handleOption1, id: 1 },
    { text: "S'inscrire ou se désinscrire d'une activité", handler: props.actionProvider.handleOption2, id: 2 },
    { text: "Consulter les documents de l'association", handler: props.actionProvider.handleOption3, id: 3 },
    { text: "Participer à une assemblée générale", handler: props.actionProvider.handleOption4, id: 4 },
    { text: "Créer ou personnaliser un thème", handler: props.actionProvider.handleOption5, id: 5 },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="faq-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="faq-options-container">{optionsMarkup}</div>;
};

export default FaqOptions;
