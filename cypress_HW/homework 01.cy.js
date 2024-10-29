/// <reference types="cypress"/>

describe ('Project 1', () => {
    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/project-1')
    })

    it('Test Case 01 - Validate the Contact Us information', () => {
        // 1 way  
        cy.get('div.mb-5 > h1.is-size-3').should('have.text', 'Contact Us')
        cy.get('#address').should('have.text', '2800 S River Rd Suite 310, Des Plaines, IL 60018')
        cy.get('#email').should('have.text', 'info@techglobalschool.com')
        cy.get('#phone-number').should('have.text', '(224) 580-2150')

        // 2 way
        const info = ['Contact Us', '2800 S River Rd Suite 310, Des Plaines, IL 60018', 'info@techglobalschool.com', '(224) 580-2150']
        const [contact_us, address, email, phone_number] = info

        cy.get('div.mb-5 > h1.is-size-3').should('have.text', contact_us)
        cy.get('#address').should('have.text', address)
        cy.get('#email').should('have.text', email)
        cy.get('#phone-number').should('have.text', phone_number)

        // 3 way
        cy.get('div.mb-5 > h1, div.mb-5 > p').each(($el, i) => {
            cy.wrap($el).should('have.text', info[i])
        })
    })
    
    const label = ['Full name *', 'Gender *', 'Address', 'Email *', 'Phone', 'Message', ' I give my consent to be contacted.']
    const [full_name_l, gender_l, address_l, email_l, phone_l, message_l, consent_l] = label

    const placeholder = ['Enter your full name', 'Enter your address', 'Enter your email', 'Enter your phone number', 'Type your message here...'] 
    const [full_name_ph, address_ph, email_ph, phone_ph, message_ph] = placeholder

    // 1 way
    it('Test Case 02 - Validate the Full name input box', () => {
        cy.get(`input.input[placeholder="${full_name_ph}"]`).should('be.visible')
        cy.get(`input.input[placeholder="${full_name_ph}"]`).should('have.attr', 'required')
        cy.get('div.field:first-child > label.label').should('have.text', full_name_l)
        cy.get(`input.input[placeholder="${full_name_ph}"]`).should('have.attr', 'placeholder', full_name_ph)
    })

    it('Test Case 04 - Validate the Address input box', () => {
        cy.get(`input.input[placeholder="${address_ph}"]`).should('be.visible')
        cy.get(`input.input[placeholder="${address_ph}"]`).should('not.have.attr', 'required')
        cy.get('div.field:nth-child(3) > label.label').should('have.text', address_l)
        cy.get(`input.input[placeholder="${address_ph}"]`).should('have.attr', 'placeholder', address_ph)
    })

    it ('Test Case 05 - Validate the Email input box', () => {
        cy.get(`input.input[placeholder="${email_ph}"]`).should('be.visible')
        cy.get(`input.input[placeholder="${email_ph}"]`).should('have.attr', 'required')
        cy.get('div.field:nth-child(4) > label.label').should('have.text', email_l)
        cy.get(`input.input[placeholder="${email_ph}"]`).should('have.attr', 'placeholder', email_ph)
    })

    it ('Test Case 06 - Validate the Phone input box', () => {
        cy.get(`input.input[placeholder="${phone_ph}"]`).should('be.visible')
        cy.get(`input.input[placeholder="${phone_ph}"]`).should('not.have.attr', 'required')
        cy.get('div.field:nth-child(5) > label.label').should('have.text', phone_l)
        cy.get(`input.input[placeholder="${phone_ph}"]`).should('have.attr', 'placeholder', phone_ph)
    })

    it ('Test Case 07 - Validate the Message text area', () => {
        cy.get('textarea.textarea').should('be.visible')
        cy.get('textarea.textarea').should('not.have.attr', 'required')
        cy.get('div.field:nth-child(6) > label.label').should('have.text', message_l)
        cy.get('textarea.textarea').should('have.attr', 'placeholder', message_ph)
    })

    // 2 wayd
    const arrRequired = ['Enter your full name', 'Enter your email']

    it ('Test 02, 04 - 07', () => {
        cy.get('input.input, textarea.textarea').each(($el, i) => {
            cy.wrap($el).should('be.visible').
            and('have.attr', 'placeholder', placeholder[i])
        })
        cy.get('label.label, label.checkbox').each(($el, i) => {
            cy.wrap($el).should('have.text', label[i])
        })
        cy.get('input.input:required').each(($el, i) => {
            cy.wrap($el).invoke('attr', 'placeholder').then(el => {
                expect(el).to.eq(arrRequired[i]);
            })
        })
        cy.get(`input.input[placeholder="${address_ph}"], input.input[placeholder="${phone_ph}"], textarea.textarea`)
        .should('not.have.attr', 'required')
    })

    it('Test Case 03 - Validate the Gender radio button', () => {

        const gender = ['Male', 'Female', 'Prefer not to disclose']

        cy.get('div.field:nth-child(2) label.label').should('have.text', gender_l)
        cy.get('input.mr-1[type="radio"]').should('have.attr', 'required')
        cy.get('label.radio').each(($el, i) => {
            cy.wrap($el).should('have.text', gender[i])
        })
        cy.get('input.mr-1[type="radio"]').each($el => {
            cy.wrap($el).should('be.enabled').should('not.be.checked')
        })

        gender.forEach($el => {
            cy.contains('label.radio', $el).find('input.mr-1[type="radio"]').check().should('be.checked')
            gender.forEach($otherEl => {
                if ($otherEl !== $el){
                    cy.contains('label.radio', $otherEl).find('input.mr-1[type="radio"]').should('not.be.checked')  
                }
            })
        })
    })    
  
    it('Test Case 08 - Validate the Consent checkbox', () => {
        cy.get('div.field:nth-child(7) label.checkbox').should('have.text', consent_l)
        cy.get('div.field:nth-child(7) input[type="checkbox"]').should('be.enabled')
        .check().should('be.checked')
        .uncheck().should('not.be.checked')
        .and('have.attr', 'required')
    })

    it('Test Case 09 - Validate the SUBMIT button', () => {
        cy.get('div.field.is-grouped button.button.is-link').should('be.visible')
        .and('be.enabled')
        .and('have.text', 'SUBMIT')
    })

    const userInfo = ['Nadia Sh', 'Des Plaines', 'nadia@gmail.com', '+11234567890', 'Hi, my name is Nadia']

    it('Test Case 10 - Validate the form submission', () => {
        cy.get('input.input, textarea.textarea').each(($el, i) => {
            cy.wrap($el).type(userInfo[i])
        })
        cy.get('div.field:nth-child(2) input.mr-1').eq(1).check()
        cy.get('div.field:nth-child(7) input[type="checkbox"]').check()
        cy.get('form').submit()
        cy.get('.mt-5').should('be.visible')
        .and('have.text', 'Thanks for submitting!')
    })
})