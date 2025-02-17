
module.exports = {
      signupViews :(req, res) =>{
        res.render('signup')
      },

    validationsignup : async (req, res) => {
        console.log("corp requête body", req.body);
        console.log("corps requête nom", req.body.lastname);
        console.log("corps requête prénom", req.body.firstname);
        console.log("corps requête de l'email", req.body.email);
        console.log("corps requête date de naissance", req.body.birthdate);
        console.log("corp requête mot de passe", req.body.password);

        
        let nom = req.body.lastname;
        let prenom = req.body.firstname;
        let email = req.body.email;
        let naissance = req.body.birthdate;
        let password = req.body.password;
        let requeteSQL;
        let donnees;


        //utilisation de bcrypt pour hacher le mots de passe 

        requeteSQL ="INSERT INTO utilisateur (id, nom, prenom, email, mot_de_passe, date_de_naissance) VALUES (?, ?, ?, ?, ?, ?, )";
        donnees = [null, nom, prenom, email, password, naissance];

        req.getConnection((erreur, connection)=> { 
            if(erreur) {
                console.log("erreur", erreur);
            } else {
                connection.query(requeteSQL, donnees, (err, ajout) => { 
                    if (err) {
                       console.log("erreur de connextion", err);
                    } else {
                        console.log("mission réussi");
                       res.status(302).redirect("/signup");
                    }
               });
            }
        });
       
        
    }
};
    
