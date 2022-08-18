import { Todo } from './todo.class';

export class TodoList {

    constructor() {

        this.cargarLocalStorage();
    }
    nuevoTarea(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();

    }
    eliminarTarea(id) {
        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarLocalStorage();
    }
    toggleTarea(id) {
        for (const todo of this.todos) {
            // const id = Number(this.id)
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }
    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();
    }
    guardarLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }
    cargarLocalStorage() {
        /* Checking if there is a todo in local storage. If there is, it will parse it and assign it to
        the todos array. If there is not, it will assign an empty array to the todos array. */
        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];

        /* Mapping the todos array to the fromJson method of the Todo class. */
        this.todos = this.todos.map(obj => Todo.fromJson(obj));
    }
}









