
describe("Visit the prosject page", function () {
    it('Goes to http://it2810-15.idi.ntnu.no:3000/prosjekt4', function () {
        cy.visit('http://it2810-15.idi.ntnu.no/prosjekt4/')
    })
})
describe("Click hvitvin, and view details on Detailspage", function () {
    it('Open first result and find origin country', function () {
        cy.visit('http://it2810-15.idi.ntnu.no/prosjekt4/');
        cy.contains("Hvitvin").click();
        cy.contains("Ökonomierat Rebholz");
        cy.contains("Mer Info").click();
        cy.contains("Opprinnelsesland");
    })
})
describe("Search for Cava", function () {
    it('Should search for cava', function () {
        cy.visit('http://it2810-15.idi.ntnu.no/prosjekt4/').get('.input').click().type("Cava").type('{enter}');
        cy.contains("i heart Cava Brut");
    })
});
describe("Click heart!", function () {
    it('Click the heart, and observe the change in color!', function () {
        cy.visit('http://it2810-15.idi.ntnu.no/prosjekt4/').contains("Hvitvin").click();
        cy.get('svg[id="Emptyheart"]');

        //expect(cy.find('svg[id="Emptyheart"]').toBe(true));
        cy.get('#SVG').click({multiple: true});
        cy.get('svg[id="Redheart"]');
    })
})
describe("Sort results on asc pris, dsc pris", function () {
    it('Clicks Rødvin, gets the select first items price, click radiobutton: dsc pris, expect the price to be higher than first element', function () {
        cy.visit('http://it2810-15.idi.ntnu.no/prosjekt4/').contains("Rødvin").click();
        cy.get('[type="radio"]').check('Asc');
        cy.contains("38.5 Kr");
        cy.get('[type="radio"]').check('Desc');
        cy.contains("9695 Kr");
        expect(38.5).to.be.lessThan(9695);
    })
})
