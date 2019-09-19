<template>
  <div class="board container-fluid body">
    <div class="row">
      <div class="col text-center">
        <h1>{{board.title}}</h1>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col-1">
        <button
          class="btn btn-lg add"
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
  </div>
</template>

<script>
import List from "../components/List";
import CreateListModal from "../components/CreateListModal";
export default {
  name: "board",
  props: ["boardId"],
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
      //FIXME This does not work on page reload because the boards array is empty in the store
      return (
        this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: "Loading..."
        }
      );
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  components: { List, CreateListModal }
};
</script>
<style scoped>
h1 {
  font-size: 3.5rem;
}
.body {
  background-color: #c8c8c7;
  min-height: 100vh;
}
.add {
  background-color: #c5afbc;
}
</style>
