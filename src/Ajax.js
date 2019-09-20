//Requêtes AJAX

//Constantes
const access_token = '4fce1edf2c6e50605b307ebcad5f86f917d2ff2bceccdbbba28b4ecef64ba087';

//Requête authentification 
const url = 'https://api.wizbii.com/v1/account/validate?';

var req = new XMLHttpRequest();
var fcDatas = {};
req.open("POST", url, true);
req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
req.send("username=decouverte%2B2%40wizbii.com&password=decouverte&client_id=test&grant_type=password");

req.addEventListener("load", function () {
    if (req.status >= 200 && req.status < 400) { // Le serveur a réussi à traiter la requête
        console.log(req.responseText);
        fcDatas = JSON.parse(req.responseText);
        
        const profile = fcDatas.profile.name;
        console.log(profile);
        document.querySelector(".Profile-title").innerHTML = "Hello " + profile +" ! La communauté t'écoute.";
    } else {
        // Affichage des informations sur l'échec du traitement de la requête
        console.error(req.status + " " + req.statusText);
    }
});
req.addEventListener("error", function () {
    // La requête n'a pas réussi à atteindre le serveur
    console.error("Erreur réseau");
});


//Requête pour afficher les posts
const urlPost = 'https://api.wizbii.com/v2/dashboard/?direction=newest?';

var request = new XMLHttpRequest();
var posts = {};
request.open("POST", urlPost, true);
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
request.setRequestHeader( "authorization", "Bearer " + access_token );
request.send('{}');

request.addEventListener("load", function () {

    if (request.status >= 200 && request.status < 400) { // Le serveur a réussi à traiter la requête
        console.log(request.responseText);
        
        //Récupération des posts
        posts = JSON.parse(request.responseText);

        //Fonction qui permet de récupérer le contenu des posts
        postInfos(posts);

    } else {
        // Affichage des informations sur l'échec du traitement de la requête
        console.error(request.status + " " + request.statusText);
    }
});
request.addEventListener("error", function () {
    // La requête n'a pas réussi à atteindre le serveur
    console.error("Erreur réseau");
});

// Récupere le contenu
function postInfos(posts){
  
  const post = posts.feed_items.feed_items;
  console.log(post);
  var postsElt = document.querySelector(".post");

  for (let i=0;i<18;i++){
    // Ajout des différents éléments d'un post
    var postContainer = document.createElement("div");
    postContainer.className = 'Post-container';

    var titleElt = document.createElement("h4");
    titleElt.textContent = post[i].publication.poster.displayName;

    var contentElt = document.createElement("p");
    if (post[i].publication.company.home_tab.description !== undefined) {
      var content = post[i].publication.company.home_tab.description.slice(0,450);
      var reg =new RegExp("<.[^>]*>", "gi" );
      contentElt.textContent = content.replace(reg, "" );
    }
    else {
      contentElt.textContent = "Désolé il n'y a pas de description pour ce poste."
    }

    var cityElt = document.createElement("p");
    cityElt.textContent = post[i].publication.company.location.city;

    var comments = document.createElement("p");
    comments.textContent = post[i].publication.comments.length + " commentaire(s)";
    comments.className = "Post-comments";

    var contract = document.createElement("p");
    contract.className = "Post-contract";
    if (post[i].publication.shared_job !== undefined) {
      contract.textContent = post[i].publication.shared_job.contract.title;
    }
    else {
      contract.textContent = "Le type de contrat n'est pas renseigné"
    }

    for (let j=0;j<2;j++) {
      var tags = document.createElement("p");
      tags.className = 'Post-tags';
      tags.textContent = '#'+post[i].publication.tags[j].name;
    }

    var input = document.createElement("input");
    input.className = "Post-input";
    input.placeholder = "Ajouter un commentaire ... ";

    postsElt.appendChild(postContainer);
    postContainer.appendChild(titleElt);
    postContainer.appendChild(contract);
    postContainer.appendChild(tags);
    postContainer.appendChild(contentElt);
    postContainer.appendChild(cityElt);
    postContainer.appendChild(comments);
    postContainer.appendChild(input);
  }
}