const url = 'http://localhost:3000/tasks';

const toggleCompleteTask = (obj, taskId) => {
  if ($(obj).is(":checked")) {
    // Checked
    $.ajax({
      url: `${url}/${taskId}/?completed=true`,
      success: res => {
        $(`#task_content_${taskId}`).addClass('strike-through');
        $(`#task_${taskId}`).addClass('list-group-item-light');
      }
    });
  } else {
    // Not checked
    $.ajax({
      url: `${url}/${taskId}/?completed=false`,
      success: res => {
        $(`#task_content_${taskId}`).removeClass('strike-through');
        $(`#task_${taskId}`).removeClass('list-group-item-light');
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
        <div class="task-content flex-fill">
          <div id="task_content_${task.id}" onkeyup="editTask(${task.id})" contenteditable="true">${task.task}</div>
          <div class="small text-muted mt-sm-2">${task.createdAt}</div>
        </div>
        <div class="task-options">
          <button class="close btn btn-small" onclick="deleteTask(${task.id})" title="Delete task permanently">
            <span aria-hidden="true">×</span>
          </button>
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
        $('#no-tasks').hide();
      });
  }
  event.preventDefault();
});

const deleteTask = taskId => {
  console.log('Task delete button clicked!!');
  $.ajax({
    url: `${url}/${taskId}`,
    type: 'DELETE',
    success: data => {
      $(`#task_${taskId}`).remove();
    }
  });
};

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

const editTask = taskId => {
  const taskContentElem = $(`#task_content_${taskId}`);
  const taskVal = taskContentElem.text();
  $.ajax({
    url: `${url}/${taskId}/edit`,
    type: 'PUT',
    data: { task: taskVal },
    success: data => { }
  });
};