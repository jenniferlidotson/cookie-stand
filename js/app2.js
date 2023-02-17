'use strict';

// *** Global Variables *** //

const hoursArray = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

const restTableElem = document.getElementById('restaurantProfiles');

const formElem = document.getElementById('addRestForm');

//*** Constructor Functions *** //

function Restaurants(location, minHourlyCust, maxHourlyCust, avgCookiePerCust){
  this.location = location;
  this.minHourlyCust = minHourlyCust;
  this.maxHourlyCust = maxHourlyCust;
  this.avgCookiePerCust = avgCookiePerCust;
  this.salesPerHour = [];
  Restaurants.allRestaurants.push(this);
}

Restaurants.allRestaurants = [];

Restaurants.prototype.genRandomCust = function(){
  return Math.floor(Math.random() * (this.maxHourlyCust - this.minHourlyCust + 1) + this.minHourlyCust);
};

Restaurants.prototype.calcSalesPerHour = function(){
  this.salesPerHour = [];
  for (let i=0; i<hoursArray.length; i++){
    const thisHoursSale = Math.ceil(this.genRandomCust() * this.avgCookiePerCust);
    this.salesPerHour.push(thisHoursSale);
  }
};

// *** prototype *** //

Restaurants.prototype.renderRestaurant = function(tbodyElem){
  let dailyTotal = 0;
  const rowElem = makeElement('tr', tbodyElem, null);
  makeElement('th', rowElem, this.location);
  for (let i=0; i< this.salesPerHour.length; i++){
    const hourlyTotal = this.salesPerHour[i];
    const tdElem = document.createElement('td');
    tdElem.textContent = hourlyTotal;
    dailyTotal += hourlyTotal;
    rowElem.appendChild(tdElem);

  }
  makeElement('td', rowElem, dailyTotal);
};

// ***Global Functions *** //

function makeElement(tagName, parent, textContent){
  let element = document.createElement(tagName);
  if (textContent) {
    element.textContent = textContent;
  }
  parent.appendChild(element);
  return element;
}

// *** header of table *** //

function renderHeader(){
  const headerElem = makeElement('thead', restTableElem, null);
  const rowElem = makeElement('tr', headerElem, null);
  makeElement('td', rowElem, null);
  for (let i=0; i<hoursArray.length; i++){
    makeElement('th', rowElem, hoursArray[i]);
  }
  makeElement('th', rowElem, 'Daily Total');
}

// *** body of table *** //
function renderAllRest(){
  const bodyElem = makeElement('tbody', restTableElem, null)
  for (let i=0; i <Restaurants.allRestaurants.length; i++){
    let currentRest = Restaurants.allRestaurants[i];
    currentRest.calcSalesPerHour();
    currentRest.renderRestaurant(bodyElem);
  }
}

// *** footer of table *** //
function renderFooter(){
  const tfootElem = makeElement('tfoot', restTableElem, null);
  const tfRowElem = makeElement('tr', tfootElem, null);
  makeElement('th', tfRowElem, 'Hourly Total');
  let grandTotal = 0;
  for(let i=0; i <hoursArray.length; i++){
    let hourlyTotal = 0;
    for(let index=0; index<Restaurants.allRestaurants.length; index++){
      hourlyTotal += Restaurants.allRestaurants[index].salesPerHour[i];
    }
    makeElement('th', tfRowElem, hourlyTotal);
    grandTotal += hourlyTotal;
  }
  makeElement('th', tfRowElem , grandTotal);
}

// *** create new Restaurant *** //
function handleSubmit (e){
  e.preventDefault();
  console.log(e);
  let location = e.target.city.value;
  let minHourlyCust = e.target.minCust.value;
  parseInt(minHourlyCust);
  let maxHourlyCust = e.target.maxCust.value;
  parseInt(maxHourlyCust);
  let avgCookiePerCust = e.target.aveCookie.value;
  parseInt(avgCookiePerCust);

  let newRest = new Restaurants(location, minHourlyCust, maxHourlyCust, avgCookiePerCust);
  newRest.genRandomCust();
  newRest.calcSalesPerHour();

  restTableElem.innerHTML = '';

  renderHeader();
  renderAllRest();
  renderFooter();

  e.target.reset();
}

// *** Event Listeners *** //

formElem.addEventListener('submit', handleSubmit);

// *** Call Functions *** //

const Seattle = new Restaurants('Seattle', 23, 65, 6.3);
const Tokyo = new Restaurants('Tokyo', 3, 24, 1.2);
const Dubai = new Restaurants('Dubai', 11, 38, 3.7);
const Paris = new Restaurants('Paris', 20, 38, 2.3);
const Lima = new Restaurants('Lima', 2, 16, 4.6);

renderHeader();
renderAllRest();
renderFooter();

// 'use strict';

// // ********** GLOBALS **********

// let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

// let saleTable = document.getElementById('sale-table');

// let storeObjects = [];

// // ********** CONSTRUCTOR FUNCTION **********

// function Store(name, minCust, maxCust, avgCookiesBought) {
//   this.name = name;
//   this.minCust = minCust;
//   this.maxCust = maxCust;
//   this.avgCookiesBought = avgCookiesBought;
//   this.cookiesBought = [];
//   this.randomCustomer = [];
//   this.dailyTotal = 0;
// }

// // ********** PROTOTYPE METHODS **********

// Store.prototype.getCookies = function () {
//   for (let i = 0; i < hours.length; i++) {
//     let customer = Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
//     this.randomCustomer.push(customer);
//     console.log('customers per hour ' + customer);
//   }
// };

// Store.prototype.calcTotalCookiePerHour = function () {
//   this.getCookies(this.minCust, this.maxCust);

//   // Create a variable to store daily total

//   for (let i = 0; i < hours.length; i++) {
//     let totalCookie = Math.round(this.randomCustomer[i] * this.avgCookiesBought);
//     console.log(typeof (this.randomCustomer[i]));
//     console.log(typeof (this.avgCookieBought));
//     this.cookiesBought.push(totalCookie);
//     console.log('cookies bought per hour ' + this.cookiesBought);
//     this.dailyTotal += totalCookie;
//   }
// };

// Store.prototype.render = function () {

//   this.calcTotalCookiePerHour();

//   // header row

//   let headerRow = document.createElement('tr');
//   saleTable.appendChild(headerRow);

//   //header cell

//   let headerCell = document.createElement('th');
//   headerCell.textContent = this.name;
//   headerRow.appendChild(headerCell);

//   // filling in table with data

//   for (let i = 0; i < hours.length; i++) {
//     let cookieData = document.createElement('td');
//     cookieData.textContent = this.cookiesBought[i];
//     headerRow.appendChild(cookieData);

//   }
//   let dailyTotal = document.createElement('td');
//   dailyTotal.textContent = this.dailyTotal;
//   headerRow.appendChild(dailyTotal);

// };

// function header() {
//   let headerRow = document.createElement('tr');
//   headerRow.textContent = 'Locations';
//   saleTable.appendChild(headerRow);
//   for (let i = 0; i < hours.length; i++) {
//     let headerTime = document.createElement('th');
//     headerTime.textContent = hours[i];
//     headerRow.appendChild(headerTime);

//   }

//   let headerDailyTotal = document.createElement('th');
//   headerDailyTotal.textContent = 'Daily Total';
//   headerRow.appendChild(headerDailyTotal);

// }

// function footer() {
//   let footer = document.createElement('th');
//   footer.textContent = 'Totals';
//   saleTable.appendChild(footer);

//   let grandTotal = 0;

//   for (let i = 0; i < hours.length; i++) {
//     let totals = 0;
//     for (let j = 0; j < storeObjects.length; j++) {
//       totals += storeObjects[j].cookiesBought[i];
//       console.log(storeObjects);

//     }
//     let hourlyTotals = document.createElement('td');
//     hourlyTotals.textContent = totals;
//     saleTable.appendChild(hourlyTotals);
//     grandTotal += totals;

//   }

//   let dailyTotals = document.createElement('td');
//   dailyTotals.textContent = grandTotal;
//   saleTable.appendChild(dailyTotals);

// }

// // ********** EXECUTABLE CODE **********

// let seattle = new Store('Seattle', '23', '65', '6.3');
// let tokyo = new Store('Tokyo', '3', '24', '1.2');
// let dubai = new Store('Dubai', '11', '28', '3.7');
// let paris = new Store('Paris', '20', '38', '2.3');
// let lima = new Store('Lima', '2', '16', '4.6');

// storeObjects.push(seattle, tokyo, dubai, paris, lima);
// console.log(storeObjects);

// header();

// function renderAll() {
//   for (let i = 0; i < storeObjects.length; i++) {
//     storeObjects[i].getCookies();
//     storeObjects[i].render();
//     console.log('End');
//   }
// }

// renderAll();
// footer();