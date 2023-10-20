const buttons = document.querySelectorAll('.recipe-button');
const fabada = document.getElementById('fabada');
const frixuelos = document.getElementById('frixuelos');
const hake = document.getElementById('hake');
const buttonsClose = document.querySelectorAll('.btn-close');
const downArrowF = document.getElementById('down-arrow-f');
const upArrowF = document.getElementById('up-arrow-f');
const downArrowH = document.getElementById('down-arrow-h');
const upArrowH = document.getElementById('up-arrow-h');
const downArrowFr = document.getElementById('down-arrow-fr');
const upArrowFr = document.getElementById('up-arrow-fr');

/**
 * Display element1 and element3 while hiding element2.
 *
 * @param {HTMLElement} element1 - The first element to display.
 * @param {HTMLElement} element2 - The element to hide.
 * @param {HTMLElement} element3 - The third element to display.
 */
const unhide = (element1, element2, element3) => {
  element1.classList.remove('hide');
  element1.classList.add('recipe-steps');
  element2.classList.add('hide');
  element3.classList.remove('hide')
  element3.classList.add('inline-block')
} 

/**
 * Hide element1 and element3 while displaying element2.
 *
 * @param {HTMLElement} element1 - The first element to hide.
 * @param {HTMLElement} element2 - The element to display.
 * @param {HTMLElement} element3 - The third element to hide.
 */
const hide = (element1, element2, element3) => {
  element1.classList.remove('recipe-steps');
  element1.classList.add('hide');
  element2.classList.remove('hide');
  element3.classList.remove('inline-block');
  element3.classList.add('hide');
}

/**
 * Hide two elements.
 *
 * @param {HTMLElement} element1 - The first element to hide.
 * @param {HTMLElement} element2 - The second element to hide.
 */
const hideOthers = (element1, element2) => {
  element1.classList.add('hide');
  element2.classList.add('hide');
}

console.log(buttons)
for(let button of buttons){
  button.addEventListener('click', () =>{
      if(button.value=='fabada'){
        if (fabada.className == 'hide'){
          // show container with recipe and change to arrow up the button
          unhide(fabada, downArrowF, upArrowF);
        } else if (fabada.className == 'recipe-steps'){
          // hide container with recipe and change to arrow down the button
          hide(fabada, downArrowF, upArrowF)
        }
        hideOthers(frixuelos, hake);
      }else if(button.value=='frixuelos'){
        if (frixuelos.className == 'hide'){
          // show container with recipe and change to arrow up the button
          unhide(frixuelos, downArrowFr, upArrowFr);
        } else if (frixuelos.className == 'recipe-steps'){
          // hide container with recipe and change to arrow down the button
          hide(frixuelos, downArrowFr, upArrowFr);
        }
        hideOthers(fabada, hake)
      }else if(button.value=='hake'){
        if (hake.className == 'hide'){
          // show container with recipe and change to arrow up the button
          unhide(hake, downArrowH, upArrowH);
        } else if (hake.className == 'recipe-steps'){
          // hide container with recipe and change to arrow down the button
          hide(hake, downArrowH, upArrowH);
        }
        hideOthers(fabada, frixuelos)
      }
    })
}

for(let button of buttonsClose){
    button.addEventListener('click', () =>{
        if(button.value=='fabada'){
            fabada.classList.add('hide');
            fabada.classList.remove('recipe-steps');
          }else if(button.value=='frixuelos'){
            frixuelos .classList.add('hide');
            frixuelos.classList.remove('recipe-steps');
          }else if(button.value=='hake'){
            hake.classList.add('hide');
            hake.classList.remove('recipe-steps');
          }
      })
  }

