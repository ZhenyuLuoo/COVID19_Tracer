<template>
  <case-form
    ref="caseForm"
    :on-submit="onSubmit"
    submit-title="Add Case"
  >
  </case-form>
  <!-- success dialog -->
  <base-dialog v-if="success" title="Success" @close="closePopup">
    <template #default>
      <p>Case added successfully!</p>
    </template>
    <template #actions>
      <base-button @click="closePopup">Ok</base-button>
    </template>
  </base-dialog>
</template>

<script>
import CaseForm from '@/components/confirmed-case/CaseForm';
import { create } from '@/api/case';

export default {
  data() {
    return {
      success: false
    };
  },

  methods: {
    onSubmit(data) {
      create(data).then(() => {
        this.success = true;
        this.$refs.caseForm.clear();
      }).catch(reason => {
        alert(reason);
      });
    },

    closePopup() {
      this.success = false;
    }
  },

  components: { CaseForm }
};
</script>

<style scoped>
</style>
