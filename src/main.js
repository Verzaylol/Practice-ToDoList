import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

const app = createApp(App);

// Create a store for our to do list items. - **Touch on store creation as a highlight point on portfolio** (5/6/2023)

const store = createStore({

    state() {
        return {
            todos: [

                // name String] is the name of our item.
                // completed [Boolean] is set to true when done, false when not.
                // location<['home', 'archive']> is set to home or archive depending on which page we want to show it on.

                { id: 'first-element', name: 'First To Do Item', completed: false, location: 'home'}
            ]
        }

    }, 

    getters: {
        todos (state) {

            // Returns every todo list (state stores out data,
            // so state.todos refers to our entire todo list)

            return state.todos;
        }

    },

    mutations: {

        // Add 'loadstore' function - All this does is open localStorage, retireve data,
        // and set the state of the data store to the value founds.
        loadStore() {
            if(localStorage.getItem('store')) {
                try {
                    this.replaceState(JSON.parse(localStorage.getItem('store')));
                }
                catch(e) {
                    console.log('Could not initalize store', e);
                }
            }
        },

    // Update Function.

        updateTodo (state, todoItem) {

            // the state argument holds all of our data.
            // the todoItem argument holds the data about a particular todo list item.
            // Let's get all the data from the todoItem.

            let id = todoItem.id;
            let completed = todoItem.completed;
            let name = todoItem.name;

            // Let's find the item in our state we are trying to change, by checking for its ID.

            let findEl = state.todos.find((x) => x.id == id);
            if(findEl !== null) {

                // If we find it, then we'll update complete or name if those properties exist.

                if(completed !== undefined) {
                    findEl.completed = completed;
                }
                if(name !== undefined) {
                    findEl.name = name;
                }
            }
            else {

                // Otherwise lets console log that the item can't be found for some reason

                console.log(`To Do List Item ${id} couldn't be found`);
            }
        },

    // Add Activity Function.
        addTodo (state, todoItem) {

            // Checking to see if we have all the right properties to create an element.

            if(todoItem.id !== undefined && typeof todoItem.name == 'string' && typeof todoItem.completed == 'boolean' ) {

                // All is good, store the new element.

                state.todos.push({
                    id: todoItem.id,
                    name: todoItem.name,
                    completed: todoItem.completed,
                    location: 'home'
                })
            }
        },
    
    // Add Delete Function.
        deleteTodo (state, todoItem) {

            // Checking for the id of the element that is being deleted.

            let id = todoItem.id;
            let removedEl = state.todos.findIndex((x) => x.id == id);
            if(removedEl !== null) {

            // Checking for existence of the chosen element, if pass, delete.

                state.todos.splice(removedEl, 1);
            }
        },

    // Add Moving Function
        moveTodoItem (state, todoItem) {

            // Checking for relevant information (id, location)

            let id = todoItem.id;
            let location = todoItem.location;
            let findEl = state.todos.find((x) => x.id == id);

            // Checking for existence of the item, if so update the location.
            
            if(findEl != null) {
                findEl.location = location;
            }
            else {

                // Otherwise clog the error message.

                console.log(`To Do List Item ${id} couldn't be found`);
            }
        },
    }
});

// Saving Vuex Data to Local Storage.

store.subscribe((mutation, state) => {

    // The code inside fires off any time a mutation occurs.
    // When a mutation occurs it'll stringify our entire state object
    // Which contains our todo list, and will be placed in the users
    // localStorage so that their data will persist upon refresh.

    localStorage.setItem('store', JSON.stringify(state));
})

window.store = store;

app.use(router).use(store).mount('#app')
