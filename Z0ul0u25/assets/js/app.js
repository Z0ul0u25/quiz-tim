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
        "Q1": "LMG gère officiellement 7 chaîne Youtube afin de couvrir les goût de tout le monde : LinusTechTips, Techlinked, ShortCircuit, Techquickie, LMGClips, Channel Super Fun et MAC address. Il y a aussi de façon non officiel la chaîne LinusCatTips pour les amoureux des chats",
        "Q2": "En date du 27 février 2022, il y a 59 membres officiels au sein de LMG… et ça n’arrête pas d’augmenter!",
        "Q3": "WAN signifie « Wide Area Network » mieux reconnu comme étant Internet. Le WAN show est présenté depuis plusieurs année par Linus Sebastian et Luke Lafreniere mettant en évidence les nouvelles, petites et grandes, dans le monde des technologies."
    },
    "bonnesReponses": [
        "Q1_C",
        "Q2_B",
        "Q3_A"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Vous ne semblez pas connaître LMG, puis-je vous suggéré un détour sur leurs chaînes Youtube?",
        "note33": "Vous auriez pu faire mieux. Je vous suggère de visiter leurs vidéos sur Youtube",
        "note66": "Bravo, vous avez une bonne connaissance générale de LMG",
        "note100": "Félicitations, vous êtes un fin connaisseur !"
    }
};


const refForm = document.getElementsByTagName("form")[0];
const refQuestions = document.getElementsByTagName("fieldset");
const refPrincipal = document.getElementById("principal");

let btnSuivant;

/* Objet Quiz */
const quiz = {
    questionCourante: -1,
    bonneReponses: 0,

    debuterQuiz: function () {
        refForm.classList.remove("cacher");
        refPrincipal.classList.add("cacher");
        refQuestions[++this.questionCourante].classList.remove("cacher");
    },

    validerReponse: function (idReponse) {
        let bonneReponse = objJSON.bonnesReponses[quiz.questionCourante];

        let retroaction = document.createElement("div");
        let commentaire1 = document.createElement("p");
        let commentaire2 = document.createElement("p");

        retroaction.className = "grid_12_de_12 retroaction";
        retroaction.append(commentaire1);
        retroaction.append(commentaire2);

        commentaire2.innerText = objJSON.explications[`Q${quiz.questionCourante + 1}`];

        refQuestions[this.questionCourante].querySelector(".reponse").classList.remove("conteneur");
        refQuestions[this.questionCourante].querySelector(".reponse").classList.add("flxRow");

        for (const elem of refQuestions[this.questionCourante].querySelectorAll(`[name=Q${quiz.questionCourante + 1}]:not(:checked):not([value=${bonneReponse}])`)) {
            elem.classList.add("cacher");
            elem.nextElementSibling.classList.add("cacher");
        }

        idReponse.checked = false;

        document.getElementById(`${bonneReponse}`).classList.add("bonne-reponse");

        if (idReponse.value == objJSON.bonnesReponses[this.questionCourante]) {
            commentaire1.innerText = objJSON.retroactions.positive;
            //idReponse.classList.add("bonne-reponse");
            this.bonneReponses += Math.pow(2, this.questionCourante);
        } else {
            idReponse.classList.add("mauvaise-reponse");

            commentaire1.innerText = objJSON.retroactions.negative;
        }
        refQuestions[this.questionCourante].append(retroaction);
        btnSuivant.innerText = (this.questionCourante != 2) ? "Question suivante" : "Afficher les résultats";
    },

    afficherQuestionSuivante: function () {
        refQuestions[this.questionCourante].classList.add("cacher");
        refQuestions[++this.questionCourante].classList.remove("cacher");
        btnSuivant.innerText = "Vérifier ma réponse";
    },

    afficherResultats: function () {
        let iconOK = `<svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32.5" cy="32.5" r="32.5" fill="#278805"/>
        <path d="M26.2755 48.9283L9 32.7324L11.7142 29.8371L26.1865 43.4049L54.5915 15L57.3977 17.806L26.2755 48.9283Z" fill="black"/>`;
        let iconX = `<svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32.5" cy="32.5" r="32.5" fill="#DC1010"/>
        <path d="M53.0002 14.6415L50.3585 12L33.0001 29.3584L15.6417 12L13 14.6415L30.3585 32L13 49.3585L15.6417 52L33.0001 34.6416L50.3585 52L53.0002 49.3585L35.6417 32L53.0002 14.6415Z" fill="black"/>
        </svg>`;




        refQuestions[this.questionCourante].classList.add("cacher");
        btnSuivant.innerText = "Retour à l'acceuil";

        refPrincipal.classList.remove("cacher");
        refPrincipal.querySelector("button").remove();
        refPrincipal.querySelector("p").remove();

        let h2 = document.createElement("h2");
        h2.innerText = "Résultat:";

        let divResultat = document.createElement("div");
        divResultat.classList.add("resultat");

        let pResultat = document.createElement("p");
        pResultat.innerText = `${this.bonneReponses.toString(2).length}/3`;

        let divIcons = document.createElement("div");

        let bonneReponsesBin = this.bonneReponses.toString(2);

        while (bonneReponsesBin.length < 3) bonneReponsesBin = "0" + bonneReponsesBin;

        for (let i = objJSON.bonnesReponses.length - 1; i >= 0 ; i--) {
            divIcons.innerHTML += ((bonneReponsesBin[i] != "1") ? iconX : iconOK);
        }

        refPrincipal.append(h2);
        refPrincipal.append(divResultat);
        divResultat.append(pResultat);
        divResultat.append(divIcons);
    }
};

/**
 * Affiche la question suivante et cache la question courrante si valide
 * @param {Event} e Évenement déclancheur.
 */
function etapeSuivante(e) {
    switch (e.currentTarget.innerText) {
        case "Commencer le Quiz!":
            quiz.debuterQuiz();
            break;
        case "Vérifier ma réponse":
            quiz.validerReponse(document.querySelector(`input[name='Q${quiz.questionCourante + 1}']:checked`));
            break;
        case "Afficher les résultats":
            quiz.afficherResultats();
            break;
        case "Retour à l'acceuil":
            window.location.reload();
            break;
        default:
            btnSuivant.setAttribute("disabled", "disabled");
            quiz.afficherQuestionSuivante();
            break;
    }
}


// (quiz.questionCourante != 0)?refQuestions[quiz.questionCourante - 1].classList.add("cacher"):null;




/**
 * cache le formulaire et chaque question individuellement.
 */
function cacherForm() {
    for (const question of refQuestions) {
        question.classList.add("cacher");
    }
    refForm.classList.add("cacher");
}

/**
 * Ajoute les boutons requis pour être interactif.
 */
function ajoutBtnsInteractif() {
    let btn = document.createElement("button");
    btn.classList.add("suivant");
    btn.innerText = "Commencer le Quiz!";
    btn.addEventListener("click", etapeSuivante, false);
    refPrincipal.appendChild(btn);
}

/**
 * Désactive le bouton suivant.
 */
function choixReponse() {
    btnSuivant.removeAttribute("disabled");
}

/**
 * Action après le chargement de la page.
 */
function initialisation() {
    // (document.getElementsByTagName("body")[0].classList.contains("js-detector")) ? setupJS() : null;
    btnSuivant = document.querySelector("form>button");
    btnSuivant.innerText = "Vérifier ma réponse";
    btnSuivant.setAttribute("disabled", "disabled");
    btnSuivant.addEventListener("click", etapeSuivante, false);
    // Évenement pour prévenir l'envoi du formulaire
    refForm.addEventListener("submit", function (e) { e.preventDefault(); });

    for (const label of document.getElementsByTagName("label")) {
        label.addEventListener("click", choixReponse, false);
    }

    cacherForm();
    ajoutBtnsInteractif();

    // Pour je ne sais qu'elle holly reason, avec getElementsByClassName("margin-bottom") ça ne retire pas la classe sur le deuxième élément.
    for (const element of document.querySelectorAll(".margin-bottom")) {
        element.classList.remove("margin-bottom");
    }

    // Reset de checked en cache
    for (const elem of document.querySelectorAll(":checked")) {
        elem.checked = false;
    }

}

window.addEventListener("DOMContentLoaded", initialisation, false);