# Fichier de configuration
Le fichier de configuration doit se trouver dans la racine du bot et se nommer config.json

```json
{
  "token": "Token_du_bot_Discord",

  "ytapikey": "Token_du_bot_Youtube",

  "db": {
    "host": "IP de la base de donnée",
    "user": "User",
    "password": "MDP",
    "database": "Nom_de_la_BDD"
  },  

  "prefix": "Préfixe_du_bot",

  "averto1": "ID du rôle de l'avertissement lvl 1",
  "averto2": "ID du rôle de l'avertissement lvl 2",

  "wchan": "ID du salon de bienvenue",
  "mchan": "ID du salon compteur de membres",

  "gchan": "ID du salon de discussion général",
  "logchan": "ID du salon de logs",

  "tcat":"ID de la catégorie pour les tickets",

  "adminr": "ID du rôle administrateur",
  "modr": "ID du rôle modérateur",
  "baser": "ID du rôle attribué de base à tous les membres",
  "botr": "ID du rôle des bots",

  "aideinfo": "ID du rôle aide informatique",
  "dev": "ID du rôle développeur",
  "pinglive": "ID du rôle notifs live",
  "mosping": "ID du rôle notifs MochaOs",

  "grd1": "ID du rôle des membres actifs",
  "grd2": "ID du rôle des pilliers du serveur"
}
```
# Modèle de la base de données.
ID de l'utilisateur (ID) | Averto [0 | 1 | 2] (averto) | Rôles Optionnels [{"dev":0|1,"mosping":0|1,"aideinfo":0|1,"pinglive":0|1}] (optrol) | Grades [0 | 1 | 2] (grd) | rank | lvl | xp
