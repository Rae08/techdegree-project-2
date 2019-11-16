/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
const listItem = document.querySelectorAll('.student-item');
const numberPerPage = 10;
const searchDiv = document.createElement('div');
let searchInput = document.createElement('input');
let searchButton = document.createElement('button');

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
   // appendPageLink(list);
}

function appendPageLink(list) {
   const page = document.querySelector('.page');
   if (document.querySelector('.pagination')) {
      const parent = document.querySelector('.pagination');
      page.removeChild(parent);
      showPage(list, 1);
   }
   const div = document.createElement('div');
   div.className = "pagination";
   const ul = document.createElement('ul');
   const pagesRequired = list.length / numberPerPage;
   for (let i = 0; i < pagesRequired; i += 1) {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.href = "#";
      a.textContent = i + 1;
      li.appendChild(a);
      ul.appendChild(li);
   }
  div.appendChild(ul);
  page.appendChild(div);
  let activeLi = document.querySelector('.pagination li a');
  activeLi.className = 'active';
  let a = document.querySelectorAll('a');
  for (i = 0; i < a.length; i += 1){
   a[i].addEventListener('click', (event) => {
      let clickedButton = event.target.textContent;
      let pageList = document.querySelectorAll('.pagination li a');
      for (let j = 0; j < pageList.length; j += 1) {
         if (clickedButton === pageList[j].textContent) {
            pageList[j].className = "active";
         } else {
            pageList[j].className = " ";
         }
     }
     showPage(list, clickedButton);
     })
  }

 
}

function searchBar() {
   searchDiv.className = "student-search";
   searchInput.placeholder = "Search for students...";
   searchButton.textContent = "Search";
   searchDiv.appendChild(searchInput);
   searchDiv.appendChild(searchButton);
   let ulParent = document.querySelector('.page-header');
   ulParent.appendChild(searchDiv);
}

function search(searchCriteria) {
   let listTwo = document.querySelectorAll('.student-item .student-details h3');
   let returnedResults = [];
   for (let i = 0; i < listTwo.length; i += 1 ) {
      let studentName = listTwo[i].innerText.toLowerCase();
      let studentLI = listTwo[i].parentNode.parentNode;
      if (studentName.includes(searchCriteria)) {
         studentLI.style.display = "none";
         returnedResults.push(studentLI);
      } else {
         studentLI.style.display = "none";
      }
   }
   return returnedResults;
}

searchButton.addEventListener('click', () => {
   let searchCriteria = searchInput.value.toLowerCase();
   let returnedResults = search(searchCriteria);
   // showPage(returnedResults, 1);
   appendPageLink(returnedResults);
})

showPage(listItem, 1)
appendPageLink(listItem);
searchBar();


// Remember to delete the comments that came with this file, and replace them with your own code comments.