describe("The demo test", () => {
  it("Visits the demo page", () => {
    cy.visit("http://localhost:3000");
    cy.contains(/Laravel Pro/i);
  });
});

describe("The channels test", () => {
  it("Visits the Home page", () => {
    cy.visit("http://localhost:3000");
    cy.contains(/vim/i);
    cy.contains("技术");
  });

  describe("Login in", () => {
    it("non username or password will get error", () => {
      cy.visit("http://localhost:3000/auth/login");
      cy.get("button[type=submit]").click();
      cy.contains("请输入用户名");
    });
    it("a user can login by username and password", () => {
      cy.visit("http://localhost:3000/auth/login");
      cy.get("#loginAs").type("testUser1");
      cy.get("#password").type("password");
      cy.get("button[type=submit]").click();
      cy.get(".navbar").contains("testUser1");
    });
  });
});
