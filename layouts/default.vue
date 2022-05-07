<template>
  <b-card title="Todos" class="main-card">
    <b-input-group class="mt-3">
      <template #prepend>
        <b-input-group-text>
          <b-icon icon="chevron-compact-down" @click="completeAll()"></b-icon>
        </b-input-group-text>
      </template>
      <b-input placeholder="Type a new task title here" v-model="newTask" @keyup.enter="createTask" autofocus></b-input>
    </b-input-group>

    <div class="pt-3">
      <Tasks class="mb-3"></Tasks>

      <Nuxt />
    </div>

    <template #footer>
      <div class="d-flex justify-content-between">
        <div>0 items left</div>
        <div class="main-links">
          <b-link to="/">All</b-link>
          <b-link to="active">Active</b-link>
          <b-link to="completed">Completed</b-link>
        </div>
        <div>
          <b-link variant="link" class="text-secondary" @click="clearCompleted()">Clear completed</b-link>
        </div>
      </div>
    </template>
  </b-card>
</template>

<script>
import { BIcon, BIconChevronCompactDown } from "bootstrap-vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  components: {
    BIcon,
    BIconChevronCompactDown
  },
  name: "DefaultLayout",
  async fetch() {
    this.getTodos();
  },
  data() {
    return {
      newTask: null,
      // todos: [],
    };
  },
  computed: {
    ...mapState("todo", ["allTodos"]),
  },
  methods: {
    ...mapActions("todo", ["getTodos", "handleTask"]),
    createTask() {
      const result = this.handleTask({
        task: {
          title: this.newTask,
          completed: false
        },
        action: "POST"
      })
      if (result) {
        this.newTask = null
      }
    },
    async clearCompleted() {
      const deleteTasks = this.allTodos.filter((data) => data.completed)
      for (const todo of deleteTasks) {
        await this.handleTask({
          task: {
            id: todo.id
          },
          action: "DELETE"
        })
      }
    },
    async completeAll() {
      const activeTasks = this.allTodos.filter((data) => !data.completed)
      for (const todo of activeTasks) {
				 await this.handleTask({
          task: {
            id: todo.id,
            title: todo.title,
            completed: true
          },
          action: "PUT"
        })
      }
    }
  },
};
</script>
