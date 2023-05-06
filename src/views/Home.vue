<template>
    <h1>To do list</h1>
    <TodoList location="home" />
</template>

<script>
import TodoList from '../components/ToDoList.vue';
export default { 
    name: "HomePage",
    components: {
        TodoList
    }
}
</script>