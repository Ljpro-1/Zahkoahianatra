/**
 * PAGE 2
 * Profil + Score + Abonnement + Installation PWA
 */


document.addEventListener(
"DOMContentLoaded",
()=>{


// =================================
// RECUPERATION UTILISATEUR
// =================================


const user =

JSON.parse(
localStorage.getItem("user")
);



let nomEnfant = "Joueur";


if(user && user.name){

nomEnfant = user.name;

}





// =================================
// SCORE
// =================================


const score =

Number(
localStorage.getItem("scoreTotal")
) || 0;





const nameField =

document.getElementById(
"player-name"
);



const avatarField =

document.getElementById(
"player-avatar"
);



const scoreField =

document.getElementById(
"score-counter"
);





// Afficher nom

if(nameField){

nameField.textContent =
nomEnfant;

}




// Avatar

if(avatarField){

avatarField.textContent =

nomEnfant
.charAt(0)
.toUpperCase();

}




// Score

if(scoreField){

scoreField.textContent =

`⭐ ${score}`;

}







// =================================
// BOUTONS MATIERES
// =================================


const boutons =

document.querySelectorAll(
".game-card-btn"
);



boutons.forEach(
bouton=>{


bouton.addEventListener(
"click",
()=>{


const matiere =

bouton.dataset.game;



console.log(
"Début exercice :",
matiere
);



});


});









// =================================
// ABONNEMENT
// =================================


const abonnementBtn =

document.getElementById(
"subscription-btn"
);





if(
user &&
abonnementBtn &&
user.dateFin
){



const date =

new Date(
user.dateFin
);





const jour =

String(
date.getDate()
)
.padStart(2,"0");





const mois =

String(
date.getMonth()+1
)
.padStart(2,"0");





const annee =

date.getFullYear();






abonnementBtn.innerHTML =

`

<span class="sub-title">

Abonnement manaraka

</span>


<span class="sub-date">

${jour}/${mois}/${annee}

</span>

`;



}



});









// =================================
// INSTALLATION PWA
// =================================


let deferredPrompt = null;




const installBtn =
 
 document.getElementById(
  "install-btn"
 );






if (installBtn) {
 
 installBtn.style.display = "none";
 
}







window.addEventListener(
 
 "beforeinstallprompt",
 
 (event) => {
  
  
  // empêcher l'affichage automatique
  
  event.preventDefault();
  
  
  
  // sauvegarder l'événement
  
  deferredPrompt = event;
  
  
  
  
  
  if (installBtn) {
   
   installBtn.style.display = "block";
   
  }
  
  
  
 }
 
);








if (installBtn) {
 
 
 
 installBtn.addEventListener(
  
  "click",
  
  async () => {
   
   
   
   if (!deferredPrompt) {
    
    return;
    
   }
   
   
   
   
   // ouvrir installation
   
   deferredPrompt.prompt();
   
   
   
   
   
   const choix =
    
    await deferredPrompt.userChoice;
   
   
   
   
   
   console.log(
    
    "Installation :",
    
    choix.outcome
    
   );
   
   
   
   
   
   deferredPrompt = null;
   
   
   
   
   installBtn.style.display = "none";
   
   
   
  }
  
 );
 
 
 
}









// =================================
// APPLICATION INSTALLEE
// =================================


window.addEventListener(
 
 "appinstalled",
 
 () => {
  
  
  console.log(
   "Application installée"
  );
  
  
  
  if (installBtn) {
   
   installBtn.style.display = "none";
   
  }
  
  
  
 }
 );
 document.getElementById("shareBtn").addEventListener("click", async () => {

const lang = localStorage.getItem("selectedLanguage") || "fr";
const data = translations[lang];

const shareData = {
    title: data.shareTitle,
    text: data.shareText,
    url: window.location.href
};

if (navigator.share) {

    try{
        await navigator.share(shareData);
    }catch(e){}

} else {

    await navigator.clipboard.writeText(shareData.url);

    alert(lang==="fr"
        ? "Le lien a été copié. Vous pouvez maintenant le partager."
        : "The link has been copied. You can now share it.");

}

});




