<template>
  <div class="flex flex-col justify-center items-center container">
    <!-- <div class="flex">
      <Button @click="currentStep = 'registerAddress'">
        Step1
      </Button>
      <Button @click="currentStep = 'InviteLandlord'">
        Step2
      </Button>
    </div> -->
    <div class="slide-container">
      <Transition
        name="slide-in"
      >
        <RentalRegister
          v-if="currentStep === 'registerAddress'"
          key="registerAddress"
          :is-land-lord="true"
          class="absolute"
          @submit="onAddressRegisterDone"
        />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentStep = ref<"registerAddress" | "InviteLandlord">("registerAddress");

const fromData = ref({
  name: "",
  address: "",
  isLandLord: false,
  isNewData: false,
});

const onAddressRegisterDone = (payload: { name: string; address: string; isLandLord: boolean; isNewData: boolean }) => {
  fromData.value = {
    ...fromData.value,
    ...payload,
  };
  navigateTo("/landlord/");
};
</script>

<style scoped>
.slide-container{
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.25s ease-out;
}

.slide-in-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-in-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

</style>
