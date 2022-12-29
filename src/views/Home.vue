<template>
  <div>
    <header>
      <section>
        <label for="title">todolist</label>
        <input type="text" v-model="content" @keyup.enter="addTodo"  placeholder="Add new todo..."/>
      </section>
    </header>
    <section>
      <h2>Active
        <span> {{ calculateInProgress() }} </span>
      </h2>
      <ol class="demo-box">
        <template v-for="(item, index) in taskList">
          <li :key="index" v-if="item.completed === false">
            <input type="checkbox" @change="changeTodo(index,true)">
            <p>{{ item.content }}</p>
            <a @click="deleteTodo(index)">-</a>
          </li>
        </template>
      </ol>
      <h2>Completed
        <span>{{ taskList.length - calculateInProgress() }}</span>
      </h2>
      <ul>
        <template v-for="(item, index) in taskList">
          <li :key="index" v-if="item.completed === true">
            <input type="checkbox" @change="changeTodo(index,false)" checked='checked'>
            <p>{{ item.content }}</p>
            <a @click="deleteTodo(index)">-</a>
          </li>
        </template>
      </ul>
    </section>
    <footer>
      Copyright &copy; 2022 yinzewei
    </footer>
  </div>
</template>

<script>
import * as Utils from '@/utils/utils'
import axios from "axios";

export default {
  name: 'Todolist',
  data() {
    return {
      userId: '',
      content: '',
      taskList: []
    }
  },
  methods: {
    calculateInProgress() {
      let cnt = 0
      for (let i = 0; i < this.taskList.length; ++i) {
        if (!this.taskList[i].completed) ++cnt;
      }
      return cnt
    },
    async getUserId() {
      await axios.get('http://localhost:8080/getUserId').then((res) => {
        this.userId = res.data
      })
    },
    async initTodo() {
      await this.getUserId()
      Utils.getItem(this.userId).then(res => {
        this.taskList = res
      })
    },
    addTodo() {
      let tempTask = {
        id: null,
        userId: this.userId,
        content: this.content,
        completed: false
      }
      Utils.insert(tempTask)
      Utils.getItem(this.userId).then(res => {
        this.taskList = res
      })
      location.reload()
    },
    deleteTodo(index) {
      Utils.deleteTask(this.taskList[index].id)
      Utils.getItem(this.userId).then(res => {
        this.taskList = res
      })
      location.reload()
    },
    changeTodo(index, completed) {
      this.taskList[index].completed = completed
      Utils.update(this.taskList[index])
      Utils.getItem(this.userId).then(res => {
        this.taskList = res
      })
      location.reload()
    },
    clearData() {
    }
  },
  mounted() {
    this.initTodo()
  }
}
</script>

<style scoped>
</style>
