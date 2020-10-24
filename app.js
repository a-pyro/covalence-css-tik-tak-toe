const cells = document.querySelectorAll('.cell');
cells.forEach((element) => element.addEventListener('click', fireOnCells));

function fireOnCells(event) {
  console.log(event.target);
  event.target.textContent = 'x';
}
