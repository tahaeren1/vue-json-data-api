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

        <b-button variant="primary" @click="createPost()">Create</b-button>
      </b-form>
    </div>
    <!-- Content here -->
  </b-container>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      title: "",
      body: ""
    }
  },
  methods: {
    createPost() {
      axios.post("https://jsonplaceholder.typicode.com/posts", {title: this.title, body: this.body})
          .then((response) => {
            console.log("create", response.data)
            this.$router.push({
              name: "home"
            })
          });
    }
  }
}
</script>
