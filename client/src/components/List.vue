<template>
  <div class="List col-3 border rounded">
    <h1>{{listProp.title}}</h1>
    <button class="btn btn-danger" @click="removeList">Delete List</button>
  </div>
</template>


<script>
export default {
  name: "List",
  props: ["listProp", "boardProp", "authorProp"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    // viewList() {
    //   this.$router.push({
    //     name: "List",
    //     params: {
    //       listId: this.listProp._id,
    //       boardId: this.boardProp._id
    //     }
    //   });
    // },
    removeList() {
      this.$store.dispatch("removeList", this.listProp);
      // this.$store.dispatch("removeList", this.boardProp._id);
    }
  },
  components: {}
};
</script>


<style scoped>
</style>