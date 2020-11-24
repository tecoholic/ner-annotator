<template>
  <div class="my-2">
    <p class="is-size-6"><strong>Tagging Progress</strong></p>
    <p class="is-size-7 has-text-right">Completed {{ completed }}/{{ total }}</p>

    <progress class="progress is-small is-primary" :value="completed" :max="total">
      {{ completedPercent }}%
    </progress>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    completed: {
      type: Number,
      required: true,
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
