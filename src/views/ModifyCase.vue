<template>
  <!--Show case list with operation buttons-->
  <case-list
    v-if="modifyCase == null"
    :cases="cases"
    :on-delete="onDelete"
    :on-modify="onModify"
  >
  </case-list>
  <!-- show case modify form -->
  <case-form
    v-if="modifyCase != null"
    :data="modifyCase"
    :on-cancel="onCancelModify"
    :on-submit="onModifySubmit"
    :title="'Modify case: ID ' + modifyCase.case_id"
    submit-title="Modify Case"
  >
  </case-form>
  <!-- delete confirm dialog -->
  <base-dialog v-if="deleteCase != null" title="Delete case" @close="closeDeleteConfirm">
    <template #default>
      <p>Are you sure to delete case: ID {{ deleteCase.case_id }}?</p>
    </template>
    <template #actions>
      <base-button @click="confirmDelete">Ok</base-button>
      <base-button @click="closeDeleteConfirm">Cancel</base-button>
    </template>
  </base-dialog>
</template>

<script>
import CaseList from '@/components/confirmed-case/CaseList';
import { deleteById, getAll, modify } from '@/api/case';
import CaseForm from '@/components/confirmed-case/CaseForm';

export default {
  data() {
    return {
      cases: null,
      modifyCase: null,
      deleteCase: null
    };
  },

  mounted: function() {
    this.loadCases();
  },

  methods: {
    loadCases() {
      getAll().then(data => {
        this.cases = data;
      }).catch(reason => {
        alert(reason);
      });
    },

    onModify(data) {
      this.modifyCase = data;
    },

    onModifySubmit(data) {
      modify(data).then(() => {
        this.loadCases(); // update data
      }).catch(reason => {
        alert(reason);
      });
      this.modifyCase = null;
    },

    onCancelModify() {
      this.modifyCase = null;
    },

    onDelete(data) {
      this.deleteCase = data;
    },

    confirmDelete() {
      console.log('confirmDelete', this.deleteCase);
      deleteById(this.deleteCase.id).then(() => {
        this.loadCases(); // update data
      }).catch(reason => {
        alert(reason);
      });
      this.deleteCase = null;
    },

    closeDeleteConfirm() {
      this.deleteCase = null;
    }
  },

  components: { CaseForm, CaseList }
};
</script>

<style>
</style>
