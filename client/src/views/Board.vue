<template>
  <div class="board container-fluid">
    {{board.title}}
    <div class="row">
      <List v-for="list in lists" :listProp="list" :key="list._id" />
    </div>
    <CreateListModal />
    <button class="btn btn-primary" data-toggle="modal" data-target="#create-list-modal">Add List</button>
  </div>
</template>

<script>
import List from "../components/List";
import CreateListModal from "../components/CreateListModal";
export default {
  name: "board",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getBoards");
    // this.$store.dispatch("getLists");
  },
  props: ["boardId"],
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
      this.$store.state.lists;
    }
  },
  components: { List, CreateListModal }
};
</script>
