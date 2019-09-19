<template>
  <div
    :id="`create-comment-modal-${this.taskProp._id}`"
    class="modal fade bd-example-modal-sm"
    tabindex="-1"
    role="dialog"
    aria-labelledby="mySmallModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="modal-body">
          <h1></h1>
          <form @submit.prevent="addComment()">
            <div class="form-group">
              <!-- <label for="content">Comment</label> -->
              <input
                type="text"
                class="form-control"
                id="content"
                placeholder="Enter your comment"
                v-model="newComment.content"
                required
              />
            </div>
            <button type="submit" class="btn submit-button">Submit</button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn close-button" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "create-comment-modal",
  props: ["taskProp"],
  data() {
    return {
      newComment: {}
    };
  },
  computed: {},
  methods: {
    addComment() {
      this.newComment.listId = this.taskProp.listId;
      this.newComment.taskId = this.taskProp._id;
      this.$store.dispatch("addComment", this.newComment);
      $(".close").click();
    }
    // removeComment(comment) {
    //   comment.taskId = this.taskProp._id;
    //   comment.listId = this.taskProp.listId;
    //   this.$store.dispatch("removeComment", comment);
    // }
  },
  components: {}
};
</script>


<style scoped>
.submit-button {
  background-color: #8caba8;
}
.close-button {
  background-color: #c5afbc;
}
</style>