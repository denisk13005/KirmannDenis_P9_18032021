/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { screen, fireEvent } from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import Bills from "../containers/Bills.js";
import Router from '../app/Router.js'
import { localStorageMock } from "../__mocks__/localStorage.js";
import { ROUTES, ROUTES_PATH } from "../constants/routes"
import Firestore from "../app/Firestore";
import firebase from "../__mocks__/firebase";

// BillUI tests

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", () => {
      // Firestore.bills = () => ({ bills, get: jest.fn().mockResolvedValue()})
      // Object.defineProperty(window, 'localStorage', { value: localStorageMock })// mock localStorage
      // window.localStorage.setItem('user', JSON.stringify({type: 'Employee'}))// Set user as Employee in localStorage
      // Object.defineProperty(window, "location", { value: { hash: ROUTES_PATH['Bills'] } });// Set location
      // document.body.innerHTML = `<div id="root"></div>`
      // Router();
      // console.log('document.body' , Router);
      // expect(screen.getByTestId('icon-window').classList.contains('active-icon')).toBe(true)
 
    })
    test("Then bills should be ordered from earliest to latest", () => {
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      // console.log('dates' , dates);
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })
  })
})

describe('Given i am on the loading page',()=>{
  it('Should show Loading...',()=>{
    const html = BillsUI({loading : true})
    document.body.innerHTML = html
    expect(screen.getAllByText('Loading...')).toBeTruthy()


  })
})

describe('Given i am on error page', () => {
  it('should show the error message',()=>{
    const html = BillsUI({error : 'error message'})
    document.body.innerHTML = html
    expect(screen.getAllByText('error message')).toBeTruthy()
  })
})

//Bill tests



