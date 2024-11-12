import BookingPage from '../../pages/BookingPage'


const bookingPage = new BookingPage

describe('Booking Page', () => {

  beforeEach(() => {
    cy.visit('https://techglobal-training.com/frontend/project-3')

    cy.fixture('example').then(function(data) {
      this.headerTable = data.headerTable
      this.labelBookingForm = data.labelBookingForm
      this.arrTestCase_3 = data.arrTestCase_3
      this.dateTestCase_3 = data.dateTestCase_3
      this.arrTestCase_3_DepartInfo = data.arrTestCase_3_DepartInfo

      this.arrTestCase_4 = data.arrTestCase_4
      this.dateTestCase_4 = data.dateTestCase_4
      this.arrTestCase_4_DepartInfo = data.arrTestCase_4_DepartInfo

      this.arrTestCase_5 = data.arrTestCase_5
      this.dateTestCase_5 = data.dateTestCase_5
      this.arrTestCase_5_DepartInfo = data.arrTestCase_5_DepartInfo
    })
  })

  it('Test Case 01 - Validate the default Book your trip form', () => {

    bookingPage.getBookingFormLabel().each(function ($el, i) {
      cy.wrap($el).should('have.text', this.labelBookingForm[i])       
    })

    bookingPage.getOneWayInput()
        .should('be.visible')
        .and('not.be.disabled')
        .and('have.attr', 'checked')
    bookingPage.getRoundTripInput()
        .should('be.visible')
        .and('not.be.disabled')
        .and('not.have.attr', 'checked')

    bookingPage.getBookingFormSelector()
        .should('be.visible')
        .should('have.length.greaterThan', 2)

    bookingPage.getNumberOfPassengersSelector()
    .select(0).should('have.value', '1')

    bookingPage.getPassenger_1Selector()
    .select(0).should('have.value', 'Adult (16-64)')   
    
  })

  it('Test Case 02 - Validate the Book your trip form when Round trip is selected', () => {
    bookingPage.getRoundTripInput().click().should('be.checked')
    bookingPage.getOneWayInput().should('not.be.checked')

  })

  it('Test Case 03 - Validate the booking for 1 passenger and one way', function () {
    bookingPage.clickOneWayInput()
    bookingPage.getBookingFormSelector().each(function ($el, i) {
        cy.wrap($el).select(this.arrTestCase_3[i])
    })
    bookingPage.getDepart().first().next().clear().type(`${this.dateTestCase_3}{enter}`)
    bookingPage.clickBookButton()
    bookingPage.getDepartInfo().each( function ($el, i){
        cy.wrap($el).should('have.text', this.arrTestCase_3_DepartInfo[i])
    })
  })
  
  it('Test Case 04 - Validate the booking for 1 passenger and round trip', function () {
    bookingPage.clickRoundTripInput()
    bookingPage.getBookingFormSelector().each(function ($el, i) {
        cy.wrap($el).select(this.arrTestCase_4[i])
    })
    bookingPage.getDepart().each(function ($el, i) {
        cy.wrap($el).next().clear().type(`${this.dateTestCase_4[i]}{enter}`)
    })
    bookingPage.clickBookButton()
    bookingPage.getDepartInfo().each( function ($el, i){
        cy.wrap($el).should('have.text', this.arrTestCase_4_DepartInfo[i])
    })
  })

  it('Test Case 05 - Validate the booking for 2 passengers and one way', function () {
    bookingPage.getOneWayInput().should('be.checked')
    bookingPage.getNumberOfPassengersSelector()
    .select(1).should('have.value', '2')

    bookingPage.getBookingFormSelector().each(function ($el, i) {
        cy.wrap($el).select(this.arrTestCase_5[i])
    })
    bookingPage.getDepart().first().next().clear().type(`${this.dateTestCase_5}{enter}`)
    bookingPage.clickBookButton()
    bookingPage.getDepartInfo().each( function ($el, i){
        cy.wrap($el).should('have.text', this.arrTestCase_5_DepartInfo[i])
    })
  }) 
})
