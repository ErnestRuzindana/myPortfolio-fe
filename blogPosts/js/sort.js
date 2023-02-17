const sortButton = document.getElementById('dropdownBtnSort');
const dropdownSortOptions = document.getElementById('dropdownSortOptions');
const sortOptions = document.querySelectorAll('.sortOption');

dropdownSortOptions.style.display = "none";

let sortType = '';


sortButton.addEventListener('click', () => {
  if(dropdownSortOptions.style.display === 'none'){
    sortButton.style.borderBottom = 'none';
    sortButton.style.borderRadius = '0px 10px 0px 10px';
    dropdownSortOptions.style.display = 'flex';
    sortButton.childNodes[1].style.transform = 'rotate(180deg)'; 
    sortButton.childNodes[1].style.marginTop = '0px'; 
  } else {
    sortButton.style.borderRadius = '0px 10px 0px 10px';
    dropdownSortOptions.style.display = 'none';
    sortButton.childNodes[1].style.transform = 'rotate(0deg)';
    sortButton.childNodes[1].style.marginTop = '7px';
  }
})

sortOptions.forEach((curEl) => {
  curEl.addEventListener('click', () => {
    sortButton.style.setProperty('--active-sort-col', '#F5B32F');
    sortOptions.forEach((el) => el.classList.remove('selected'))
    curEl.classList.add('selected');
    sortType = curEl.textContent;
    sortArr()
  })
})