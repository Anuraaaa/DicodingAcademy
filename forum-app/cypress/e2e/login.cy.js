describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  })

  it('should display login page correctly', () => {
    cy.get('input[id="email"]').should('be.visible')
    cy.get('input[id="password"]').should('be.visible')
    cy.get('button').contains(/^Login$/).should('be.visible')
  })

  it('should display alert when email is empty', () => {
    cy.get('button').contains(/^Login$/).click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Gagal login! email tidak ada')
    })
  })

  it('should display alert when password is empty', () => {
    cy.get('input[id="email"]').type('testuser@example.com')
    cy.get('button').contains(/^Login$/).click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Gagal login! password tidak ada')
    })
  })

  it('should display alert when email and password are wrong', () => {
    cy.get('input[id="email"]').type('testuser@example.com')
    cy.get('input[id="password"]').type('wrong_password')
    cy.get('button').contains(/^Login$/).click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Gagal login! User ID or password is wrong')
    })
  })

  it('should display homepage when email and password are correct', () => {
    cy.get('input[id="email"]').type('testuser@example.com')
    cy.get('input[id="password"]').type('test123456')
    cy.get('button').contains(/^Login$/).click()
    cy.visit('http://localhost:5173/')
  })
})
