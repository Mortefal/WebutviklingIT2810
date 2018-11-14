# Prosjekt 4

## Krav til innhold og funksjonalitet
[Løsningen skal være en prototyp på en søkbar katalog med frontend hvor brukeren skal kunne formulere et søk og få presentert et søkeresultat, og en backend database med et REST API (eller graphQL).]

* En dialog/form for input av søk

### Pagination
* Listebasert presentasjon av søk hvor det er lagt opp til håndtering av store resultatsett med enten blaing i sider, eller dynamisk laster av flere resultater ved scrolling

### Details Page
* Muligheten for å se mer detaljer om hvert av objetene

### Filtrering og sorterting
* Mulighet for sortering og filtrering av resultatsettet (merk at sortering og filtrering skal utføres på hele resultatsettet og ikke bare det som tilfeldigvis er laster inn på klienten)
telnet towel.blinkenlights.nlv
### Favorisering
* Noe bruker/bruksgenererte data som skal lagres (persistent på databaseserveren) og  presenteres (enten bruker som legger til informasjon, reviews, ratings etc, historikk om søkene eller annet, handleliste).

### Graf el. liknende, får se
* Valgfritt:  En funksjonalitet for å vise dataene med kart, ordsky, graf, whatever (avansert visning)

## Krav til teknologi

### React
Instansiert med create-react-app

### Redux eller Mobx
Hva gjorde vi her, hvorfor?
```
git fucked -f --hard
```

### Database
Databasen vi kjører er MongoDB, og denne drives i rest-apiet av mongoose. MongoDB er en relasjonsfri (NoSQL) database, som var velegnet for datasettet vårt: omlag 19 500 ulike
drikkevarer fra vinmonopolet. Her er det stort potensiale for å gjøre en rekke interessante og potensielt studentnyttige analyser. En ulempe er selvsagt at uten
relasjoner ville potensielt vært suboptimalt, men ettersom dette ikke var prioritert falt valget på Mongo.

Ved prosjektets innlevering er databasen tilgjengelig ved å bruke ``` mongo://it2810-15.idi.ntnu.no:2701/ ```

### Express
Vi brukte express som krevd i oppgaven. Selve express-prosjektet ble opprettet ved å bruke express-generator. Dette gav et ferdig oppsatt skjelett,
komplett med 404 og 500 -håndtering og mer. Med dette opprettet, var det en smal sak å fylle på med routere med mer.

### Valg av komponenter og api