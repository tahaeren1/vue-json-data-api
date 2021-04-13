<template>
  <b-container>

    <div>
      <b-form>
        <b-form-group>
          <b-form-input
              v-model="title"
              placeholder="Title"
          ></b-form-input>
        </b-form-group>

        <b-form-group>
          <b-form-input
              v-model="body"
              placeholder="Body"
          ></b-form-input>
        </b-form-group>

        <b-button class="pb-2" variant="primary" @click="updatePost()">Update</b-button>

        <b-button class="pb-2" variant="primary" @click="deletePost()">Delete</b-button>
      </b-form>
    </div>
    <!-- Content here -->
  </b-container>

</template>

<script>

import axios from "axios";

export default {
  props: ["detail"],
  mounted() {
    this.getPostById();
  },
  data() {
    return {
      title: "",
      body: ""
    }
  },
  methods: {
    updatePost() {
      axios.put(`https://jsonplaceholder.typicode.com/posts/${this.detail.id}`, {title: this.title, body: this.body})
          .then((response) => {
            console.log("update", response.data)
            this.$router.push({
              name: "home"
            })
          });
    },

    deletePost() {
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.detail.id}`)
          .then((response) => {
            console.log("delete", response.data);
            this.$router.push({
              name: "home"
            })
          });
    },

    getPostById() {
      console.log(this.detail.id)
      axios.get(`https://jsonplaceholder.typicode.com/posts/${this.detail.id}`)
          .then((response) => {
            this.title = response.data.title;
            this.body = response.data.body;
          });
    },
  }

}
</script>

<style scoped>
.pb-2, .py-2 {
  padding-bottom: .5rem!important;
  margin: 20px;
}
</style>
