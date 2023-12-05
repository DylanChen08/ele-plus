<script setup>
import TableV2 from "./components/TableV2.vue";
import DynamicForm from "./components/dynamic-form.vue";
</script>

<template>
    <section class="app-container">
<!--      <TableV2></TableV2>-->

      <dynamic-form form-config="[]"></dynamic-form>
    </section>
</template>

<style lang="scss" scoped>
.app-container{
 width: 100%;
  height: 100%;
  //border: 1px solid red;
}
</style>
