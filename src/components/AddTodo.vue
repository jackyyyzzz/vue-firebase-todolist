<template>
	<div>
		<h3>Add Todo</h3>
		<div class="add">
			<form v-if="!idInEdit" @submit="onSubmit">
				<input type="text" v-model="title" placeholder="Add Todo..." required />
				<input type="submit" value="Submit" />
			</form>
			<form v-else @submit="onEdit">
				<input type="text" v-model="editedTitle" placeholder="Edit Todo..." required />
				<input type="submit" value="Edit" />
			</form>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		name: 'AddTodo',
		data() {
			return {
				title: '',
				editedTitle: '',
			};
		},
		methods: {
			...mapActions(['addTodo', 'updateTodo']),
			onSubmit(e) {
				e.preventDefault();
				this.addTodo(this.title);
				this.title = '';
			},
			onEdit(e) {
				e.preventDefault();
				let updTodo = {
					id: this.idInEdit,
					title: this.editedTitle,
					completed: false,
				};
				this.updateTodo(updTodo);
				this.editedTitle = '';
			},
		},
		computed: {
			idInEdit() {
				return this.$store.state.todos.idInEdit;
			},
			oldTitle() {
				return this.$store.state.todos.oldTitle;
			},
		},
		watch: {
			idInEdit() {
				this.editedTitle = this.oldTitle;
			},
		},
	};
</script>

<style scoped>
	form {
		display: flex;
	}

	input[type='text'] {
		flex: 10;
		padding: 10px;
		border: 1px solid #41b883;
		outline: 0;
	}

	input[type='submit'] {
		flex: 2;
		background: #41b883;
		color: #fff;
		border: 1px #41b883 solid;
		cursor: pointer;
	}
</style>
