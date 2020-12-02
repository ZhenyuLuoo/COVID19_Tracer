<template>
  <base-dialog v-if="inputIsInvalid" title="Invalid Input" @close="confirmError">
    <template #default>
      <p>Unfortunately, at least one input value is invalid.</p>
      <p>Please check your input the make sure you enter at least a few characters into each input field.</p>
    </template>
    <template #actions>
      <base-button @click="confirmError">Ok</base-button>
    </template>
  </base-dialog>
  <base-card>
    <h1 v-if="title !== undefined">{{ title }}</h1>
    <form @submit.prevent="submitData">
      <div class="form-control">
        <label for="name">Name</label>
        <input id="name" v-model="form.name" name="name" type="text">
      </div>
      <div class="form-control">
        <label for="age">Age</label>
        <input id="age" v-model="form.age" name="age" type="text">
      </div>
      <div class="form-control">
        <label for="gender">Gender</label>
        <input id="gender" v-model="form.gender" name="gender" type="text">
      </div>
      <div class="form-control">
        <label for="description">Description</label>
        <textarea id="description" v-model="form.description" name="description" rows="3"></textarea>
      </div>
      <div class="form-control">
        <label for="date">Date</label>
        <input id="date" v-model="form.date" name="date" type="date">
      </div>
      <div>
        <base-button type="submit">{{ submitTitle }}</base-button>
        <base-button v-if="onCancel !== undefined" type="button" @click="onCancel">Cancel</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  name: 'case-form',

  props: ['onSubmit', 'submitTitle', 'title', 'data', 'onCancel'],

  data() {
    return {
      inputIsInvalid: false,
      form: this.data === undefined ?
        {
          case_id: '',
          name: '',
          age: '',
          gender: '',
          description: '',
          date: ''
        } : this.data
    };
  },

  methods: {
    submitData() {
      // check input
      if (this.form.name.trim() === '' ||
        this.form.age.trim() === '' ||
        this.form.gender.trim() === '' ||
        this.form.description.trim() === '' ||
        this.form.date.trim() === '') {
        this.inputIsInvalid = true;
        return;
      }
      // run callback
      this.onSubmit(this.form);
    },

    confirmError() {
      this.inputIsInvalid = false;
    },

    clear() {
      this.form = {
        case_id: '',
        name: '',
        age: '',
        gender: '',
        description: '',
        date: ''
      };
    }
  }
};
</script>

<style scoped>
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}
</style>
