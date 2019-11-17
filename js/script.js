/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const listItem = document.querySelectorAll('.student-item');
const numberPerPage = 10;
const searchDiv = document.createElement('div');
let searchInput = document.createElement('input');
let searchButton = document.createElement('button');

// takes a list and the page number you want to display
// then hides all records that are not on the selected page
function showPage(list, page) {
   const startIndex = (page * numberPerPage) - numberPerPage;
   const endIndex = page * numberPerPage;
   for (let i = 0; i < list.length; i += 1 ) {
      student = list[i]
      if (i >= startIndex && i < endIndex) {
         student.style.display = "block";
      } else {
         student.style.display = "none";
      }
   }
}

const page = document.querySelector('.page');
// creates the pagination links
function appendPageLink(list) {
   // const page = document.querySelector('.page');
   const pagesRequired = list.length / numberPerPage;
   const div = document.createElement('div');
   const ul = document.createElement('ul');
   // checks if pagination links already exist and if they do, it removes them
   //  This is so that new links are generated when searching.
   if (document.querySelector('.pagination')) { 
      const parent = document.querySelector('.pagination');
      page.removeChild(parent);
      showPage(list, 1);
   }
   div.className = "pagination";
   //creates a li with an anchor tag for each page required. Sets text content to index + 1 (so that 0 is 1 etc.)  
   for (let i = 0; i < pagesRequired; i += 1) {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.href = "#";
      a.textContent = i + 1;
      li.appendChild(a);
      ul.appendChild(li);
   }
   // appends the ul (now should hold the li for each page) to the div then the div to the page
  div.appendChild(ul);
  page.appendChild(div);
  // sets the first page to the active page active   
  let activeLi = document.querySelector('.pagination li a');
  activeLi.className = 'active';
  //adds an event listener to each anchor tag   
  let a = document.querySelectorAll('a');
  for (i = 0; i < a.length; i += 1){
   a[i].addEventListener('click', (event) => {
      let clickedButton = event.target.textContent; //will be the page # 1, 2 etc..
      let pageList = document.querySelectorAll('.pagination li a'); //selects all a tags
      // sets the class name of the page button that was clicked to active and removed the active class from any other a tags
      for (let j = 0; j < pageList.length; j += 1) {
         if (clickedButton === pageList[j].textContent) {
            pageList[j].className = "active";
         } else {
            pageList[j].className = " ";
         }
     }
   //   calls the showpage function to display to new page.
     showPage(list, clickedButton);
     })
  }
}

// creates the search bar
function searchBar() {
   searchDiv.className = "student-search";
   searchInput.placeholder = "Search for students...";
   searchButton.textContent = "Search";
   searchDiv.appendChild(searchInput);
   searchDiv.appendChild(searchButton);
   let ulParent = document.querySelector('.page-header');
   ulParent.appendChild(searchDiv);
}

// takes the value in the input field and sets it as the search criteria
// loops through all the students and if they match the criteria, pushes them to a new list
// returns a new list of only the students matching the search criteria
function search(searchCriteria) {
   let studentDetails = document.querySelectorAll('.student-item .student-details h3');
   let returnedResults = [];
   for (let i = 0; i < studentDetails.length; i += 1 ) {
      let studentName = studentDetails[i].innerText.toLowerCase();
      let studentLI = studentDetails[i].parentNode.parentNode;
      if (studentName.includes(searchCriteria)) {
         studentLI.style.display = "none";
         returnedResults.push(studentLI);
      } else {
         studentLI.style.display = "none";
      }
   }
   return returnedResults;
}

// listens for a click on the search button.
// when the button is clicked it passes the input value to the search function
// then it calls the appendPageLink function, passing in the new list, to display the results and create new pagination links
searchButton.addEventListener('click', () => {
   let searchCriteria = searchInput.value.toLowerCase();
   // checks if search criteria is empty
   // if it is empty - delete any previous errors logged and display the orginal list, page 1.
   // otherwise check if the criteria search returns any results
   // if no results are found creates an error div and append to the page to display No Results Found
   if (searchCriteria == "") {
      if (document.querySelector('.error')) { 
         const parent = document.querySelector('.error');
         page.removeChild(parent);}
      showPage(listItem, 1);
      appendPageLink(listItem);
   } else {
      let returnedResults = search(searchCriteria);

      // if no results are found, delete the pagination links and display "No Results Found"
      if (returnedResults.length === 0) {
         if (document.querySelector('.pagination')) { 
            const parent = document.querySelector('.pagination');
            page.removeChild(parent);}
            let response = "No Results Found!"
            let div = document.createElement('div');
            let p = document.createElement('p');
            p.textContent = response;
            div.appendChild(p);
            div.className = "error";
            page.appendChild(div);
        
      } else {
         appendPageLink(returnedResults);
      }
   }
})

showPage(listItem, 1)
appendPageLink(listItem);
searchBar();


// Remember to delete the comments that came with this file, and replace them with your own code comments.