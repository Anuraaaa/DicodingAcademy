describe('FormThread', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/new')
    })

    it('should display form elements correctly', () => {
      cy.get('h1').should('contain.text', 'Buat Diskusi Baru')
      cy.get('label[for="title"]').should('contain.text', 'Judul')
      cy.get('input#title').should('be.visible')
      cy.get('label[for="category"]').should('contain.text', 'Kategori')
      cy.get('input#category').should('be.visible')
      cy.get('label[for="desc"]').should('contain.text', 'Deskripsi')
      cy.get('textarea#desc').should('be.visible')
      cy.get('button').contains('Buat').should('be.visible')
    })

    it('should display error message when submitting empty form', () => {
      cy.get('button').contains('Buat').click()

      cy.on('window:alert', (str) => {
        expect(str).to.equal('Gagal membuat diskusi! judul tidak ada')
      })
    })

    it('should display error message when submitting invalid form data', () => {
      cy.get('input#title').type('This is a very long title that exceeds the maximum allowed characters')
      cy.get('input#category').type('This category name is too long')

      cy.get('button').contains('Buat').click()

      cy.on('window:alert', (str) => {
        expect(str).to.equal('Gagal membuat diskusi! judul maksimal 64 karakter')
      })
    })

    it('should successfully submit the form with valid data', () => {
      const title = 'Test Discussion Title'
      const category = 'Technology'
      const body = 'This is the description of the test discussion.'

      cy.get('input#title').type(title)
      cy.get('input#category').type(category)
      cy.get('textarea#desc').type(body)

      cy.get('button').contains('Buat').click()

      cy.visit('http://localhost:5173/')
    })
  })
