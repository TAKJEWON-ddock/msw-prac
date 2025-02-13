<template>
  <div class="signup-container">
    <a-form
      :model="formState"
      name="signup"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <p class="title">로그인</p>
      <a-form-item
        name="id"
        :rules="[{ required: true, message: '아이디를 입력해주세요' }]"
      >
        <FormInput
          title="아이디"
          placeholder="아이디 입력 (6-20자)"
          v-model="formState.id"
        ></FormInput>
      </a-form-item>

      <a-form-item
        name="password"
        :rules="[
          { required: true, message: '비밀번호를 입력해주세요' },
          { max: 20, min: 8, message: '8~20자 이내의 비밀번호를 입력해주세요' },
        ]"
      >
        <FormInput
          title="비밀번호"
          isPassword
          placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
          v-model="formState.password"
        ></FormInput>
      </a-form-item>

      <a-form-item class="confirm-buttons">
        <a-button
          style="margin-right: 10px"
          type="primary"
          html-type="submit"
          :loading="loading"
          >로그인</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Modal } from "ant-design-vue";
import FormInput from "../components/signup/FormInput.vue";
import { signIn } from "../services/fetchers";
import router from "../router";

interface FormState {
  id: string;
  password: string;
}

const formState = ref<FormState>({
  id: "",
  password: "",
});

const loading = ref<boolean>(false);

const onFinish = async (values: FormState) => {
  try {
    loading.value = true;
    const result = await signIn(values);
    if (result.status == 200) {
      Modal.success({
        title: "로그인 성공",
        content: "로그인에 성공하셨습니다.",
        okText: "네",
        onOk() {
          router.push("home");
        },
      });
    }
  } catch (error) {
    console.error("Sign up failed:", error);
    Modal.error({
      title: "로그인 실패",
      content: "로그인에 실패하셨습니다.",
      okText: "네",
      onOk() {},
    });
  } finally {
    loading.value = false;
  }
};

const onFinishFailed = (errorInfo: FormState) => {};

onMounted(() => {});
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 20px;
  background-color: #f9f9f9;
}

.ant-form {
  width: 100%;
  max-width: 550px;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  padding: 40px 50px;
  background-color: #fff;
}

.signup-container .title {
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 50px;
}

.signup-container .confirm-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
.signup-container .confirm-buttons button {
  width: 125px;
}

.signup-container .input-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 3px 0;
}

.signup-container .ant-form-item {
  margin-bottom: 15px;
  position: relative;
}

.signup-container .ant-picker {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
