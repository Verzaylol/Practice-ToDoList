<template>
    <div id="todo-list">
        <div class="list-item" v-for="n in todos" :key="n.id">
            <div class="list-item-holder" v-if="n.location == location" :data-status="n.completed">
                <div class="checkbox-items" :data-status="n.completed">
                    <input type="checkbox" :data-id="n.id" :id="n.id" @click="updateTodo" :checked="n.completed" /> <label :data-id="n.id" :for="n.id" >{{ n.name }}</label>
                </div>
                <div class="item-options">
                    <div class="delete-item" @click="deleteItem" :data-id="n.id">Delete</div>
                    <div class="archive-item" v-if="n.location !== 'archive'" @click="archiveItem" :data-id="n.id">Archive</div>
                </div>
            </div>
        </div>
        <div id="new-todo-list-item">
            <input type="text" placeholder="Add a new item.." id="new-todo-list-item-input" @keyup="updateItemText" />
            <input type="submit" id="new-todo-list-item-submit" @click="newItem" value="Add To Do List Item" />
        </div>
    </div>
</template>
  

<script>
    import { useStore } from 'vuex'
    import { v4 as uuidv4 } from 'uuid'
    
    export default {
        name: "TodoList",
        data() {
            return {

                // Used for adding new todo list items.

                newTodoItem: ''
            }
        },
        props: {
            location: String
        },
        setup() {

            // Open our Vuex store

            const store = useStore()

            // And use our getter to get the data.
            // When we use return {} here, it will
            // pass our todos list data straight to
            // our data() function above.

            return {
                todos: store.getters.todos
            }
        },

    methods: {
        // As a user types in the input in our template
        // We will update this.newTodoItem. This will then
        // have the full name of the todo item for us to use
        updateItemText: function(e) {
            this.newTodoItem = e.currentTarget.value;
            if(e.keyCode === 13) {
            this.newItem();
            }
            return false;
        
        },
        updateTodo: function(e) {
            // Get the new status of our todo list item
            let newStatus = e.currentTarget.parentElement.getAttribute('data-status') == "true" ? false : true;
            // Send this to our store, and fire the mutation on our
            // Vuex store called "updateTodo". Take the ID from the 
            // todo list, and send it along with the current status
            this.$store.commit('updateTodo', {
                id: e.currentTarget.getAttribute('data-id'),
                completed: newStatus
            })
        },
        deleteItem: function(e) {
            // This will fire our "deleteTodo" mutation, and delete
            // this todo item according to their ID
            this.$store.commit('deleteTodo', {
                id: e.currentTarget.getAttribute('data-id')
            })
        },
        newItem: function() {
            // If this.newTodoItem has been typed into
            // We will create a new todo item using our
            // "addTodo" mutation
            if(this.newTodoItem !== '') {
                this.$store.commit('addTodo', {
                    id: uuidv4(),
                    name: this.newTodoItem,
                    completed: false
                })
            }
        },
        archiveItem: function(e) {
            // Finally, we can change or archive an item
            // using our "moveTodoItem" mutation
            this.$store.commit('moveTodoItem', {
                id: e.currentTarget.getAttribute('data-id'),
                location: 'archive'
            })
        }
    }

    }
</script>

<style scoped>
    .list-item-holder {
        display: flex;
    }
    
    [data-status="true"] label {
        text-decoration: line-through;
    }
</style>

