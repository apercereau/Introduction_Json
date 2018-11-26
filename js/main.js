/*
Déclaration des variables 
*/ 
   // let homeButton = document.querySelector('li:nth-child(1) a');
   // console.log(homeButton);

    let myNav = document.querySelectorAll('nav a');
   // console.log(myNav);
    
//

/*
Activer la navigation 
*/ 
    //Faire une boucle sur myNav (collection de liens)
    for( let item of myNav){
        //item => lien de la nav
        console.log(item);

        //Capter le clic sur le lien
        item.addEventListener( 'click', (event) =>{
            //Bloquer le comportement naturel de la balise
            event.preventDefault()  //enlever le fait de changer de page au clique 
         //   console.log(item); //balise
         //   console.log(item.getAttribute('link-data')) //attribut de la balise

            //Récupérer la valeur de l'attribut link-data
            const pageName = item.getAttribute('link-data')

            //Ajouter le contenu dans le dom 
            fetchHtmlData(pageName)

           // console.log(pageName)
           
        });
    };

/*
Création d'une fonction fetch 
*/ 



    const fetchHtmlData = (page ='contacts') => { // on charge contacts de base
        //Requête asynchrone sur un fichier html
        fetch(`./Content/${page}.html`) // on part du fichier qui éxecute le javascript
        // 1er callback : analyse et traitement du fetch
        .then( reponseRaw => {
            //console.log(reponseRaw)
            //renvoyer la réponse au format texte 
            return reponseRaw.text()
        }) 
        // 2ème callback : manipuler les données 
        .then( textResponse => {
            //console.log(textResponse)
            // Ajouter le contenu dans le dom
            document.querySelector('main').innerHTML = textResponse

            let myForm = document.querySelectorAll('form');
            //console.log(myForm);
            //Envoyer le nom de la page dans le dernier then 
            return page;
        })

        .then( page => {
            console.log(page);
            //Vérifier le nom de la page active 
            if (page === 'contacts')  submitForm()
        })
        // Capter les erreurs
        .catch( error => {
            console.error(error)
        });
        //fonction qui s'enchaine, fonction callBack (s'exécute après le fetch) 
    }

/* 
Gestion du formulaire
*/ 

    const submitForm = () => {
        let myForm = document.querySelector('form');
         //Déclaration des variables  
         let msgSubject = document.querySelector('[placeholder="Sujet"]');
         let msgEmail = document.querySelector('[placeholder="Email"]');
         let msgMessage = document.querySelector('[placeholder="Votremessage"]');
         let messageList = document.querySelector('form + ul');

        console.log(myForm);
        //Capter le submit du formulaire 
        myForm.addEventListener( 'submit', (event) =>{
            let formError = 0;

             //Bloquer le comportement naturel de la balise
             event.preventDefault();
             
            

             //Le sujet est valide s'il contient au minimum 2 caractères
             if( msgSubject.value.length >=2){
                console.log('Sujet validé');
             } else {
                console.log('Sujet non validé');
                formError ++;
                msgSubject.classList.add('formError');
             }

             //L'email est valide s'il contient au minimum 5 caractères
             if( msgEmail.value.length >=5){
                console.log('Email validé');
             } else {
                console.log('Email non validé');
                formError ++;
                msgEmail.classList.add('formError');
             }

             //Le message est valide s'il contient au minimum 5 caractères
             if( msgMessage.value.length >=5){
                console.log('Message validé');
             } else {
                console.log('Message non validé');
                formError ++;
                msgMessage.classList.add('formError');
             }
             
             //Validation finale du formulaire 
             if( formError ===0){
                 console.log('Le formulaire est validé !');

                 //Afficher le message dans la liste 
                 messageList.innerHTML += `
                    <li>
                        <h3>${msgSubject.value} <b> ${msgEmail.value}</b></h3>
                        <p>${msgMessage.value}</p>
                    </li>
                 `

                 //Envoyer les données...
                 //Vider le formulaire 
                 msgEmail.value='';
                 msgMessage.value ='';
                 msgSubject.value='';
             }
            
        })   
            //Supprimer les messages d'erreurs au focus
        msgSubject.addEventListener( 'focus', () => {
            msgSubject.classList.remove('formError')
        })
        msgEmail.addEventListener( 'focus', () => {
            msgEmail.classList.remove('formError')
        })
        msgMessage.addEventListener( 'focus', () => {
            msgMessage.classList.remove('formError')
        })
    };

        fetchHtmlData();




