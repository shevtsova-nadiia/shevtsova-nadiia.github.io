import {test, Locator, expect} from "@playwright/test";

// test.use({
//     launchOptions: {
//       slowMo: 500
//     }
// })

test.describe('Project 06', () => {
    test.beforeEach('Go to Project 6', async ({page}) => {
        await page.goto('https://www.techglobal-training.com/frontend/project-6')
    })

/*
Navigate to https://techglobal-training.com/frontend/project-6.
Confirm that the todo-app modal is visible with the title “My Tasks.”
Validate that the New todo input field is enabled for text entry.
Validate ADD button is enabled.
Validate Search field is enabled.
Validate that the task list is empty, displaying the message “No tasks found!”
*/
    test ('Test Case 01', async ({page}) => {
        // 2
        const todoAppModal : Locator = page.locator('section')
        await expect(todoAppModal).toBeVisible()  
        // or
        const todoAppModal1 : Locator = page.locator('.panel')
        await expect(todoAppModal1).toBeVisible()  

        const titleTodo = page.locator('.panel-heading', { hasText: 'My Tasks' })
        await expect(titleTodo).toHaveText('My Tasks')
        // 3, 4, 5
        const elTodoList = page.locator('#input-add, #add-btn, #search')
        const elTodoListAll = await elTodoList.all()
        for(const elTodoList of elTodoListAll) {
            await expect(elTodoList).toBeEnabled()
        }
        // 6
        const listTodo = page.locator('#panel')
        await expect(listTodo).not.toBeAttached()
        const messageTodo = page.locator('.panel-block.todo-item > p')
        await expect(messageTodo).toHaveText('No tasks found!')
    })
/*
Navigate to https://techglobal-training.com/frontend/project-6
Enter a new task in the todo input field and add it to the list.
Validate that the new task appears in the task list.
Validate that the number of tasks in the list is exactly one.
Mark the task as completed by clicking on it.
Validate item is marked as completed.
Click on the button to remove the item you have added.
Remove the completed task by clicking the designated removal button.
Validate that the task list is empty, displaying the message “No tasks found!”.
*/

const todo = [
    'to do shopping',
    'cook food', 
    'study cypress', 
    'study playwright', 
    'send email'
]

    test('Test Case 02', async ({page}) => {
        // 2
        const inputTodo = page.locator('#input-add')
        await inputTodo.fill(todo[0])
        await page.keyboard.press('Enter')
        // or
        const buttonAdd = page.locator('#add-btn')
        await buttonAdd.click()
        // 3
        const listTodo = page.locator('#panel')
        const taskList = listTodo.locator('.panel-block.todo-item')
        await expect(taskList).toBeVisible()
        // 4
        await expect(taskList).toHaveCount(1)
        // 5
        const elTaskList = taskList.locator('.mr-auto')
        await elTaskList.click()
        // 6
        const markTaskList = elTaskList.locator('.has-text-success')
        await expect(markTaskList).toBeVisible()
        // or
        const markTaskList1 = listTodo.locator('.mr-auto > span').first()
        await expect(markTaskList1).toHaveClass(/.has-text-success/)
        // 7
        const buttonDelete = listTodo.locator('.destroy')
        await buttonDelete.click()
        // 8
        await expect(listTodo).not.toBeAttached()
        const messageTodo = page.locator('.panel-block.todo-item > p')
        await expect(messageTodo).toHaveText('No tasks found!')
    })
/*
Navigate to https://techglobal-training.com/frontend/project-6
Enter and add 5 to-do items individually.
Validate that all added items match the items displayed on the list.
Mark all the tasks as completed by clicking on them.
Click on the “Remove completed tasks!” button to clear them.
Validate that the task list is empty, displaying the message “No tasks found!”.
*/
    test('Test Case 03', async ({page}) => {
        // 2
        const inputTodo = page.locator('#input-add')
        const buttonAdd = page.locator('#add-btn')
        for (const task of todo) {
            await inputTodo.fill(task)
            await buttonAdd.click()
        }
        // 3
        const listTodo = page.locator('#panel')
        const taskList = listTodo.locator('.panel-block.todo-item')
        await expect(taskList).toHaveCount(todo.length)
        // 4
        const elTaskList = taskList.locator('.mr-auto')
        const elTaskListAll = await elTaskList.all()
        for(const elTaskList of elTaskListAll) {
        await elTaskList.click()
        }
        // 5 
        const buttonClear = page.locator('#clear')
        await buttonClear.click()
        // 6
        await expect(listTodo).not.toBeAttached()
        const messageTodo = page.locator('.panel-block.todo-item > p')
        await expect(messageTodo).toHaveText('No tasks found!')
    })
/*
Navigate to https://techglobal-training.com/frontend/project-6
Enter and add 5 to-do items individually.
Validate that all added items match the items displayed on the list.
Enter the complete name of the previously added to-do item into the search bar.
Validate that the list is now filtered to show only the item you searched for.
Validate that the number of tasks visible in the list is exactly one.
*/
    test('Test Case 04', async ({page}) => {
        // 2
        const inputTodo = page.locator('#input-add')
        const buttonAdd = page.locator('#add-btn')
        for (const task of todo) {
            await inputTodo.fill(task)
            await buttonAdd.click()
        }
        // 3
        const listTodo = page.locator('#panel')
        const taskList = listTodo.locator('.panel-block.todo-item')
        await expect(taskList).toHaveCount(todo.length)
        // 4
        // Random index todo list
        const  randomIndex = Math.floor(Math.random() * todo.length)
        const searchTodo = page.locator('#search')
        await searchTodo.fill(todo[randomIndex])
        // 5
        await expect(taskList).toBeVisible()
        await expect(taskList).toContainText(todo[randomIndex])
        //6
        await expect(taskList).toHaveCount(1)
    })
/*
Navigate to https://techglobal-training.com/frontend/project-6
Attempt to add an empty task to the to-do list.
Validate that the task list is empty, displaying the message “No task found!”.
Enter an item name exceeding 30 characters into the list.
Validate error message appears and says “Error: Todo cannot be more than 30 characters!”.
Add a valid item name to the list.
Validate that the active task count is exactly one.
Try to enter an item with the same name already present on the list.
Validate that an error message is displayed, indicating “Error: You already have {ITEM} in your todo list.”.
*/
    test('Test Case 05', async ({page}) => {
        // 2
        const inputTodo = page.locator('#input-add')
        await inputTodo.fill('')
        await page.keyboard.press('Enter')
        // 3
        const listTodo = page.locator('#panel')
        await expect(listTodo).not.toBeAttached()
        const messageTodo = page.locator('.panel-block.todo-item > p')
        await expect(messageTodo).toHaveText('No tasks found!')
        // 4
        const str = '1q2w3e4r5t6y7u8i9o0p1z2x3c4v5b6n7m'
        await inputTodo.fill(str)
        await page.keyboard.press('Enter')
        // 5
        const errorMessage = page.locator('.notification')
        await expect(errorMessage).toHaveText('Error: Todo cannot be more than 30 characters!')
        // 6
        await inputTodo.fill(todo[0])
        await page.keyboard.press('Enter')
        // 7
        const taskList = listTodo.locator('.panel-block.todo-item')
        await expect(taskList).toBeVisible()
        await expect(taskList).toHaveCount(1)
        // 8
        await inputTodo.fill(todo[0])
        await page.keyboard.press('Enter')
        // 9
        await expect(errorMessage).toHaveText(`Error: You already have ${todo[0]} in your todo list.`)
    })
})