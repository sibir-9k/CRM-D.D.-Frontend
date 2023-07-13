<template>
  <div class="create-task">
    <h1 class="create-task__title">Редактирование задачи</h1>
    <hr />
    <FormTask
      :model="editTaskObj"
      :projectsArray="projectsArray"
      :executorsArray="executorsArray"
    ></FormTask>
    <hr />
    <div class="btn-block">
      <Button btnClassName="btn-cancel" btnName="Отмена"></Button>
      <Button btnClassName="btn-create" btnName="Создать задачу"></Button>
    </div>
  </div>
</template>

<script>
import Button from "@/UI/Button/Button.vue";
import FormTask from "@/UI/Forms/FormTask/FormTask.vue";
export default {
  name: "EditTask",
  components: { FormTask, Button },
  data() {
    return {
      editTaskObj: {
        name: "Название проекта какого то",
        description: "Описание проекта",
        project: "",
        executor: "",
      },
      projectsArray: [
        { value: "Проект 1", optionText: "Проект 1" },
        { value: "Проект 2", optionText: "Проект 2" },
        { value: "Проект 3", optionText: "Проект 3" },
        { value: "Проект 4", optionText: "Проект 4" },
      ],
      executorsArray: [
        { value: "Иванов И.И.", optionText: "Иванов И.И." },
        { value: "Петров П.П.", optionText: "Петров П.П." },
        { value: "Фёдоров В.А.", optionText: "Фёдоров В.А." },
        { value: "Алексеев Ю.Н.", optionText: "Алексеев Ю.Н." },
      ],
    };
  },
};
</script>

<style></style>
