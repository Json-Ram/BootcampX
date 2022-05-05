const { Pool } = require('pg');


const pool = new Pool ({
  user: 'vagrant',
  password: '',
  host: 'localhost',
  database: 'bootcampx'
});
const argv = process.argv.slice(2)
console.log(argv)
pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE '%${argv[0]}%'
ORDER BY student_id
LIMIT ${argv[1]};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
});
