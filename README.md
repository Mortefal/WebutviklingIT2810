# Prosjekt 4

## Krav til innhold og funksjonalitet
[Løsningen skal være en prototyp på en søkbar katalog med frontend hvor brukeren skal kunne formulere et søk og få presentert et søkeresultat, og en backend database med et REST API (eller graphQL).]

* En dialog/form for input av søk

### Pagination
* Listebasert presentasjon av søk hvor det er lagt opp til håndtering av store resultatsett med enten blaing i sider, eller dynamisk laster av flere resultater ved scrolling

**Server**

I serveren var pagination enkelt oppnådd ved en plugin, mongoose-pagination til aktuelle Schema (Beverages). For å unngå massive svar fra serveren, er sidestørrelsen satt til 20 som standard. Altså vil det kun hentes ut 20 drikkevarer om gangen, gitt at annet ikke er spesifisert.
Pagination brukes ved å legge til parametere ```page=n&pagesize=m``` i url-en. n er da hvilken side, og m er sidetall. De er henholdsvis 1 og 20 per standard.

Denne måten å gjøre pagination sørger for korrekt sortering, og rekkefølge på sidene.

### Details Page
På hver av produktkortene, vil det være en "Vis mer" knapp, som trigger en Modal, og hadde API kallet vårt inkludert et bilde, ville vi ha fått sett en større versjon av bildet enn hva som vises i produktkortet.Det vil også kunne vises mer info om produktet, med opprinnelsesland, smak osv. Det vil også være et indikatorhjerte som sier om det er favoritt eller ikke.
    

### Filtrering og sorterting
* Mulighet for sortering og filtrering av resultatsettet (merk at sortering og filtrering skal utføres på hele resultatsettet og ikke bare det som tilfeldigvis er laster inn på klienten)

Filtrering og sortering er også oppnådd serverside, ved at aktuelle funksjoner som vil hente ut filtrerbare verdier har en pre-prosesseringsfunksjon som henter ut parametere som skal med i søket, og hvilke som tilpasser den.
Når '?' brukes i URL-en vil express automatisk prosessere dette til et simpelt javascript-objekt slik:
```
// URL: http://.../beverages/search?name=talisker&price=400&page=2
// JS-objekt:
{
    name: "talisker",
    price="400",
    page="2"
}
```
Ditte java-objektet blir så kjørt via preprosesseringen slik vi får to objekter - options og query. Query er da hva det søkes på, som navn og pris, mens options er instillinger slik som sidestall og størrelse.
Utifra dette kalles ```Model.find(query, options)```.

En liten sak vi er klar over, men som vi ikke prioriterte da det var utenfor skopet til oppgaven, er at søkene er per nå ganske naive - de antar gydlig input, og legges det til ugydlige parametere finner vi ingenting.
Løsningen ville vært videre pre-prosessering og sanitering av input, men dette falt som sagt utenfor.
### Favorisering
 Noe bruker/bruksgenererte data som skal lagres (persistent på databaseserveren) og  presenteres (enten bruker som legger til informasjon, reviews, ratings etc, historikk om søkene eller annet, handleliste).
 På hvert produkt fra databasen, vil det være mulig å klikke på et hjerte for å vise at man liker produktet. Dette styres med state ifra redux, men det lagres ikke på databasen. Det som lagres i databasen er tidligere søk.
 Ettersom dette prosjektet kun er en prototype, har vi lagt opp til at det skal være mulig å sortere på favoritter.
### Graf el. liknende, får se
* Valgfritt:  En funksjonalitet for å vise dataene med kart, ordsky, graf, whatever (avansert visning)
Ikke innført
## Krav til teknologi

### React
Instansiert med create-react-app

### Redux eller Mobx
Hva gjorde vi her, hvorfor?
Vi valgte å bruke Redux, men har hatt problemer med å få til å bruke det sammen med API-kall, så prosjektet har kun en enkel store, med få variabler, mens resten er gjort med vanlig state i react.
Vi undervurderte hvor vanskelig det ville være å sette opp Redux, og innså for sent at dette var mer komplisert enn vi hadde trodd. Arbeidet med å gjøre om hele prosjektet til å være i Redux viste seg å være for omfattende til at vi kunne klare å få levert et så godt produkt som muig innen leveringsfristen. 
Vi valgte derfor å fokusere på ferdigstillelse. 
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
#### Material UI





