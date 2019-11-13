/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const listItem = document.querySelectorAll('.student-item');
const numberPerPage = 10;


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

function showPage(list, page) {
   const startIndex = (page * numberPerPage) - numberPerPage;
   const endIndex = page * numberPerPage;

   for (let i = 0; i < list.length; i += 1 ) {
      student = list[i]
      if (i >= startIndex && i < endIndex) {
         student.style.display = "block";
      } else {
         student.style.display = "none";
         // console.log(student + "don't display")
      }
   }
}

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const div = document.createElement('div');

function appendPageLink(list) {
   // const div = document.createElement('div');
   div.className = "pagination";
   const ul = document.createElement('ul');
   const page = document.querySelector('.page');
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

  const activeLi = document.querySelector('.pagination li');
  activeLi.className = 'active';
  console.log(div);
}

const pageList = document.querySelectorAll('.pagination li');
div.addEventListener('click', (event) => {
   let clickedButton = event.target.textContent;
   console.log(typeof(clickedButton));
   
   for (let i = 0; i < pageList.length; i += 1) {
      if (clickedButton === pageList[i].textContent) {
         pageList[i].className = "active";
      } else {
         pageList[i].className = " ";
      }

  }
  
  showPage(listItem, clickedButton);

  })

showPage(listItem, 1);
appendPageLink(listItem);


// Remember to delete the comments that came with this file, and replace them with your own code comments.