import firestore from "./Firestore.js"
import Login, { PREVIOUS_LOCATION } from "../containers/Login.js"
import Bills  from "../containers/Bills.js"
import NewBill from "../containers/NewBill.js"
import Dashboard from "../containers/Dashboard.js"

import BillsUI from "../views/BillsUI.js"
import DashboardUI from "../views/DashboardUI.js"

import { ROUTES, ROUTES_PATH } from "../constants/routes.js"

export default () => {
  const rootDiv = document.getElementById('root') // point d'entrée html
  rootDiv.innerHTML = ROUTES({ pathname: window.location.pathname }) // génére la page en fonction de l'url et l'injecte dans l'url

  //crée une méthode onNavigate avec comme paramètre le pathname
  window.onNavigate = (pathname) => {
    // ajoute à l'historique du navigateur 
    window.history.pushState(
      {},
      pathname,
      window.location.origin + pathname
      )
      //si le pathname est '/' envoi au login
      if (pathname === ROUTES_PATH['Login']) { 
      rootDiv.innerHTML = ROUTES({ pathname })
      document.body.style.backgroundColor="#0E5AE5"
      new Login({ document, localStorage, onNavigate, PREVIOUS_LOCATION, firestore })
    } 
    //sinon envoie à la page correspondante
    else if (pathname === ROUTES_PATH['Bills']) {
      rootDiv.innerHTML = ROUTES({ pathname, loading: true })
      const divIcon1 = document.getElementById('layout-icon1')
      const divIcon2 = document.getElementById('layout-icon2')
      divIcon1.classList.add('active-icon')
      divIcon2.classList.remove('active-icon')
      const bills = new Bills({ document, onNavigate, firestore, localStorage  })
      bills.getBills().then(data => {
        rootDiv.innerHTML = BillsUI({ data })
        const divIcon1 = document.getElementById('layout-icon1')
        const divIcon2 = document.getElementById('layout-icon2')
        divIcon1.classList.add('active-icon')
        divIcon2.classList.remove('active-icon')
        new Bills({ document, onNavigate, firestore, localStorage })
      }).catch(error => {
        rootDiv.innerHTML = ROUTES({ pathname, error })
      })
    } 
    
    else if (pathname === ROUTES_PATH['NewBill']) {
      rootDiv.innerHTML = ROUTES({ pathname, loading: true })
      new NewBill({ document, onNavigate, firestore, localStorage })
      const divIcon1 = document.getElementById('layout-icon1')
      const divIcon2 = document.getElementById('layout-icon2')
      divIcon1.classList.remove('active-icon')
      divIcon2.classList.add('active-icon')
    } 
    
    else if (pathname === ROUTES_PATH['Dashboard']) {
      rootDiv.innerHTML = ROUTES({ pathname, loading: true })
      const bills = new Dashboard({ document, onNavigate, firestore, bills: [], localStorage })
      bills.getBillsAllUsers().then(bills => {
        rootDiv.innerHTML = DashboardUI({ data: { bills } })
        new Dashboard({ document, onNavigate, firestore, bills, localStorage })
      }).catch(error => {
        rootDiv.innerHTML = ROUTES({ pathname, error })
      })
    }
  }
  //déclenché au click sur le bouton retour de la souris
  window.onpopstate = (e) => {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log( user);
    if (window.location.pathname === "/" && !user) {
      document.body.style.backgroundColor="#0E5AE5"
      rootDiv.innerHTML = ROUTES({ pathname: window.location.pathname })
    }
    else if (user) {
      onNavigate(PREVIOUS_LOCATION)
    }
  }
  // quand on a cliqué sur le bouton retour de la souris vérifie l'url 
  //si pas de hash renvoi au login
  if (window.location.pathname === "/" && window.location.hash === "") {
    new Login({ document, localStorage, onNavigate, PREVIOUS_LOCATION, firestore })
    document.body.style.backgroundColor="#0E5AE5"
  }
  // sinon renvoi à la page correspondante
  else if (window.location.hash !== "") {
    if (window.location.hash === ROUTES_PATH['Bills']) {
      rootDiv.innerHTML = ROUTES({ pathname: window.location.hash, loading: true })
      const divIcon1 = document.getElementById('layout-icon1')
      const divIcon2 = document.getElementById('layout-icon2')
      divIcon1.classList.add('active-icon')
      divIcon2.classList.remove('active-icon')
      const bills = new Bills({ document, onNavigate, firestore, localStorage  })
      bills.getBills().then(data => {
        rootDiv.innerHTML = BillsUI({ data })
        const divIcon1 = document.getElementById('layout-icon1')
        const divIcon2 = document.getElementById('layout-icon2')
        divIcon1.classList.add('active-icon')
        divIcon2.classList.remove('active-icon')
        new Bills({ document, onNavigate, firestore, localStorage })
      }).catch(error => {
        rootDiv.innerHTML = ROUTES({ pathname: window.location.hash, error })
      })


    } else if (window.location.hash === ROUTES_PATH['NewBill']) {
      rootDiv.innerHTML = ROUTES({ pathname: window.location.hash, loading: true })
      new NewBill({ document, onNavigate, firestore, localStorage })
      const divIcon1 = document.getElementById('layout-icon1')
      const divIcon2 = document.getElementById('layout-icon2')
      divIcon1.classList.remove('active-icon')
      divIcon2.classList.add('active-icon')
    } 
    
    else if (window.location.hash === ROUTES_PATH['Dashboard']) {
      rootDiv.innerHTML = ROUTES({ pathname: window.location.hash, loading: true })
      const bills = new Dashboard({ document, onNavigate, firestore, bills: [], localStorage })
      bills.getBillsAllUsers().then(bills => {
        rootDiv.innerHTML = DashboardUI({ data: { bills } })
        new Dashboard({ document, onNavigate, firestore, bills, localStorage })
      }).catch(error => {
        rootDiv.innerHTML = ROUTES({ pathname: window.location.hash, error })
      })
    }
  }

  // return null
}
 
