<template>
  <div id="create-list-modal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create A List!</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addList()">
            <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Enter title"
                v-model="newList.title"
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
  name: "create-list-modal",
  data() {
    return {
      newList: {
        title: "",
        boardId: this.$route.params.boardId
      }
    };
  },
  computed: {},
  methods: {
    addList() {
      this.newList.boardId = this.$route.params.boardId;

      this.$store.dispatch("addList", this.newList);
      this.newList = {};
      $(".close").click();
    }
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