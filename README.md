# Prosjekt 4

## Krav til innhold og funksjonalitet

### En dialog/form for input av søk

Input fra brukeren valgte vi å ta inn gjennom en input i et form. Her kan brukeren skrive inn navn på en drikke, og etter at brukeren har trykket på enter eller trykket på knappen ‘Søk’ vil de første (opp til 20) resultatene vises. Søkefunksjonen virker slik at den finner alle drikkene med navn i likhet med det du søkte på. Dette betyr at om du søker på f.eks. ‘øl’ vil du få opp varer som ‘Arvesølvet Juleakevitt 2018’ fordi resultatet inneholder ‘øl’. Dette gjør søkingen litt mer fleksibel, men den er fortsatt ikke glad i skrivefeil. Skriver brukeren et ord helt feil vil ikke noe resultat vises. 

### Pagination
I UI gjorde vi pagination til en veldig enkel interaksjon. Dette gjorde vi ved å ha 2 knapper nederst på siden. En knapp for forrige side og en knapp for neste side. Brukeren kan bla til neste side/forrige side helt til det ikke lengre er noen flere sider å bla igjennom. 

**Server**

I serveren var pagination enkelt oppnådd ved en plugin, mongoose-pagination til aktuelle Schema (Beverages). For å unngå massive svar fra serveren, er sidestørrelsen satt til 20 som standard. Altså vil det kun hentes ut 20 drikkevarer om gangen, gitt at annet ikke er spesifisert.
Pagination brukes ved å legge til parametere ```page=n&pagesize=m``` i url-en. n er da hvilken side, og m er sidetall. De er henholdsvis 1 og 20 per standard.

Denne måten å gjøre pagination sørger for korrekt sortering, og rekkefølge på sidene.

### Details Page
På hver av produktkortene, vil det være en "Vis mer" knapp, som trigger en Modal, og hadde API kallet vårt inkludert et bilde, ville vi ha fått sett en større versjon av bildet enn hva som vises i produktkortet.Det vil også kunne vises mer info om produktet, med opprinnelsesland, smak osv. Det vil også være et indikatorhjerte som sier om det er favoritt eller ikke.
    

### Filtrering og sorterting
* Mulighet for sortering og filtrering av resultatsettet (merk at sortering og filtrering skal utføres på hele resultatsettet og ikke bare det som tilfeldigvis er laster inn på klienten)
Brukeren kan filtrere søkene sine ved å velge en av filtrene. Når et filter velges vises de 20 første drikkene innenfor denne kategorien. Om brukeren ønsker å sortere et søk på en kategori velges først en kategori og deretter søker man, eller søker og velger en kategori.
Et kjent problem er at når brukeren har søkt vil søket bli med videre til brukeren søker på noe nytt. Dette betyr at brukeren ikke lengre kan trykke på en kategori og få de 20 første resultatene for hele kategorien etter at det første søket er gjort. 

Vi ønsket at brukeren skulle kunne filtrere drikkene basert på pris. Derfor har vi 3 sorteringsalternativer. Brukeren kan sortere i synkende pris (starter med den dyreste), sortere i økende pris (starter med den billigste), eller synkende basert på navn (slik søket kommer originalt fra databasen). Ved å klikke på en av radio knappene vil hele datasettet sorteres tilsvarende.

Filtrering og sortering er også oppnådd på serversiden ved at aktuelle funksjoner som vil hente ut filtrerbare verdier har en pre-prosesseringsfunksjon som henter ut parametere som skal med i søket, og hvilke som tilpasser den.
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
Dette java-objektet blir så kjørt via preprosesseringen slik vi får to objekter - options og query. Query er da hva det søkes på, som navn og pris, mens options er innstillinger slik som sidestall og størrelse.
Utifra dette kalles ```Model.find(query, options)```.

En liten sak vi er klar over, men som vi ikke prioriterte da det var utenfor skopet til oppgaven, er at søkene er per nå ganske naive - de antar gydlig input, og legges det til ugydlige parametere finner vi ingenting.
Løsningen ville vært videre pre-prosessering og sanitering av input, men dette falt som sagt utenfor.

### Søkehistorie/Favorisering
 Noe bruker/bruksgenererte data som skal lagres (persistent på databaseserveren) og  presenteres (enten bruker som legger til informasjon, reviews, ratings etc, historikk om søkene eller annet, handleliste).
På hvert produkt fra databasen, vil det være mulig å klikke på et hjerte for å vise at man liker produktet. Dette styres med state ifra redux, men det lagres ikke på databasen. Det som lagres i databasen er tidligere søk.
Når en bruker søker på noe legges dette til i databasen med en counter på hvor mange ganger dette navnet har blitt søkt på. Denne dataen vises på siden under input feltet. Her ser du topp søk med antall ganger de har blitt søkt. 
Om prosjektet skulle videreutvikles hadde vi jobbet med å lage en side for å se alle favoritter og muligens lagt opp til sortering på favoritter.

## Krav til teknologi

### React
Instansiert med create-react-app

### Redux eller Mobx
Vi valgte å bruke Redux, men hadde store problemer med å få til å bruke det sammen med API-kall, og Cardlist.js renderingen, som gjorde det vanskelig for oss å få distinkte states på hvert kort. Pga dette er det ikke lagt inn noe Redux i prosjektet, da vi ikke fikk den funksjonaliteten vi ville med bruk av Redux. 

Vi undervurderte hvor vanskelig det ville være å sette opp Redux, og innså for sent at dette var mer komplisert enn vi hadde trodd. Arbeidet med å gjøre om hele prosjektet til å være i Redux viste seg å være for omfattende til at vi kunne klare å få levert et så godt produkt som mulig innen leveringsfristen. 
Vi valgte derfor å fokusere på ferdigstillelse. Hadde vi startet prosjektet på nytt hadde dette vært en større prioritet fra starten. 

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
Vi valgte å benytte oss av Material UI, som benytter seg av Google’s material design for å lage React komponenter som vi har brukt for implementere SimpleCard.js, Detailspage.js, favoriteHeart.js og TabBar.js. Det har gitt siden et fint og enkelt grensesnitt, samtidig som det oppfylte behovene vi hadde for utforming i prosjektet.





