<template>
  <article class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md">

    <!-- Lock Badge oben rechts -->
    <div class="mb-3 flex justify-end">
      <span
        class="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2. 5 py-1 text-xs font-medium text-neutral-600">
        🔒 Gesperrt
      </span>
    </div>

    <!-- Fake Job Content -->
    <div class="mb-4 space-y-2. 5 opacity-20">
      <div class="h-5 w-3/4 rounded bg-neutral-300"></div>
      <div class="h-4 w-1/2 rounded bg-neutral-200"></div>

      <div class="flex gap-2 pt-2">
        <div class="h-6 w-14 rounded-full bg-neutral-200"></div>
        <div class="h-6 w-16 rounded-full bg-neutral-200"></div>
      </div>
    </div>

    <!-- Message -->
    <p class="mb-3 text-center text-sm text-neutral-600">
      Melde dich an, um diesen Job zu sehen
    </p>

    <!-- Single CTA -->
    <div class="grid justify-center gap-3 md:grid-cols-2">
      <RouterLink to="/login" class="btn btn-primary">
        Jetzt anmelden
      </RouterLink>
      <RouterLink to="/register" class="btn btn-secondary">
        Jetzt registrieren
      </RouterLink>
    </div>
  </article>
</template>