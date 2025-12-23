import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from '@/firebase';

export default {
  data() {
    return {
      jobs: [],
      singleJob: null,
      isLoading: false,
      error: null
    };
  },
  methods: {
    async fetchJobs(options = {}) {
      this.isLoading = true;
      this.error = null;

      try {
        const jobsRef = collection(db, 'jobs');
        const queryParams = [jobsRef];

        if (options.orderBy) {
          queryParams.push(orderBy(options.orderBy.field, options.orderBy.direction));
        }
        if (options.limit) {
          queryParams.push(limit(options.limit));
        }

        const q = queryParams.length > 1 ? query(...queryParams) : jobsRef;
        const querySnapshot = await getDocs(q);
        this.jobs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (err) {
        console.error('Fehler beim Laden der Jobs:', err);
        this.error = 'Jobs konnten nicht geladen werden. ';
      } finally {
        this.isLoading = false;
      }
    },

    async fetchJobById(jobId) {
      this.isLoading = true;
      this.error = null;
      console.log('🔍 Suche Job mit ID:', jobId);

      try {
        const jobsRef = collection(db, 'jobs');
        const q = query(jobsRef, where('id', '==', jobId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const jobDoc = querySnapshot.docs[0];
          const jobData = {
            id: jobDoc.id,
            ...jobDoc.data()
          };
          console.log('✅ Job gefunden:', jobData);
          this.singleJob = jobData;
        } else {
          console.log('❌ Kein Job mit id-Feld:', jobId);
          this.error = 'Job nicht gefunden';
          return null;
        }
      } catch (err) {
        console.error('💥 Fehler:', err);
        this.error = 'Fehler beim Laden';
        return null;
      } finally {
        this.isLoading = false;
      }

    }

  }
};