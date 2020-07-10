const url = 'http://localhost:3000/tasks';

const toggleCompleteTask = (obj, taskId) => {
  if ($(obj).is(":checked")) {
    // Checked
    $.ajax({
      url: `${url}/${taskId}/?completed=true`,
      success: res => {
        $(`#task_${taskId}`).addClass('strike-through');
      }
    });
  } else {
    // Not checked
    $.ajax({
      url: `${url}/${taskId}/?completed=false`,
      success: res => {
        $(`#task_${taskId}`).removeClass('strike-through');
      }
    });
  }
};

const taskView = task => {
  return `
    <li class="list-group-item" id="task_${task.id}">
      <div class="custom-control custom-checkbox">
        <input class="custom-control-input" id="checkbox_${task.id}" type="checkbox" onchange="toggleCompleteTask(this, ${task.id})">
        <label class="custom-control-label" for="checkbox_${task.id}"></label>
        <span>${task.task}</span>
      </div>
    </li>
  `
};

$("#add-task").submit(event => {
  $.post(
    `${url}/add-task`,
    $("#add-task").serialize(),
    data => {
      $('#tasks-display-list').prepend(taskView(data));
    });
  event.preventDefault();
});