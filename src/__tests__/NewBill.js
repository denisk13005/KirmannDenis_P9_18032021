/**
 * @jest-environment jsdom
 */
import { 
  screen,
getByTestId,
getByLabelText,
getAllByText
 } from "@testing-library/dom"
import '@testing-library/user-event'
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import userEvent from "@testing-library/user-event"
beforeEach(()=>{
  const html = NewBillUI()
  document.body.innerHTML = html
})

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    it("Then I am on newBillPage and the form is present", () => {         
      expect(getByTestId(document.body,'form-new-bill')).toBeTruthy()
    })   

    it("Then i amm on newBillPAge the field type de dépense to propose Transport by default ",()=>{
      expect(screen.getAllByText('Transports')).toBeTruthy()
    })

    it('Then i am on newBillPage and i click on select btn type de dépense, several choice are available',()=>{
      userEvent.click(getByTestId(document.body,'expense-type'))
      expect(screen.getAllByText('Transports')).toBeTruthy()
      expect(screen.getAllByText('Restaurants et bars')).toBeTruthy()
      expect(screen.getAllByText('Hôtel et logement')).toBeTruthy()
      expect(screen.getAllByText('Services en ligne')).toBeTruthy()
      expect(screen.getAllByText('IT et électronique')).toBeTruthy()
      expect(screen.getAllByText('Equipement et matériel')).toBeTruthy()
      expect(screen.getAllByText('Fournitures de bureau')).toBeTruthy()
    })

  })
})