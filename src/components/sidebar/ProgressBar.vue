<template>
  <div class="q-mx-md">
    <p class="is-size-6">Tagging Progress ({{ completed }}/{{ total }})</p>
    <q-linear-progress size="md" color="primary" :value="completed / total" />
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    completed: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  computed: {
    completedPercent() {
      return parseInt((this.completed / this.total) * 100);
    },
  },
};
</script>
