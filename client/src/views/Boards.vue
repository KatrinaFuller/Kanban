<template>
  <div class="boards">
    <h1 class="title pt-4">Your Boards!</h1>
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required />
      <input type="text" placeholder="description" v-model="newBoard.description" />
      <button class="btn create m-1" type="submit">Create Board</button>
      <button class="btn logout" @click="logout">Logout</button>
    </form>
    <div v-for="board in boards" :key="board._id">
      <router-link class="link" :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
      <span class="delete-boards delete m-2" @click="removeBoard(board._id)">x</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  props: ["boardId"],
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    removeBoard(id) {
      this.$store.dispatch("removeBoard", id);
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
<style scoped>
.boards {
  /* background-color: #8caba8;
  min-height: 100vh; */
  min-height: 100vh;
  background: linear-gradient(
      135deg,
      #8caba8 21px,
      #f5f5f5 22px,
      #f5f5f5 24px,
      transparent 24px,
      transparent 67px,
      #f5f5f5 67px,
      #f5f5f5 69px,
      transparent 69px
    ),
    linear-gradient(
        225deg,
        #8caba8 21px,
        #f5f5f5 22px,
        #f5f5f5 24px,
        transparent 24px,
        transparent 67px,
        #f5f5f5 67px,
        #f5f5f5 69px,
        transparent 69px
      )
      0 64px;
  background-color: #8caba8;
  background-size: 64px 128px;
}
.link {
  color: #816072;
  font-size: 40px;
  text-shadow: 1px 1px black;
}
.title {
  font-size: 40px;
  font-weight: bold;
  color: #816072;
  text-shadow: 1px 1px black;
}
.create {
  background-color: #c5afbc;
}
.logout {
  background-color: #dfdfde;
}
.delete {
  color: #cb3232;
  font-size: 30px;
}
</style>