<template>
  <div class="List col-3 border rounded" @click="viewList()">
    <h1>{{listProp.title}}</h1>
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
    viewList() {
      this.$router.push({
        name: "List",
        params: {
          listId: this.listProp._id,
          boardId: this.boardProp._id
        }
      });
    }
  },
  components: {}
};
</script>


<style scoped>
</style>