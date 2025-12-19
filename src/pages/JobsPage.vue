<template>
  <section class="py-12">
    <div class="max-w-app mx-auto px-4">
      <h1 class="text-2xl font-semibold text-neutral-900">Übersicht</h1>

      <Jobs :jobs="jobs" :isLoading="isLoading"></Jobs>

    </div>
  </section>
</template>

<script>
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Jobs from '@/components/jobs/Jobs.vue';

export default {
  name: 'JobsPage',
  components: {
    Jobs
  },
  data() {
    return {
      jobs: [],
      isLoading: true
    }
  },
  mounted() {
    this.fetchJobs();
  },
  methods: {
    async fetchJobs() {
      try {
        const querySnapshot = await getDocs(collection(db, 'jobs'));
        this.jobs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        this.isLoading = false;
      }
      catch (err) {
        console.log(err);
      }
      finally {
        console.log(this.jobs);
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped></style>




<!-- 

jobspage
jobscomponent für alle jobs
singlejob component für einen job

jobdetailseite mit id und router und so
darin dann alle jobdetails (inhaltlich) und
eine component mit apply form oder so 

-->