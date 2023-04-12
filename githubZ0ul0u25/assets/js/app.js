"use strict";
/**
 * TIM - QUIZ
 * @author: Philippe Gourdeau;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Bonne réponse !",
        "negative": "Mauvaise réponse..."
    },
    "explications": {
        "Q1": "LMG gère officiellement 7 chaîne Youtube afin de couvrir les goût de tout le monde : LinusTechTips, Techlinked, ShortCircuit, Techquickie, LMGClips, Channel Super Fun et MAC address",
        "Q2": "En date du 27 février 2022, il y a 59 membres officiels au sein de LMG… et ça n’arrête pas d’augmenter!",
        "Q3": "WAN signifie « Wide Area Network » mieux reconnu comme étant Internet. Le WAN show est présenté depuis plusieurs année par Linus Sebastian et Luke Lafreniere mettant en évidence les nouvelles, petites et grandes, dans le monde des technologies."
    },
    "bonnesReponses": [
        "Q1C",
        "Q2B",
        "Q3A"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Vous ne semblez pas connaître LMG, puis-je vous suggéré un détour sur leurs chaînes Youtube?",
        "note33": "Vous auriez pu faire mieux. Je vous suggère de visiter leurs vidéos sur Youtube",
        "note66": "Bravo, vous avez une bonne connaissance générale de LMG",
        "note100": "Félicitations, vous êtes un fin connaisseur !"
    }
};

/* Objet Quiz */
const quiz = {
    debuterQuiz: function () { },
    validerReponse: function (idReponse) { },
    afficherResultats: function () { }
};