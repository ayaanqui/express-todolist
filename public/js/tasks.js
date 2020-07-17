const url = 'http://localhost:3000/tasks';

const toggleCompleteTask = (obj, taskId) => {
  if ($(obj).is(":checked")) {
    // Checked
    $.ajax({
      url: `${url}/${taskId}/?completed=true`,
      success: res => {
        $(`#task_content_${taskId}`).addClass('strike-through');
      }
    });
  } else {
    // Not checked
    $.ajax({
      url: `${url}/${taskId}/?completed=false`,
      success: res => {
        $(`#task_content_${taskId}`).removeClass('strike-through');
      }
    });
  }
};

const taskView = task => {
  return `
    <li class="list-group-item" id="task_${task.id}">
      <div class="d-flex justify-content-between">
        <div class="custom-control custom-checkbox">
          <input class="custom-control-input" id="checkbox_${task.id}" type="checkbox" onchange="toggleCompleteTask(this, ${task.id})">
          <label class="custom-control-label" for="checkbox_${task.id}"></label>
        </div>
        <div class="task-content flex-fill" id="task_content_${task.id}">
          <span>${task.task}</span>
        </div>
        <div class="task-options">
          <a class="close" href="#" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Delete task permanently">
            <span aria-hidden="true">×</span>
          </a>
        </div>
      </div>
    </li>
  `
};

$("#add-task").submit(event => {
  const taskElem = $("#task-input");
  const taskInputVal = taskElem.val().replace(/^\s+|\s+$/g, "");

  if (taskInputVal.length != 0) {
    $.post(
      `${url}/add-task`,
      $("#add-task").serialize(),
      data => {
        taskElem.val('');
        $('#tasks-display-list').prepend(taskView(data));
      });
  }
  event.preventDefault();
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})