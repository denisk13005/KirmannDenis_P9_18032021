/**
 * @jest-environment jsdom
 */
import { 
  screen,
getByTestId,
getByLabelText,
getAllByText,
getAllByPlaceholderText,
getByRole
 } from "@testing-library/dom"
import '@testing-library/user-event'
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import Router from "../app/Router.js"
import Firestore from "../app/Firestore.js"
import {ROUTES,ROUTES_PATH} from '../constants/routes'
import userEvent from "@testing-library/user-event" 
import Bills from "../containers/Bills.js"


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    
    it("Then I am on newBillPage and the form is present", () => {         
      const html = NewBillUI()
      document.body.innerHTML = html
      expect(getByTestId(document.body,'form-new-bill')).toBeTruthy()
    })   

    it("Then i amm on newBillPAge the field type de dépense proposes Transport by default ",()=>{
      const html = NewBillUI()
      document.body.innerHTML = html
      expect(screen.getAllByText('Transports')).toBeTruthy()
    })

    it("Then i am on newBillPage the field type nom de la dépense proposes vol Paris Londres by default",()=>{
      const html = NewBillUI()
      document.body.innerHTML = html
      expect(screen.getByPlaceholderText('Vol Paris Londres')).toBeTruthy()

    })
    
    it('Then i am on newBillPage and i click on select btn type de dépense, several choice are available',()=>{
      const html = NewBillUI()
      document.body.innerHTML = html
      userEvent.click(getByTestId(document.body,'expense-type'))
      expect(screen.getAllByText('Transports')).toBeTruthy()
      expect(screen.getAllByText('Restaurants et bars')).toBeTruthy()
      expect(screen.getAllByText('Hôtel et logement')).toBeTruthy()
      expect(screen.getAllByText('Services en ligne')).toBeTruthy()
      expect(screen.getAllByText('IT et électronique')).toBeTruthy()
      expect(screen.getAllByText('Equipement et matériel')).toBeTruthy()
      expect(screen.getAllByText('Fournitures de bureau')).toBeTruthy()
    })

    it('Then i am on newBillPage and i submit the bill but the datefield is not defined an error is displayed',()=>{
    //  const onNavigate=({pathname}) =>{
    //   document.body.innerHTML = ROUTES({ pathname })
    // }
    // const newBill = new NewBill({document,onNavigate})
    // document.body.innerHTML = newBill

    // userEvent.click(getByRole(document.body,'btn'))

    // expect(newBill).toBe(true)
    

  })
    
  })
})
