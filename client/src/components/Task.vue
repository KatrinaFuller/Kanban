<template>
  <div class="Task col-12 border m-1">
    <p>{{taskProp.description}}</p>
  </div>
</template>


<script>
export default {
  name: "Task",
  props: ["taskProp", "listProp", "boardProp", "authorProp"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>