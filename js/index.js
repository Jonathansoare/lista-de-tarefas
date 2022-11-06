const inputTarefa = document.querySelector('.input-tarefa')
const btnAdd = document.querySelector('.btn-add-tarefa')
const tarefas = document.querySelector('.tarefas')

function criarLi(){
  const li = document.createElement('li')
  return li
}

inputTarefa.addEventListener('keypress', function(e){
  if(e.keyCode === 13){
    criarTarefa(inputTarefa.value)
  }
})

function limparInput(){
  inputTarefa.value = '';
  inputTarefa.focus();
}

function criarTarefa(tarefa){
  const li = criarLi()
  li.innerHTML = tarefa
  tarefas.appendChild(li)
  limparInput()
  criaButtonApagar(li )
  salvaTarefas(tarefas)
}

function criabtn(){
  const btn = document.createElement('button')
  return btn
}

function criaButtonApagar(li){
  li.innerText += ' '
   const btnApagar = document.createElement('button')
   btnApagar.innerText = 'Apagar'
   btnApagar.setAttribute('class','apagar')
   li.appendChild(btnApagar)
}

function apagar(el){
  el.parentElement.remove();
}

btnAdd.addEventListener("click",(e) => {
  const tarefa = inputTarefa.value
  if(!tarefa) return;
  criarTarefa(tarefa)

})
document.addEventListener("click", (e) =>{
  const el = e.target;

  if(el.classList.contains("apagar")){
    apagar(el)
    salvaTarefas(tarefas)
  }
})

function salvaTarefas(tarefa){
  const liTarefa = tarefa.querySelectorAll('li');
  const listaDeTarefas = [];

  for(let tarefa of liTarefa){
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar' , '').trim()
    listaDeTarefas.push(tarefaTexto)
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas)
  localStorage.setItem('tarefas', tarefasJSON)
}


function adicionaTarefasSalvas(){
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas)

  for(let tarefa of listaDeTarefas ){
    criarTarefa(tarefa)
  }
}

adicionaTarefasSalvas()