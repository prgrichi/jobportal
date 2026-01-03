<template>
  <div class="lg:col-span-7">
    <h1 class="text-3xl font-bold tracking-tight text-foreground">
      {{ job.title }}
    </h1>

    <p class="mt-2 text-sm text-muted-foreground">
      {{ job.company }} · {{ job.location }}
    </p>

    <p class="mt-4 text-base text-muted-foreground">
      {{ job.shortDescription }}
    </p>

    <div class="mt-5 flex flex-wrap gap-2">
      <span v-for="tag in job.tags" :key="tag"
        class="rounded-full bg-background px-3 py-1 text-xs text-muted-foreground ring-1 ring-ring">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobDetailHero',

  props: {
    job: {
      type: Object,
      required: true
    }
  }
}
</script>