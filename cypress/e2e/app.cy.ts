describe('Pilar Challenge Web', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('loads homepage successfully', () => {
    cy.get('header').should('be.visible')
    cy.contains('Movie Now').should('be.visible')
    cy.get('#movie-slider').should('be.visible')
    cy.get('.movie-carousel').should('have.length.at.least', 1)
  })

  it('interacts with movie carousel and selects a card', () => {
    // Wait for content to load
    cy.get('#movie-slider').should('be.visible')

    // Scroll down to first carousel
    cy.get('#carousel-nowPlaying').first().scrollIntoView()

    // Click next button twice
    cy.get('#carousel-nowPlaying')
      .first()
      .within(() => {
        cy.get('button').last().click()
        cy.get('button').last().click()
      })

    // Click prev button once
    cy.get('#carousel-nowPlaying')
      .first()
      .within(() => {
        cy.get('button').first().click()
      })

    // Select a movie card
    cy.get('#carousel-nowPlaying')
      .first()
      .within(() => {
        cy.get('.movie-card').first().click()
      })

    // Verify navigation to movie details
    cy.url().should('include', '/movie/')
  })

  it('navigates through main menu', () => {
    cy.contains('Filmes').click()
    cy.url().should('include', '/list/movies')

    cy.contains('Séries').click()
    cy.url().should('include', '/list/series')

    cy.contains('Home').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('performs search functionality', () => {
    cy.get('input[placeholder="Buscar por filme ou série"]').type('Avatar{enter}')
    cy.url().should('include', '/search')
    cy.url().should('include', 'q=Avatar')
    cy.get('.movie-card').should('exist')
  })

  it('filters content in movie list', () => {
    cy.visit('/list/movies')
    cy.get('select').first().select('vote_average.desc')
    cy.get('select').last().select('28') // Action genre
    cy.get('.movie-card').should('exist')
  })

  it('navigates through pagination', () => {
    cy.visit('/list/movies')
    cy.contains('->').click()
    cy.url().should('include', 'page=2')
    cy.contains('<-').click()
    cy.url().should('include', 'page=1')
  })

  it('displays movie details', () => {
    cy.visit('/list/movies')
    cy.get('.movie-card').first().click()
    cy.get('h1').should('be.visible')
    cy.contains('Sinopse').should('be.visible')
    cy.contains('Elenco').should('be.visible')
  })

  it('handles movie carousel navigation', () => {
    cy.get('.movie-carousel')
      .first()
      .within(() => {
        cy.get('button').last().click()
        cy.get('.movie-card').should('have.length.at.least', 1)
      })
  })
})
