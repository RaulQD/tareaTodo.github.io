import { Todo, TodoList } from "../classes";
import { todoList } from "../index";

//REFERENCIAS EN EL HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrarElement = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = (todo) => {
    const { completado, tarea, id } = todo;
    const htmlTodo = `
    <li class="${(completado) ? 'completed' : ''}" data-id="${id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(completado) ? 'checked' : ''}>
            <label>${tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `
    const div = document.createElement('div')
    div.innerHTML = htmlTodo; //Crear un elemento con todos sus propiedades
    divTodoList.appendChild(div.firstElementChild); // lo añadimos al primer hijo del div

    return div.firstElementChild;
};

//VENTOS
txtInput.addEventListener('keyup', (e) => {

    if (e.keyCode === 13 && txtInput.value.length > 0) {
        // console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);

        todoList.nuevoTarea(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (e) => {
    const nombreElemento = e.target.localName; // INPUT, BUTTON O  LABEL
    const todoElemento = e.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    //VALIDAR SI EL ELEMENTO HIZO CLICK EN EL INPUT  SELECCIONADO, COMPLETADO O  NO 
    if (nombreElemento.includes('input')) {
        todoList.toggleTarea(todoId) // PARA OBTENER EL MARCADO COMPLETADO.
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {//HAY QUE BORRAR EL TODO ELEMENTO
        todoList.eliminarTarea(todoId);
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrarElement.addEventListener('click', () => {
    todoList.eliminarCompletados();
    const completo = document.querySelectorAll('.completed');
    for (let completos of completo) {
        completos.remove();
    }
});
ulFilters.addEventListener('click', (e) => {
    const filtro = e.target.text;
    if (!filtro) { return; }

    anchorFiltros.forEach(el => el.classList.remove('selected'));
    e.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }

});