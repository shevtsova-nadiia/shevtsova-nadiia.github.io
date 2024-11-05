/// <reference types="cypress"/>

describe ('Project 2', () => {
    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/project-2')
    })

    it ('Test Case 01 - Validate the login form', () => {
        // 1 way
        cy.get('#username').should('be.visible').and('not.have.attr', 'required')
        cy.get('[for="username"]').should('have.text', 'Please enter your username')
        cy.get('#password').should('be.visible').and('not.have.attr', 'required')
        cy.get('[for="password"]').should('have.text', 'Please enter your password')
        cy.get('#login_btn').should('be.visible').and('be.enabled').and('have.text', 'LOGIN')
        cy.get('[href="/frontend/project-2"]').should('be.visible').and('have.text', 'Forgot Password?').and('have.attr', 'href')

        //2 way
        const info = ['username', 'password', 'login_btn', '[href="/frontend/project-2"]']
        const [username, password, login_btn, link] = info
        cy.get(`#${username}, #${password}`).should('be.visible').and('not.have.attr', 'required')
        cy.get(`[for="${username}"]`).should('have.text', 'Please enter your username')
        cy.get(`[for="${password}"]`).should('have.text', 'Please enter your password')
        cy.get(`#${login_btn}`).should('be.visible').and('be.enabled').and('have.text', 'LOGIN')
        cy.get(`${link}`).should('be.visible').and('have.text', 'Forgot Password?').and('have.attr', 'href')
    })

    const infoUser = ['TechGlobal', 'Test1234']
    const [username, password] = infoUser

    it('Test Case 02 - Validate the valid login', () => {
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.get('#login_btn').click()
        cy.get('#success_lgn').should('have.text', 'You are logged in')
        cy.get('#logout').should('have.text', 'LOGOUT')
    })

    it('Test Case 03 - Validate the logout', () => {
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.get('#login_btn').click()
        cy.get('#logout').click()
        cy.get('.is-size-3, #username, #password, #login_btn').should('be.visible')
    })

    it('Test Case 04 - Validate the Forgot Password? Link and Reset Password modal', () => {
        cy.get('[href="/frontend/project-2"]').click()
        cy.get('.modal.is-active #modal_title').should('be.visible')
        cy.get('.delete').should('be.visible')
        cy.get('#email').should('be.visible')
        cy.get('[for="email"]').should('have.text', "Enter your email address and we'll send you a link to reset your password. ")
        cy.get('#submit').should('be.visible').and('be.enabled').should('have.text', 'SUBMIT')
    })

    it('Test Case 05 - Validate the Reset Password modal close button', () => {
        cy.get('[href="/frontend/project-2"]').click()
        cy.get('.modal.is-active #modal_title').should('be.visible')
        cy.get('.delete').click()
        cy.get('.modal.is-active').should('not.exist')
    })

    it('Test Case 06 - Validate the Reset Password form submission', () => {
        cy.get('[href="/frontend/project-2"]').click()
        cy.get('#email').type('sh@gmail.com')
        cy.get('#submit').click()
        cy.get('#confirmation_message').should('have.text', 'A link to reset your password has been sent to your email address.')
    })

    it('Test Case 07 - Validate the invalid login with the empty credentials', () => {
        cy.get('#login_btn').click()
        cy.get('#error_message').should('have.text', 'Invalid Username entered!')
    })

    const infoUsers = [
        {
            username: 'John',
            password: 'Test1234',
            message: 'Invalid Username entered!',
            description: 'the wrong username'
        },
        {
            username: 'TechGlobal',
            password: '1234',
            message: 'Invalid Password entered!',
            description: 'the wrong password'
        },
        {
            username: 'John',
            password: '1234',
            message: 'Invalid Username entered!',
            description: 'the wrong username and password'
        }
    ]
    
    infoUsers.forEach((el, i) => {
        it(`Test Case 0${i+8}- Validate the invalid login with ${el.description}`, () => {
            cy.get('#username').type(el.username)
            cy.get('#password').type(el.password)
            cy.get('#login_btn').click()
            cy.get('#error_message').should('have.text',el.message)
        })
    })
})