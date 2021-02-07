<template>

<div>
  <hr>
  <li class="list-group-item">
<div class="d-flex justify-content-between input-text">
      <span v-if="todo.isCompleted" class="text-todo"><del>  {{todo.text}}</del></span>
       <span v-else class="text-todo">{{todo.text}}</span>
      <button class="btn btn-danger" @click="$emit('deleteTodo', todo.id)"><i class="fas fa-times"></i></button>
      <button v-if="todo.isCompleted == false" class="btn-primary" type="button" @click="$emit('completeTodo', todo.id)">
       <i class="fas fa-check"></i>
     </button>
     <button  v-else class="btn-primary" type="button" @click="$emit('returnTodo', todo.id)">
    <i class="fas fa-arrow-up"></i>
  </button>

</div>
  </li>
</div>
</template>

<script>
export default {
  props : ["todo"],



}
</script>

<style scoped>

li {
  background: antiquewhite;
  border: solid 3px transparent;

}

.text-todo {
  box-sizing: border-box;
  border: solid 3px transparent;
  width: 80%;
  font-family: 'Gochi Hand', cursive;
  font-size: 1rem;

}


</style>
