<template>
  <div class="tasks-container">
    <b-list-group class="todo-list new-todo">
      <b-list-group-item :style="task.completed ? 'opacity: 0.4' : ''" @dblclick="setEditableMode(task)" v-for="task in filteredTodos" :key="task.id">
        <div class="pr-3 d-inline">
          <b-icon icon="check2" font-scale="1.2" class="cursor-pointer" :variant="task.completed ? 'success' : 'secondary'" v-b-tooltip.hover="task.completed ? 'Task already completed' : 'Mark as completed'" @click="handleTask({ task: { ...task, completed: true }, action: 'PUT' })"></b-icon>
        </div>

        <b-input class="edit" v-model="newTaskTitle" v-if="task.edit" @keyup.enter="updateTask(task, 'enter')" @keyup.esc="updateTask(task, 'esc')"></b-input>

        <span v-else>
          {{ task.title }}
        </span>

        <b-icon icon="x" font-scale="1.2" class="float-right delete-icon" @click="handleTask({ task: task, action: 'DELETE' })" v-if="!task.completed && !task.edit"></b-icon>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { BIcon, BIconCheck2, BIconX } from "bootstrap-vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  components: {
    BIcon,
    BIconCheck2,
    BIconX,
  },
  computed: {
    ...mapState("todo", ["allTodos"]),
    filteredTodos() {
      if (this.$route.name === "index") {
        return this.allTodos;
      } else if (this.$route.name === "active") {
        return this.allTodos.filter((item) => !item.completed);
      } else if (this.$route.name === "completed") {
        return this.allTodos.filter((item) => item.completed);
      }
    },
  },
  data() {
    return {
      lastEditedTask: {},
    };
  },
  data() {
    return {
      lastEditedTask: null,
      newTaskTitle: null,
    };
  },
  methods: {
    ...mapActions("todo", ["handleTask"]),
    ...mapMutations("todo", ["setTaskEditable"]),
    setEditableMode(task) {
      if (!task.completed) {
        if (this.lastEditedTask) {
          this.setTaskEditable({
            task: this.lastEditedTask,
            edit: false
          });
        }

        this.setTaskEditable({
          task: task,
          edit: true
        });

        this.lastEditedTask = task;
        this.newTaskTitle = task.title
      }
    },
    updateTask(task, press) {
      if (press === "esc") {
        this.handleTask({
          task: {
            ...task,
            edit: false
          },
          action: 'PUT'
        })
      } else {
        if (this.newTaskTitle) {
          this.handleTask({
            task: {
              ...task,
              edit: false,
              title: this.newTaskTitle
            },
            action: 'PUT'
          })
        } else {
          this.handleTask({
            task: {
              id: task.id
            },
            action: 'DELETE'
          })
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.tasks-container {
  max-height: 100%;
  overflow-y: auto;
}
.list-group-item {
  .delete-icon {
    display: none;
  }
  &:hover .delete-icon {
    display: block;
  }
}
</style>
