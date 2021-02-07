<template>
  <div class="container mt-5">
    <div class="row col-md-12">
      <div class="d-flex justify-content-between input-text">
      <input placeholder="Lütfen yazı giriniz" v-model="todoText" type="text" class="form-control text-form" aria-label="Text input with segmented dropdown button">
        <button   @click="addTodo()" v-if="todoText.length > 0" class="btn btn-primary"><i class="fas fa-plus"></i></button>
      </div>
      <div class="app">

          <ul class="list-group">
          <Todo @completeTodo="completeTodo($event)" @deleteTodo="deleteTodo($event)" @returnTodo="returnTodo($event)" :class="{'isCompleted' : todo.isCompleted}"  v-for="todo in todoList" :todo="todo" :key="todo.id "/>
          </ul>
        </div>
      <div class="d-flex flex-row-reverse bd-highlight mt-5">
      <button class="btn-info"  type="button" @click="allDone()">
        All Done
      </button>

      </div>
    </div>

  </div>


</template>

<script>

import Todo from "@/components/Todo";
import axios from "axios";

export default {
  components: {Todo},
  data(){
    return {
      todoText : "",
      todoList : [],

    }
  },
  methods : {


    addTodo(){

      axios.post("https://vue-deneme-8505d-default-rtdb.firebaseio.com/todoList.json", {text : this.todoText, isCompleted:false, completedDate: null})
      .then(() => {
        this.getAllTodos()


      })
      .catch(e => {
        console.log(e);
      });
    },

    deleteTodo(todoId){
      axios.delete("https://vue-deneme-8505d-default-rtdb.firebaseio.com/todoList/" + todoId + ".json")
      .then(() =>{

       // let index = this.todoList.findIndex(i => {
       //   return i.id == todoId
       // })
       //
       //  this.todoList.splice(index, 1)

        this.getAllTodos();

      })
      .catch(e => {
        console.log(e)
      });
    },
    getAllTodos(){
     this.todoList = [];
      axios.get("https://vue-deneme-8505d-default-rtdb.firebaseio.com/todoList.json")
          .then(response => {
            console.log("firebase log :", response.data);
            let currentDate = new Date();
            for (let key in response.data){
              let completedDate = new Date(response.data[key].completedDate);
              if (!response.data[key].completedDate || (response.data[key].completedDate && (currentDate - completedDate) < 60000)) {
                let todo = {
                  text : response.data[key].text,
                  id : key,
                  isCompleted: response.data[key].isCompleted,

                }
                this.todoList.push(todo);

              }


            }
            console.log("todolist log :", this.todoList);
          })

    },
    completeTodo(todoId){
      console.log("test" + todoId);
      axios.patch("https://vue-deneme-8505d-default-rtdb.firebaseio.com/todoList/" + todoId + ".json",
          {
            isCompleted: true,
            completedDate: new Date()
          })
          .then(() =>{

            this.getAllTodos();

            let d = new Date();

            console.log(d.getHours());


          })
          .catch(e => {
            console.log(e)
          });

    },
    returnTodo(todoId){
      console.log("test" + todoId);
      axios.patch("https://vue-deneme-8505d-default-rtdb.firebaseio.com/todoList/" + todoId + ".json", {isCompleted: false})
          .then(() =>{

            this.getAllTodos();


          })
          .catch(e => {
            console.log(e)
          });

    },
    allDone(){

      let allData = [];
      axios.get("https://vue-deneme-8505d-default-rtdb.firebaseio.com/todoList.json")
          .then(response => {
            allData = response.data;
            for (let key in allData) {
              allData[key].isCompleted = true;

            }
            console.log(allData)
            this.updateAllTodo(allData);
          });
    },

    updateAllTodo(data) {
      axios.patch("https://vue-deneme-8505d-default-rtdb.firebaseio.com/todoList.json", data)
          .then(() =>{

            this.getAllTodos();


          })
          .catch(e => {
            console.log(e)
          });
    }

  },

  created() {
    this.getAllTodos();

  },

}

</script>

<style scoped>


.container {
  background: antiquewhite;
  width: 100%;
  height: auto;
  min-height: 500px;
  max-width: 500px;
  min-width: 250px;
  background-size: 25px 25px;
  border-radius: 20px;
  box-shadow: 4px 3px 7px 2px #00000040;
  padding: 1rem;
  box-sizing: border-box;

}

.text-form {
  box-sizing: border-box;
  background-color: transparent;
  padding: 0.7rem;
  border: solid 3px transparent;
  width: 80%;
  font-family: 'Gochi Hand', cursive;
  font-size: 1rem;
}



</style>


