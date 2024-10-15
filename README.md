# TODO APP with Vue + Vite

![overwhelmed](https://i.gifer.com/3M3.gif)

Hello coders! Nowadays we have a stressful life. So to manage this and learn Vue, we are going create a TODO App. You can't call yourself developer if you haven't developed a TO-DO App.
The final result should look like this:

![todo-app-demo](https://user-images.githubusercontent.com/84244900/234034451-1aee3f7c-0c29-446d-a429-ebb61269cbfa.gif)

## Step 1: Clone the project, install it and launch it!

Fork & clone this repo, it will help you with the basic scaffolding. Using the terminal, navigate to the folder on your machine where you usually keep your repos and type this.

```
git clone https://github.com/SybilVane/todo-app-vue-vite.git

cd todo-app-vue-vite

npm install

code .

```
To launch the app and see what is already done, you can go back to the terminal (or open a new terminal inside VS code) and type this.

```
npm run dev
```
If you did everything right you will be able to see the basic template that we'll need to modify in order to make it work.

![starter-app](https://user-images.githubusercontent.com/84244900/234041099-994c0c5d-146e-4c31-913a-8e373a06a9bd.png)

Now open the file App.vue and let's get down to business!

## Step 2: Show data on the table

The first thing we need to do in order to visualize data on our table is by using the directive `v-for`, and we can start off rendering the default data we already have in `tasks`.
As it is an array, and we want to iterate over it and show a row for each item, let's add v-for to the `<tr>` contained in the `<tbody>`
```
<tr v-for="(task, index) in tasks" :key="index">
```
Once you do this, you will be able to replace the placeholders --- task name --- and -- task status -- with the real data.
For this remember we use the `{{  }}`.

## Step 3: Add new tasks

Now that we have some tasks ready, we want to add new tasks to our table. For this we'll need to update the tasks array.
We will use the directive `v-model` to bind the input to the `task` contained in `data()` so that it gets updated every time you type something in it.
Next we'll need to add to the button on the side of the input the directive`@click` which will need to trigger the method `submitTask`.

This method will need to do several things:
- Check tasks are added only if task length is not 0 (no empty tasks in out list)
- Add the new task to the tasks array. By default, its status will be 'to-do', everytime we create a new task.
- Set the task back to an empty string after the new task is added (to clean up our input)

## Step 4: Delete our tasks
Next step, we'll need to delete our tasks. For that we'll need to bind the div that contains the trash icon to the method `deleteTask(index)`.
This method will need to delete the task that we want. Remember how to use `.splice` ?

## Step 5: Hide / Show the congratulations message
If you look at your table, you'll see that there's a congratulation message, always visible. We need to see that only in case all our tasks have "finished" as a status.
For this we will need to use the directive `v-if` in the div which contains the message, and bind it to the method `shouldShowCongratulations()`.
In the method you should check that the status of all the items is "finished". For this purpose, you can use the array method `.every`.

## Step 6: Add class line-through for finished tasks
Now let's add some logic to the class of the span that contains the **task name**, so that the class will be "intelligent" and add line-through to **the name** of the task if its status is "finished".
For this you can bind the class to a condition to evaluate the **task status**: if it is "finished" then the `:class` will be `.line-thorugh` (already present in the `<style></style>` at the end of your App).
If it is not, the class will not be applied. Don't get confused! The name of the task should appear ~~like this~~ NOT the status (we only use the status to understand if our task name will be crossed out or not).

## Step 7: Add a class to task status text dynamically
It's now time to give some styling to the status text too! Find the span which contains the task status, and bind the `:class` to the method `getStatusClass(task)` so the class is dynamic.
This method will need to evaluate the task status and return the right class, accordingly (don't forget that a class is just a string in the end).

- If the task status is "finished", return the class 'text-success' (you don't need to create these classes, they are already present in bootstrap library that's installed in the project)
- If the task status is "in progress", return the class 'text-warning'
- If the task status is "to-do", the class 'text-danger'

## Step 8: Update task status when clicking on it
We want to change our tasks' status from "to-do" to "in progress" to "finished".
We need to use the directive `@click` in the same span as before, the one containing the task status. We want to bind the directive to the method `changeStatus(task)`.
This method will need to change the status of the selected task every time you click on it in a "circular way". There are several ways to do that, some of them easier but more "wordy",
some others smarter, but more difficult to understand. You can use the array called `statuses` that you have in the `data()` to iterate over, and see if it's useful in any way.

## Step 9: BONUS TRACK - Edit tasks
If you were able to complete all the previous steps... CONGRATULATIONS! You did an amazing job!
Now, if you're feeling adventurous you can try this last challenge, editing an existing task.

#### Part 1
You will need to bind the method `editTask(index)` to the div which contains the span with the icon of a pen.
When clicking on the pen, the method will need to do 2 things:
- assign to `this.task` the value of the `task.name` you clicked on. You can do that using the index you've passed into the method and accessing the `this.tasks` array to retrieve that.
- Also set the `this.editedTaskIndex` to the index you've passed into this method.
This way we are "copying" the name of the task back into the input field, so we can modify that, and we are setting the "editedTaskIndex" so we will be able to overwrite the task name at that index when clicking on the submit, instead of just creating a new one.

#### Part 2
What you've done is not going to work until you also fix the current method `submitTask()`.
We need to add a new condition to it, to understand if we just want to submit a new task as we've done so far, or if we want to overwrite and existing one.

This condition will need to check if the "editedTaskIndex" is null or not. Let's stop and think for a while. The editedTaskIndex is null by default in the `data()`. This means that whatever I write in the input field, if I click on submit I will push a new task into the tasks array.
If the editedTaskIndex is not null (which means it is a number - an index), it means that we have clicked on the pen icon and that we just want to edit something at that index.

In other words:
If `this.editedTaskIndex` is null...
- Push a new task into the tasks array (use the part of code that was already there in your method to do this, place it inside this new condition and don't change anything).

Else... (we are in "overwrite mode" now)
- Use `this.editedTaskIndex` to access the tasks array, and assign your current task value to that specific task.
- Set `this.editedTaskIndex` back to null (very important, or you'll be editing the same task over and over instead of going back to adding new ones)

# WOW! You've completed all your tasks! :D

### Extra: This is going to make your life easier

If you haven't installed Vue Developer Tools in your browser, install it immediately:

- [For Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [For Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [For Egde](https://microsoftedge.microsoft.com/addons/detail/vuejs-devtools/olofadcdnkkjdfgjcmjaadnlehnnihnl)

Vue Developer Tools allows you check your data app from your inspector's browser without console logs and many more.

![VueDevTools](assets/VueDevtools.png)