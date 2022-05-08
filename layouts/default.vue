<template>
  <div class="todoapp">
    <h1 class="mt-5">Todos</h1>
    <b-card class="main-card">
      <b-input-group class="mt-3">
        <template #prepend>
          <b-input-group-text>
            <b-icon icon="chevron-compact-down" @click="completeAll()"></b-icon>
          </b-input-group-text>
        </template>
        <b-input class="new-todo" placeholder="Type a new task title here" v-model="newTask.title" @keyup.enter="createTask" autofocus></b-input>
      </b-input-group>

      <div class="pt-3">
        <Tasks class="mb-3"></Tasks>

        <Nuxt />
      </div>

      <template #footer v-if="allTodos.length > 0" class="footer">
        <div class="d-flex justify-content-between">
          <strong class="todo-count"> {{ allTodos.length }} {{ allTodos.length > 1 ? "items" : "item" }} left</strong>
          <div class="main-links">
            <b-link to="/">All</b-link>
            <b-link to="active">Active</b-link>
            <b-link to="completed">Completed</b-link>
          </div>
          <div>
            <b-link variant="link" class="text-secondary " @click="clearCompleted()">Clear completed</b-link>
          </div>
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
import { BIcon, BIconChevronCompactDown } from "bootstrap-vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    BIcon,
    BIconChevronCompactDown
  },
  name: "DefaultLayout",
  data() {
    return {
      newTask: {
        title: null,
        completed: false,
        edit: false
      },
    };
  },
  computed: {
    ...mapState("todo", ["allTodos"]),
  },
  methods: {
    ...mapActions("todo", ["getTodos", "handleTask"]),
    async createTask() {
      const task = JSON.parse(JSON.stringify(this.newTask))
      const result = await this.handleTask({ task: task, action: "POST" });
      this.newTask.title = null
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
            ...todo,
            completed: true
          },
          action: "PUT"
        })
      }
    },
  },
  created() {
    this.getTodos();
  }
};
</script>
