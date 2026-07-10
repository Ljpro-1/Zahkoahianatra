import { db } from "./firebase-config.js";

import {
    ref,
    push,
    set,
    get
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";



document.addEventListener("DOMContentLoaded", () => {

const savedUser =
localStorage.getItem("user");


const remember =
localStorage.getItem("rememberDevice");


if(savedUser && remember === "true"){

    window.location.href="page2.html";

    return;

}

const btnRegister = document.getElementById("btn-register");
const btnLogin = document.getElementById("btn-login");

const registerModal = document.getElementById("register-modal");
const loginModal = document.getElementById("login-modal");

const closeRegister = document.getElementById("close-modal");
const closeLogin = document.getElementById("close-login");

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");




// =======================
// OUVERTURE MODALES
// =======================


if(btnRegister){

btnRegister.addEventListener("click",()=>{

registerModal.classList.add("active");

});

}



if(btnLogin){

btnLogin.addEventListener("click",()=>{

loginModal.classList.add("active");

});

}





// =======================
// FERMETURE MODALES
// =======================


if(closeRegister){

closeRegister.addEventListener("click",()=>{

registerModal.classList.remove("active");

});

}



if(closeLogin){

closeLogin.addEventListener("click",()=>{

loginModal.classList.remove("active");

});

}



window.addEventListener("click",(e)=>{


if(e.target === registerModal){

registerModal.classList.remove("active");

}


if(e.target === loginModal){

loginModal.classList.remove("active");

}


});







// =======================
// INSCRIPTION
// =======================


if(registerForm){


registerForm.addEventListener("submit",async(e)=>{


e.preventDefault();



const name =
document.getElementById("child-name")
.value.trim();



const phone =
document.getElementById("parent-phone")
.value.trim();



const password =
document.getElementById("password")
.value;



const confirm =
document.getElementById("confirm-password")
.value;



const remember =
document.getElementById("remember-me")
.checked;





if(password.length !== 6){

alert(
"Le mot de passe doit contenir 6 chiffres"
);

return;

}




if(password !== confirm){

alert(
"Les mots de passe ne correspondent pas"
);

return;

}




try{


// =======================
// VERIFICATION DOUBLON NUMERO
// =======================

const snapshot =
await get(ref(db,"users"));


let existe = false;
let appareilExiste = false;


const monDevice =
localStorage.getItem("deviceId");


snapshot.forEach((child)=>{


const user = child.val();


if(user.phone === phone){

    existe = true;

}
if(user.deviceId === monDevice){

    appareilExiste = true;

}


});


if(existe){

alert(
"Ce numéro existe déjà. Connectez-vous."
);

return;

}
if(appareilExiste){

alert(
"un appareil ne peut pas avoir deux compte different."
);

return;

}



// =======================
// CREATION DU COMPTE
// =======================
// =======================
// IDENTIFIANT APPAREIL
// =======================

let deviceId =
localStorage.getItem("deviceId");


if(!deviceId){

    deviceId =
    crypto.randomUUID();


    localStorage.setItem(
        "deviceId",
        deviceId
    );

}




const userRef =
push(ref(db,"users"));



const userData = {

name:name,

phone:phone,

password:password,
deviceId:deviceId,


dateDebut:
new Date()
.toISOString(),



dateFin:
new Date(
Date.now()
+
7*24*60*60*1000
)
.toISOString(),



remember:remember,


createdAt:
new Date()
.toISOString()



};





await set(
userRef,
userData
);




// garder la connexion

localStorage.setItem(
"user",
JSON.stringify(userData)
);





alert(
"Bienvenue "+name
);



registerModal.classList.remove("active");



window.location.href =
"page2.html";



}

catch(error){


alert(
"Erreur Firebase : "
+error.message
);


}



});


}







// =======================
// CONNEXION
// =======================


if(loginForm){


loginForm.addEventListener("submit",async(e)=>{


e.preventDefault();




const phone =
document.getElementById("login-phone")
.value.trim();



const password =
document.getElementById("login-password")
.value;

const rememberDevice =
document.getElementById("remember-device").checked;



try{


const snapshot =
await get(
ref(db,"users")
);



let userFound = null;




snapshot.forEach((child)=>{


const user =
child.val();



if(
user.phone === phone &&
user.password === password
){


userFound = user;


}


});





if(userFound){



if(rememberDevice){

    localStorage.setItem(
        "user",
        JSON.stringify(userFound)
    );

    localStorage.setItem(
        "rememberDevice",
        "true"
    );

}
else{

    sessionStorage.setItem(
        "user",
        JSON.stringify(userFound)
    );

}



alert(
"Connexion réussie"
);



window.location.href =
"page2.html";



}

else{


alert(
"Numéro ou mot de passe incorrect"
);


}



}

catch(error){


alert(
"Erreur Firebase : "
+error.message
);


}



});


}



});




const aboutBtn =
    document.getElementById("about-btn");


const aboutModal =
    document.getElementById("about-modal");


const closeAbout =
    document.getElementById("close-about");



if (aboutBtn) {
    
    aboutBtn.addEventListener("click", () => {
        
        aboutModal.classList.add("active");
        
    });
    
}



if (closeAbout) {
    
    closeAbout.addEventListener("click", () => {
        
        aboutModal.classList.remove("active");
        
    });
    
}

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
