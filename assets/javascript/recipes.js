const buttons = document.querySelectorAll('.recipe-button');
const fabada = document.getElementById('fabada');
const frixuelos = document.getElementById('frixuelos');
const hake = document.getElementById('hake');
const buttonsClose = document.querySelectorAll('.btn-close');


console.log(buttons)
for(let button of buttons){
  button.addEventListener('click', () =>{
      if(button.value=='fabada'){
        fabada.classList.remove('hide');
        fabada.classList.add('recipe-steps');
        frixuelos.classList.add('hide');
        hake.classList.add('hide');
      }else if(button.value=='frixuelos'){
        fabada.classList.add('hide');
        frixuelos .classList.remove('hide');
        frixuelos.classList.add('recipe-steps');
        hake.classList.add('hide');
      }else if(button.value=='hake'){
        fabada.classList.add('hide');
        frixuelos.classList.add('hide');
        hake.classList.remove('hide');
        hake.classList.add('recipe-steps');
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

