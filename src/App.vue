<script setup>
import { ref, computed, reactive } from "vue";
import { useStatusClass } from './composables/useStatusClass'

const task = ref("")
const editedTaskIndex = ref(null)
const statuses = ref(["to-do", "in-progress", "finished"])
const { getStatusClass } = useStatusClass();
//state
const tasks = ref([
    {
        name: "Create a todo app",
        status: "to-do",
    },
    {
        name: "Learning Vue.js",
        status: "in-progress",
    },
    {
        name: "Have coffee",
        status: "finished",
    },
])

//actions
const changeStatus = (task) => {
    //find index of status
    const currentIndex = statuses.value.indexOf(task.status);
    //find next status index
    const nextIndex = (currentIndex + 1) % statuses.value.length; // this part lead us to index 0
    task.status = statuses.value[nextIndex];
};
const deleteTask = (index) => {
    tasks.value.splice(index, 1);
}
const editTask = (index) => {
    task.value = tasks.value[index].name
    editedTaskIndex.value = index
    console.log(editedTaskIndex.value);
}
const submitTask = () => {
    if (task.value.length === 0) return;
    if (editedTaskIndex.value !== null) {
        tasks.value[editedTaskIndex.value].name = task.value;
        editedTaskIndex.value = null;
    } else {
        tasks.value.push({
            name: task.value,
            status: "to-do",
        });
    }
    task.value = "";
}

//computed
const shouldShowCongratulations = computed(() => {
    return tasks.value.every(task => task.status === 'finished')
})

</script>

<template>
    <div class="container" style="max-width: 600px">
        <!-- Heading -->
        <h2 class="text-center mt-5">Todo App</h2>

        <!-- Input -->
        <div class="d-flex mt-5">
            <input type="text" v-model="task" placeholder="Enter task" class="w-100 form-control" />
            <button class="btn btn-warning rounded-0" @click="submitTask">
                SUBMIT
            </button>
        </div>

        <!-- Task table -->
        <table class="table table-bordered mt-5">
            <thead>
                <tr>
                    <th scope="col">Task</th>
                    <th scope="col" style="width: 120px">Status</th>
                    <th scope="col" class="text-center">#</th>
                    <th scope="col" class="text-center">#</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task, index) in tasks" :key="index">
                    <td>
                        <span :class="`${task.status === 'finished' ? 'line-through' : ''}`">
                            {{ task.name }}
                        </span>
                    </td>
                    <td>
                        <span class="pointer" @click="changeStatus(task)" :class="getStatusClass(task.status)">
                            {{ task.status }}
                        </span>
                    </td>
                    <td class="text-center">
                        <div @click="deleteTask(index)">
                            <span class="fa fa-trash pointer" />
                        </div>
                    </td>
                    <td class="text-center">
                        <div @click="editTask(index)">
                            <span class="fa fa-pen pointer" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="finish-statement" v-if="shouldShowCongratulations">
            Congratulations! You completed all your tasks!
        </div>
    </div>
</template>


<style scoped>
body {
    font-family: 'Montserrat', sans-serif;
}

.pointer {
    cursor: pointer;
}

.line-through {
    text-decoration: line-through;
}

.finish-statement {
    font-weight: bolder;
    font-size: 22px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.669);
    color: rgb(21, 226, 21);
    padding: 20px;
}
</style>