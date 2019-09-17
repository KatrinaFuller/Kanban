<template>
  <div class="List col-3 border rounded" @click="viewList()">
    <h1>hi {{listProp.title}}</h1>
  </div>
</template>


<script>
export default {
  name: "List",
  props: ["listProp"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    viewList() {
      this.$router.push({
        name: "List",
        params: { listId: this.listProp._id }
      });
    }
  },
  components: {}
};
</script>


<style scoped>
</style>