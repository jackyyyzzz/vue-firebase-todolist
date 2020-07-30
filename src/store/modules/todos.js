import { db } from '@/main';

const state = {
  todos: [],
  oldTitle: '',
  idInEdit: '',
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await db.collection('todolist').get();
    let todoitems = [];
    response.forEach((todo) => {
      let appData = todo.data();
      appData.id = todo.id;
      todoitems.push(appData);
    });
    commit('setTodos', todoitems);
  },
  async addTodo({ commit }, title) {
    const response = await db.collection('todolist').add({ title, completed: false });
    let todoitems = {
      id: response.id,
      title: title,
      completed: false,
    };

    commit('newTodo', todoitems);
  },
  async deleteTodo({ commit }, id) {
    await db
      .collection('todolist')
      .doc(id)
      .delete();

    commit('removeTodo', id);
  },
  async updateTodo({ commit }, updTodo) {
    await db
      .collection('todolist')
      .doc(updTodo.id)
      .update({
        title: updTodo.title,
        completed: updTodo.completed,
      });

    commit('updateTodo', updTodo);
  },

  editTodo({ commit }, todo) {
    commit('editTodo', todo);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) => {
    state.todos = state.todos.filter((todo) => todo.id !== id);
    state.idInEdit = '';
    state.oldTitle = '';
  },
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
    state.idInEdit = '';
    state.oldTitle = '';
  },
  editTodo: (state, todo) => {
    state.oldTitle = todo.title;
    state.idInEdit = todo.id;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};