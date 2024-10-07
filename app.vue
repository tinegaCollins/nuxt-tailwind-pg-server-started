<template>
  <section class="">
    <NuxtPage />
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
  </section>
</template>
