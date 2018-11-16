# Prosjekt 4

## Krav til innhold og funksjonalitet

### REST-API og bruk 
Selve rest-apiet som ble laget er tilgjengelig ved:
```
http://it2810-15.idi.ntnu.no:3000/beverages 
```
Bruker av port 3000 er for å unngå konflikt med selve applikasjonen som lytter på port 80. 
Følgende GET-requests er mulig, med lenken over som suffiks:

* search 
* types
* history 

Merk at ved search får du bare 20 gjenstander per default, om ikke annet oppgis ved pagesize=x. I search kan query lages ved ?key1=value1&key2=value2 og så videre. 

I search er følgende options mulig: 
* sort=_1 / sort=_-1  // -1 er synkende rekkefølge (øverste høyest) og standard 
* page=n // Går til side n. n må være minst 1
* pagesize = m // Setter sidestørrelse til m. 

Prøv for eksempel [å søke på navnet ‘talisker’ blant whiskeyer sortert på pris. ](http://it2810-15.idi.ntnu.no:3000/beverages/search?name=talisker&productType=Whisky&sort=price)  (Merk at page 2 vil være blank her da antallet er under 20. Kall med en lavere pagesize eller bredere søk for å teste sider). 

I history (/beverages/history) gis en json med søketekst og antall ganger søkt på. 

Types (/beverages/types) gir en json på formatet {[{‘mainCategory: String, ‘subCategories’: [String]]} 

### En dialog/form for input av søk

Input fra brukeren valgte vi å ta inn gjennom en input i et form. Her kan brukeren skrive inn navn på en drikke, og etter at brukeren har trykket enter eller trykket på knappen ‘Søk’ vil de første (opp til 20) resultatene vises. Søkefunksjonen virker slik at den finner alle drikkene med navn som inneholder med det du søkte på. Dette betyr at om du søker på f.eks. ‘øl’ vil du få opp varer som ‘Arvesølvet Juleakevitt 2018’ fordi resultatet inneholder ‘øl’. Dette gjør søkingen litt mer fleksibel, men den er fortsatt ikke glad i skrivefeil. Skriver brukeren et ord helt feil vil ikke noe resultat vises. 

Rent teknisk løses søkefunksjonen ved å konvertere den til en regex ```/søkt_navn/i ```. 

### Pagination
I UI gjorde vi pagination til en veldig enkel interaksjon. Dette gjorde vi ved å ha 2 knapper nederst på siden. En knapp for forrige side og en knapp for neste side. Brukeren kan bla til neste side/forrige side helt til det ikke lengre er noen flere sider å bla igjennom. Om det ikke finnes flere sider før eller etter vil knappen bli deaktivert og ikke mulig å klikke på.


I serveren var pagination enkelt oppnådd ved en plugin, mongoose-pagination til aktuelle Schema (Beverages). For å unngå massive svar fra serveren, er sidestørrelsen satt til 20 som standard. Altså vil det kun hentes ut 20 drikkevarer om gangen, gitt at annet ikke er spesifisert.
Pagination brukes ved å legge til parametere ```page=n&pagesize=m``` i url-en. n er da hvilken side, og m er sidetall. De er henholdsvis 1 og 20 per standard.

Denne måten å gjøre pagination sørger for korrekt sortering, og rekkefølge på sidene.

### Details Page
På hver av produktkortene, vil det være en "Vis mer" knapp, som trigger en Modal, og hadde API kallet vårt inkludert et bilde, ville vi ha fått sett en større versjon av bildet enn hva som vises i produktkortet. Siden inkluderer mer infomasjon om produktet, som opprinnelsesland, smak osv. Det er også et indikatorhjerte som sier om det er en favoritt eller ikke.

### Filtrering og sorterting
Brukeren kan filtrere søkene sine ved å velge en av filtrene. Når et filter velges vises de 20 første produktene innenfor denne kategorien. Om brukeren ønsker å sortere et søk på en kategori velges først en kategori og deretter søker man, eller søker og velger en kategori.
Et kjent problem er at når brukeren har søkt vil søket bli med videre til brukeren søker på noe nytt. Dette betyr at brukeren ikke lengre kan trykke på en kategori og få de 20 første resultatene for hele kategorien etter at det første søket er gjort. 

Vi ønsket at brukeren skulle kunne sortere drikkene basert på pris. Derfor har vi 3 sorteringsalternativer. Brukeren kan sortere i synkende pris (starter med den dyreste), sortere i økende pris (starter med den billigste), eller synkende basert på navn (slik søket kommer originalt fra databasen). Ved å klikke på en av radio knappene vil hele datasettet sorteres tilsvarende. 

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
Dette javascript-objektet blir deretter sendt til preprosesseringen slik vi får to objekter - options og query. Query er da hva det søkes på, som navn og pris, mens options er innstillinger slik som sidestall og størrelse.
Utifra dette kalles ```Model.find(query, options)```.

En liten sak vi er klar over, men som vi ikke prioriterte da det var utenfor skopet til oppgaven, er at søkene er per nå ganske naive - de antar gydlig input, og legges det til ugydlige parametere finner vi ingenting.
Løsningen ville vært videre pre-prosessering og sanitering av input, men dette falt som sagt utenfor.

### Søkehistorie/Favorisering
På hvert produkt fra databasen, vil det være mulig å klikke på et hjerte for å vise at man liker produktet. Dette styres med state ifra redux, men det lagres ikke på databasen. Det som lagres i databasen er tidligere søk.
Når en bruker søker på noe legges dette til i databasen med en counter på hvor mange ganger dette navnet har blitt søkt på. Denne dataen vises på siden under input feltet. Her ser du topp 5 søk (de 5 søkene som blitt søkt på flest ganger). Obs: Dette kommer først opp når brukeren har gjennomført et søk. 
Om prosjektet skulle videreutvikles hadde vi jobbet med å lage en side for å se alle favoritter og muligens lagt opp til sortering på favoritter.

## Krav til teknologi

### React
Instansiert med create-react-app

### Redux eller Mobx
Vi valgte å bruke Redux, men hadde store problemer med å få til å bruke det sammen med API-kall, og Cardlist.js renderingen, som gjorde det vanskelig for oss å få distinkte states på hvert kort. Pga dette er det ikke lagt noe særlig Redux i prosjektet, da vi ikke fikk den funksjonaliteten vi ville med bruk av Redux. 

Vi undervurderte hvor vanskelig det ville være å sette opp Redux, og innså for sent at dette var mer komplisert enn vi hadde trodd. Arbeidet med å gjøre om hele prosjektet til å være i Redux viste seg å være for omfattende til at vi kunne klare å få levert et så godt produkt som mulig innen leveringsfristen. 
Vi valgte derfor å fokusere på ferdigstillelse. Hadde vi startet prosjektet på nytt hadde dette vært en større prioritet fra starten. 

### Database
Databasen vi kjører er MongoDB, og denne drives i rest-apiet av mongoose. MongoDB er en relasjonsfri (NoSQL) database, som var velegnet for datasettet vårt: omlag 19 500 ulike
drikkevarer fra vinmonopolet. Her er det stort potensiale for å gjøre en rekke interessante analyser. En ulempe er selvsagt at uten relasjoner ville potensielt vært brukerdata med mer fungert suboptimalt, men ettersom dette ikke var prioritert falt valget på Mongo.

Ved prosjektets innlevering er databasen tilgjengelig ved å bruke ``` mongo://it2810-15.idi.ntnu.no:2701/ ```

### Express
Vi brukte express som krevd i oppgaven. Selve express-prosjektet ble opprettet ved å bruke express-generator. Dette gav et ferdig oppsatt skjelett,
komplett med 404 og 500 -håndtering og mer. Med dette opprettet, var det en smal sak å fylle på med routere med mer.

### Valg av komponenter og api
#### Material UI
Vi valgte å benytte oss av Material UI, som benytter seg av Google’s material design for å lage React komponenter som vi har brukt for implementere SimpleCard.js, Detailspage.js, favoriteHeart.js og TabBar.js. Det har gitt siden et fint og enkelt grensesnitt, samtidig som det oppfylte behovene vi hadde for utforming i prosjektet.

## Testing

### Snapshot tester
Gjennom prosjekt 3 ble vi kjent med Snapshot tester i jest. Dette var en grei og lett måte å sjekke at komponentene våre rendret som vi ønsket og at ingenting hadde endret seg fra snapshottet, derfor valgte vi å benytte oss av slike tester til dette prosjektet også. 

### Enhets-testing og cypress
For enhetstesting valgte vi å fokusere på bruken av automatisk end-to-end testing da dette var noe gruppa ikke hadde arbeidet med før, og vi ville ha mest læringsutbytte av. I cypress lagde vi tester som simulerte bruk av UI, og tester at selve applikasjonen kjører som vi forventer. 

### API-testing
I API-et er testingen i stor grad enhetstesting med standard Jest. Dette er fordi funksjonene under lupen enten returnerer noe, eller så er de stort sett kall til databasen. Derfor vil en kunne observere at testcoverage i server/utilities/beverageRetriever.js er god i forhold til antall linjer, men dårlig i forhold til antall funksjoner. De funksjonene som står uten tester er de som utfører selve kallet til databasen. 

For å teste dette måtte vi koblet til en test-database, noe som kunne absolutt vært gjennomførbart, men også noe som potensielt faller utfor skopet til enhetstesting. 

Det som ble gjort for å gjøre koden testbar derimot, var å flytte mye av logikken til funksjoner som vanlige funksjoner som er enkle å teste. Et godt eksempel er prepareQuery, som gjør hovedvekten av getFromQuerys logikk. 

