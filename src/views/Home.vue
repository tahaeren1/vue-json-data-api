<template>
  <div>
    <el-table :data="data">
      <el-table-column label="userId" prop="userId"></el-table-column>
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="title" prop="title"></el-table-column>
      <el-table-column label="body" prop="body"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button @click="detay(scope.row)">Detail</el-button>

        </template>
      </el-table-column>

    </el-table>
    <b-navbar fixed="bottom" type="dark" variant="primary" >
      <b-navbar-nav class="ml-auto">
        <b-button @click="goToCreatePost()">Create Post</b-button>
      </b-navbar-nav>
    </b-navbar>
  </div>


</template>

<script>


import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      data: [],
    }
  },
  methods: {
    goToCreatePost() {
      this.$router.push({
        name: "createPost"
      })
    },
    detay(row) {
      this.$router.push({
        name: "detail",
        params: {detail: row}
      })
    },

    getPosts() {
      axios.get('https://jsonplaceholder.typicode.com/posts/')
          .then((response) => {
            this.data = response.data
            console.log("data", this.data);
          })
          .catch((err) => {
            console.log(err);

          })
    },

  },
  created() {
    this.getPosts();
  },
}
</script>

<style scoped>
.footers {
  position: fixed !important;

}
</style>


