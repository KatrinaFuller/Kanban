<template>
  <div class="board container-fluid body">
    <div class="row">
      <div class="col text-center">
        <div class="project-title">
          <!-- <h1>{{board.title}}</h1> -->
          <span class="remove-board text-center">{{board.title}}</span>
          <span class="delete-board" @click="removeBoard(board)">x</span>
        </div>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col-1">
        <button
          class="btn btn-lg add mb-2"
          type="button"
          data-toggle="modal"
          data-target="#create-list-modal"
        >Add List</button>
      </div>
    </div>
    <div class="row">
      <List v-for="list in lists" :listProp="list" :boardProp="board" :key="list._id" />
    </div>
    <CreateListModal />
    <!--not sure if we need this id part -->
  </div>
</template>

<script>
import List from "../components/List";
import CreateListModal from "../components/CreateListModal";
export default {
  name: "board",
  props: ["boardId", "boardProp"],
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getBoards");
    this.$store.dispatch("getListsById", this.$route.params.boardId);
  },
  //props: ["listId"],
  computed: {
    board() {
      return (
        this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: "Loading..."
        }
      );
    },
    lists() {
      return this.$store.state.lists;
    },
    removeBoard(board) {
      this.$store.dispatch("removeBoard", board.boardId);
    }
  },
  components: { List, CreateListModal }
};
</script>
<style scoped>
.project-title {
  display: flex;
  justify-content: space-between;
  font-size: 3.5rem;
}
.body {
  /* background-color: #c8c8c7; */
  min-height: 100vh;
  background: linear-gradient(
      135deg,
      #c8c8c7 21px,
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
        #c8c8c7 21px,
        #f5f5f5 22px,
        #f5f5f5 24px,
        transparent 24px,
        transparent 67px,
        #f5f5f5 67px,
        #f5f5f5 69px,
        transparent 69px
      )
      0 64px;
  background-color: #c8c8c7;
  background-size: 64px 128px;
}
.add {
  background-color: #c5afbc;
}
.delete-board {
  color: #cb3232;
  font-weight: bold;
}
</style>
