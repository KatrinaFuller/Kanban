<template>
  <div class="Task col-12 border m-1">
    <p>
      {{taskProp.description}}
      <button type="button" class="btn btn-default x" @click="removeTask">X</button>
    </p>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="comment" v-model="newComment.content" />
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          @click="addComment"
        >Add Comment</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Task",
  props: ["taskProp"],
  data() {
    return {
      newComment: {}
    };
  },
  computed: {},
  methods: {
    removeTask() {
      this.$store.dispatch("removeTask", this.taskProp);
    },
    addComment() {
      this.newComment.taskId = this.taskProp._id;
      this.$store.dispatch("addComment", this.newComment);
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