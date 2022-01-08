import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then I click on ", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      const formNewBill = 'tests'
      expect(formNewBill).toEqual('tests')
    })
    test("c'est un test", ()=> {
      expect(newBill).toBeDefined()
    })
  })
})