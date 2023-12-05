<!-- DynamicForm.vue -->
<template>
  <el-form
      ref="formRef"
      :model="dynamicValidateForm"
      label-width="120px"
      :inline="true"
      class="demo-dynamic"
  >
    <el-form-item
        v-for="(item, index) in dynamicValidateForm"
        :key="index"
        :label="'Domain' + index"
    >
      <el-form-item
          :label="'Name'"
          :prop="'dynamicValidateForm.' + index + '.name'"
          :rules="nameRules"
      >
        <el-input v-model="item.name" />
      </el-form-item>
      <el-form-item
          :label="'Phone'"
          :prop="'dynamicValidateForm.' + index + '.phone'"
          :rules="phoneRules"
      >
        <el-input v-model="item.phone" />
      </el-form-item>
      <el-form-item
          :label="'Address'"
          :prop="'dynamicValidateForm.' + index + '.addr'"
          :rules="addrRules"
      >
        <el-input v-model="item.addr" />
      </el-form-item>
      <el-button
          class="mt-2"
          @click.prevent="moveRowUp(index)"
          :disabled="index === 0"
      >Move Up</el-button
      >
      <el-button
          class="mt-2"
          @click.prevent="moveRowDown(index)"
          :disabled="index === dynamicValidateForm.length - 1"
      >Move Down</el-button
      >
      <el-button class="mt-2" @click.prevent="removeDomain(index)"
      >Delete</el-button
      >
    </el-form-item>
    <div>
      <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
      <el-button @click="addThreeDomains">New domains</el-button>
      <el-button @click="resetForm(formRef)">Reset</el-button>
    </div>
  </el-form>
</template>

<script setup>
import { ref } from "vue";

const formRef = ref();
const nameRules = {
  required: true,
  message: "Name can not be null",
  trigger: "blur",
};
const phoneRules = {
  required: true,
  message: "Phone can not be null",
  trigger: "blur",
};
const addrRules = {
  required: true,
  message: "Address can not be null",
  trigger: "blur",
};

const dynamicValidateForm = ref([
  {
    key: 1,
    name: "",
    phone: "",
    addr: "",
  },
]);

const removeDomain = (index) => {
  dynamicValidateForm.value.splice(index, 1);
};

const moveRowUp = (index) => {
  if (index > 0) {
    const temp = dynamicValidateForm.value[index];
    dynamicValidateForm.value.splice(index, 1);
    dynamicValidateForm.value.splice(index - 1, 0, temp);
  }
};

const moveRowDown = (index) => {
  if (index < dynamicValidateForm.value.length - 1) {
    const temp = dynamicValidateForm.value[index];
    dynamicValidateForm.value.splice(index, 1);
    dynamicValidateForm.value.splice(index + 1, 0, temp);
  }
};

const addThreeDomains = () => {
  dynamicValidateForm.value.push({
    key: Date.now(),
    name: "",
    phone: "",
    addr: "",
  });
};

const submitForm = () => {
  // Your form submission logic here
};

const resetForm = () => {
  // Your form reset logic here
};
</script>
