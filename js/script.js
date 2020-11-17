/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
let showNumberOnPage = 9; 
let dataFiltered; 

//console.log(dataFiltered)
function showPage(list, page) {
   // create two variables which will represent the index for the first and last student on the page
   let firstStudentOnPage = (page*showNumberOnPage) - showNumberOnPage;
   let lastStudentOnPage = page*showNumberOnPage;

   // select the element with a class of `student-list` and assign it to a variable
   let elem = document.querySelector('.student-list');

   // set the innerHTML property of the variable you just created to an empty string
   elem.innerHTML = '';
   // loop over the length of the `list` parameter
   
   if(dataFiltered !== ''){
      for(let i = firstStudentOnPage; i < lastStudentOnPage; i++){
         // inside the loop create a conditional to display the proper students
         elem.innerHTML += `
         
             <li class="student-item cf">
                <div class="student-details">
                   <img class="avatar" src="${data[i]['picture']['large']}" alt="Profile Picture">
                   <h3>${data[i]['name'].title} ${data[i]['name'].first} ${data[i]['name'].last}</h3>
                   <span class="email">${data[i]['email']}</span>
                </div>
                <div class="joined-details">
                   <span class="date">Joined 12-15-2005</span>
                </div>
             </li>
         `;
       }
   } else {
      for(let i = firstStudentOnPage; i < lastStudentOnPage; i++){
         // inside the loop create a conditional to display the proper students
         elem.innerHTML += `
         
             <li class="student-item cf">
                <div class="student-details">
                   <img class="avatar" src="${dataFiltered[i]['picture']['large']}" alt="Profile Picture">
                   <h3>${dataFiltered[i]['name'].title} ${dataFiltered[i]['name'].first} ${dataFiltered[i]['name'].last}</h3>
                   <span class="email">${dataFiltered[i]['email']}</span>
                </div>
                <div class="joined-details">
                   <span class="date">Joined 12-15-2005</span>
                </div>
             </li>
         `;
       }
   }
 }

showPage(showNumberOnPage, 1);

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination() {
   // create a variable to calculate the number of pages needed
   numberOfPages = Math.ceil(data.length/showNumberOnPage);
 
   // select the element with a class of `link-list` and assign it to a variable
   let linkList = document.querySelector('.link-list')
   // set the innerHTML property of the variable you just created to an empty string
   linkList.innerHTML = '';
 
   // loop over the number of pages needed
   for(let i = 1; i <= numberOfPages; i++){

      // create the elements needed to display the pagination button

      linkList.innerHTML += 
         `
            <li>
               <button type="button" class="">${i}</button>
            </li>
         `;
      
      // insert the above elements
      
   }

   // give the first pagination button a class of "active"
   let active = document.getElementsByTagName('button')[1];
   active.className = 'active';

 
   // create an event listener on the `link-list` element
   document.querySelector(".link-list").addEventListener("click", function (e){
      //Remove alle active classes
      let buttons = document.getElementsByTagName('button');
      for(let i = 0; i < buttons.length; i++){
         buttons[i].className = '';
      }
      //Find button
      let but = e.path[1].getElementsByTagName('button');
      let pageNumber = but[0].textContent;
      but[0].className = 'active'; 
      showPage(showNumberOnPage, pageNumber);

   });

     // if the click target is a button:
       // remove the "active" class from the previous button
       // add the active class to the clicked button
       // call the showPage function passing the `list` parameter and page to display as arguments
 }
 addPagination();



// Call functions

const searchBar = document.getElementById('search');

searchBar.addEventListener('keyup', (e) => {
   const searchString = e.target.value;
   const dataf = data.filter(card => {
      return card.email.includes(searchString || card.name.first.includes(searchString) || card.name.last.includes(searchString));
      
   }); 
   list = dataf;
   addPagination();
   showPage(showNumberOnPage, 1);
   //console.log(dataFiltered)
   
});


