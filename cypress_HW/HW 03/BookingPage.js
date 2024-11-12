class BookingPage {

  getBookingFormLabel () {
    return cy.get('.label, .radio, .Button_c_button')
  }

  getBookingFormSelector() {
    return cy.get('.select select')
  }

  getOneWayInput () {
    return cy.get ('.mr-1').first()
  }
  
  getRoundTripInput () {
    return cy.get ('.mr-1').last()
  }

  getTripTypeInput() {
    return cy.get('.mr-1')
  }

  getNumberOfPassengersSelector () {
    return cy.contains('.label', 'Number of passengers').parent().find('select')
  }

  getPassenger_1Selector() {
    return cy.contains('.label', 'Passenger 1').parent().find('select')
  }

  getDepart() {
    return cy.get('.react-datepicker__aria-live')
  }

  getBookButton () {
    return cy.get('.Button_c_button__TmkRS')
  }

  getDepartInfo () {
    return cy.get('.ml-3 h3, .ml-3 p, .mt-4 p')
  }

  getDepart_ReturnInfo () {
    return cy.get('.ml-3 h3, .ml h3, .ml p, .ml-3 p, .mt-4 p')
  }

  clickOneWayInput() {
    return this.getOneWayInput().click()  
  }

  clickRoundTripInput() {
    return this.getRoundTripInput().click()
  }

  clickBookButton() {
    return this.getBookButton().click()
  }

}

export default BookingPage