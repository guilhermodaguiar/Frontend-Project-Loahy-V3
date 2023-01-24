![LoahyTree Logo](src/assets/Loahy_logo_DEF_dark_RGB_Normaal.png)

# Loahy | 2022 | Novi Hogeschool | Eindopdracht Full Stack Developer

|                                               |                                      |
|-----------------------------------------------|--------------------------------------|
| ![Novi-Hogeschool](src/assets/logo_novi2.png) | ![React](src/assets/react_klein.png) |

> Dit is de Frontend voor mijn webapplicatie **Loahy**. Loahy zal als een begin versie zijn voor een hobby/project [LoahyTree](https://www.instagram.com/loahytree/).
> De bedoeling is deze in de toekomst uit te breiden tot een daadwerkelijke running applicatie.
>
[Github voor de FRONT-END van Loahy vind je hier]( https://github.com/guilhermodaguiar/Frontend-Project-Loahy-V1)

[Github voor de BACK-END van Loahy vind je hier]( https://github.com/guilhermodaguiar/Backend-Project-Loahy-V1)


## Applicatie starten

Voor het **clonen** van de repository voor Loahy wordt verwezen naar de links in [Github](https://github.com):

| Soort | URL                                                                 |
|-------|---------------------------------------------------------------------|
| HTTPS | `https://github.com/guilhermodaguiar/Frontend-Project-Loahy-V1.git` |
| SSH   | `git@github.com:guilhermodaguiar/Frontend-Project-Loahy-V1.git`     |


>Voordat de applicatie gebruikt kan worden dient deze eerst op een correcte manier geïnstalleerd te worden.
>Volg de stappen en run daarna de applicatie.

Als je het project gecloned hebt naar jouw locale machine, installeer je eerst de node_modules door het volgende commando in de terminal te runnen:

`npm install`

installeer ook react-icons:

`npm install react-icons`

installeer vervolgens react-router-dom:

`npm install react-router-dom@5.2.0`.

> React router is __*deprecated*__ en er is geleerd om met deze versie te werken.
Dit is de reden om de niet te werken met de nieuwe features van ***react-router-dom***.

Wanneer alle packages geïnstalleerd zijn, kun je de applicatie starten met behulp van:

`npm start`

of gebruik de WebStorm knop (npm start). Open http://localhost:3000 om de pagina in de browser te bekijken

---

## Map Guide
Hieronder staan de mappen structuur met de kort uitleg waarvoor ze gebruikt worden.

### Assets
Deze map bevat alle gebruikte afbeeldingen zoals *logo's*, *backgrounds* en *afbeeldingen van de producten* zelf.

### Pages
Pages bevat alle webpagina's voor de applicatie.
### Context
Er zijn vier context gemaakt. Deze kunnen hun *informatie* delen met elk component.
> - UserAuthContext
> - ShoppingCartContext
> - WishlistContext

### Components

### Helpers
### Routing
In de routing staan de routes met hun path.


# Gebruikers & Rollen
De volgende gebruikers kunnen worden gebruikt om de applicatie te testen. In de database en **data.sql** bestand in de backend zijn nog andere users toegevoegd, maar één rol voor user is voor nu voldoende.
Een eigen **account** kan gemaakt worden om producten toe te voegen aan een *wishlist* of aan een *shopping cart*.


>#### ADMIN_ROLE
> - gebruikersnaam: admin@test.nl
> - wachtwoord: admin123
>
> #### USER_ROLE
> - gebruikersnaam: user@test.nl
> - wachtwoord: test123


###### Eindopdracht Full-Stack Developer NOVI College | Guilhermo d'Aguiar | Copyright © 2022 Loahy | Alle Rechten Voorbehouden.
 
