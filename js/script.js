let list = data;
let showNumberOnPage = 9; 
let dataFiltered; 

showPage(list, 1);

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
    

       for(let i = firstStudentOnPage; i < lastStudentOnPage; i++){
          // inside the loop create a conditional to display the proper students
          if(list[i]){
            elem.innerHTML += `
          
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i]['picture']['large']}" alt="Profile Picture">
                  <h3>${list[i]['name'].title} ${list[i]['name'].first} ${list[i]['name'].last}</h3>
                  <span class="email">${list[i]['email']}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined 12-15-2005</span>
               </div>
            </li>
        `;
          }
        }
    
  }


  function addPagination() {
    // create a variable to calculate the number of pages needed
    numberOfPages = Math.ceil(list.length/showNumberOnPage);
  
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
    if(active){
        active.className = 'active';
    }
 
  
    // create an event listener on the `link-list` element
    document.querySelector(".link-list").addEventListener("click", function (e){
       //Remove alle active classes
       
       let buttons = document.getElementsByTagName('button');
       if(e.target.value !== undefined){
         for(let i = 0; i < buttons.length; i++){
            buttons[i].className = '';
            //Find button
           let but = e.path[1].getElementsByTagName('button');
           let pageNumber = but[0].textContent;
           but[0].className = 'active'; 
           showPage(list, pageNumber);
         }
       }
       
 
    });
 
      // if the click target is a button:
        // remove the "active" class from the previous button
        // add the active class to the clicked button
        // call the showPage function passing the `list` parameter and page to display as arguments
  }
  addPagination();

  const searchBar = document.getElementById('search');


function updateHeaderAmount(list){
   let h2 = document.getElementsByTagName('h2')[0];
   h2.textContent = `Student ${list.length} Amount`;
   if(list.length == 0){
      console.log(document.querySelector('.link-list').innerHTML = 'No results');
      
   }
}

updateHeaderAmount(list);

searchBar.addEventListener('keyup', (e) => {
   const searchString = e.target.value;
   if(searchString != ''){
    const dataf = data.filter(card => {
        return card.email.includes(searchString) || card.name.first.includes(searchString) || card.name.last.includes(searchString);
        
     }); 
     list = dataf;
     
     addPagination();
     showPage(list, 1);
     updateHeaderAmount(dataf);
     
   } else {
      list = data;
      addPagination();
      updateHeaderAmount(list);
      showPage(list, 1);
   }
});
