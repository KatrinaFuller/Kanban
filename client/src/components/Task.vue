<template>
  <div class="Task col-12 border m-1">
    <p>
      {{taskProp.description}}
      <button type="button" class="btn btn-default x" @click="removeTask">X</button>
    </p>
  </div>
</template>


<script>
export default {
  name: "Task",
  props: ["taskProp"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    removeTask() {
      this.$store.dispatch("removeTask", this.taskProp);
    }
  },
  components: {}
};
</script>


<style scoped>
.x {
  color: red;
}
</style>