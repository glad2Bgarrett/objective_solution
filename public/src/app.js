window.addEventListener('load', function(){
  let vm = new Vue({
    el: '#app',
    data: function(){
      return {
        applicants: null,
        totalApplicants: 0,
        totalUniqueSkills: 0,
        jobs: null,
        skills: null,
        jobShown: 0
      };
    },
    methods: {
      jobListed(jobId){
        if (jobId != this.jobShown){
          this.jobShown = jobId;
          return false;
        } else {
          return true;
        }
      },
      getJobName(jobId){
        let name = "";
        this.jobs.forEach(function(job){
          if (job.id == jobId) name = job.name;
        });
        return name;
      },
      getNumApplicants(jobId){
        let applicants = 0;
        let self = this;
        self.applicants.forEach(function(applicant){
          if (applicant.job_id == jobId) applicants++;
        });
        return applicants;
      },
      getSkillCount(applicant){
        let skillCount = 0;
        this.skills.forEach(function(skill){
          if (skill.applicant_id == applicant) skillCount++;
        });
        return skillCount;
      },
      getSkills(applicant){
        let applicant_skills = [];
        this.skills.forEach(function(skill){
          if (skill.applicant_id == applicant) applicant_skills.push(skill);
        });
        return applicant_skills;
      }
    },
    created: function(){
      let self = this;
      axios.get('/data')
      .then(function(res){
        self.applicants = res.data.applicants;
        self.jobs = res.data.jobs;
        self.skills = res.data.skills;
        self.totalApplicants = self.applicants.length;
        let unique = [];
        self.skills.forEach(function(skill){
          if (unique.indexOf(skill.name) == -1) unique.push(skill.name);
        });
        self.totalUniqueSkills = unique.length;
      });
    }
  });
});
