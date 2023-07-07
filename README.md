![LoahyTree Logo](src/assets/Loahy_logo_DEF_dark_RGB_Normaal_klein.png)

# Loahy | 2023 | Novi Hogeschool | Eindopdracht Full Stack Developer

|                                               |                                      |
|-----------------------------------------------|--------------------------------------|
| ![Novi-Hogeschool](src/assets/logo_novi2.png) | ![React](src/assets/react_klein.png) |

> Dit is de Frontend voor mijn webapplicatie **Loahy**. Loahy zal als een begin versie zijn voor een hobby/project [LoahyTree](https://www.instagram.com/loahytree/).
> De bedoeling is deze in de toekomst uit te breiden tot een daadwerkelijke running applicatie.
>
[Github voor de FRONT-END van Loahy vind je hier]( https://github.com/guilhermodaguiar/Frontend-Project-Loahy-V3)

[Github voor de BACK-END van Loahy vind je hier]( https://github.com/guilhermodaguiar/Backend-Project-Loahy-V3)


## Applicatie starten

Voor het **clonen** van de repository voor Loahy wordt verwezen naar de links in [Github](https://github.com):

| Soort | URL                                                                 |
|-------|---------------------------------------------------------------------|
| HTTPS | `https://github.com/guilhermodaguiar/Frontend-Project-Loahy-V3.git` |
| SSH   | `git@github.com:guilhermodaguiar/Frontend-Project-Loahy-V3.git`     |


>Voordat de applicatie gebruikt kan worden dient deze eerst op een correcte manier geïnstalleerd te worden.
>Volg de stappen en run daarna de applicatie. Voordat de applicatie gestart wordt moet de backend ook van git worden
> geïnstalleerd. Voor een complete handleiding van de gehele applicatie wordt verwezen naar de installatiehandleiding:
> Deze kan gevraagd worden door te mailen naar: [Contact Me](mailto:dguilhermo@gmail.com)
> 

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


### Context
Er zijn vijf context gemaakt. Deze kunnen hun *informatie* delen met elk child component en ook onderling met elkaar.
> - AuthContext.js :  *bevat alle authenticatie data als een user inlogd*  
> - CartContext.js:  *bevat alle context voor een cart van een user* 
> - WishlistContext.js: *bevat alle cotext voor een wensenlijst van een user*
> - ItemListContext.js: *bevat context dat data van een cart opslaat in een lijst*
> - ItemsContext.js: *bevat context van alle gefetchte dat van producten dat beschikbaar is voor Loahy*

### Components

Bevat alle components dat gebruikt worden voor de applicatie. 

### Helpers
Er zijn enkele helpers gebruikt in de applicatie.
> - ClickToShop.js: *om users te verwijzen naar de shop en hun producten*
> - FormatCurrency.js: *om de gekozen valuta altijd in EUR te veranderen*
> - Reducers.js: *bevat alle switch cases dat gebruikt wordt door useReducers van context*
> - PrivateRoute.js: *om een prive route te maken*
> - ScrollIndicator.js en ScrollToTop.js: *om een scroll te maken dat met een klik de user kan brengen naar een bepaald gedeelte van de applicatie*

### Layout
> - Bevat alle navbars dat gebruikt wordt: * adminNavbar, userNavbar en navbar*
> - Header.js : *begin pagina met een button naar de producten van Loahy*
> - Footer.js : *een footer met externe websites etc van Loahy*


### Pages
> - Bevat alle pages dat de user ziet: home, cart, wishlist, login/register, checkout
> - Bevat de admin page

# Gebruikers & Rollen
De volgende gebruikers kunnen worden gebruikt om de applicatie te testen. In de database en **data.sql** bestand in de backend zijn nog andere users toegevoegd, maar één rol voor user is voor nu voldoende.
Een eigen **account** kan gemaakt worden om producten toe te voegen aan een *wishlist* of aan een *shopping cart*.


>#### ADMIN_ROLE
> - gebruikersnaam: admin@test.nl
> - wachtwoord: Admin123!
>
> #### USER_ROLE
> - gebruikersnaam: user@test.nl
> - wachtwoord: User123!


###### Eindopdracht Full-Stack Developer NOVI College | Guilhermo d'Aguiar | Copyright © 2023 Loahy | Alle Rechten Voorbehouden.
 
