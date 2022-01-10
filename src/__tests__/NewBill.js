/**
 * @jest-environment jsdom
 */
import { 
  screen,
getByTestId,
getByLabelText
 } from "@testing-library/dom"
import '@testing-library/user-event'
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    it("Then I am on newNillPage ", () => {
      const html = NewBillUI()
      document.body.innerHTML = html      
      expect(getByTestId(document.body,'form-new-bill')).toBeTruthy()
    })   
    it("then i click on type de depense ")
  })
})