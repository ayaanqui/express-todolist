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