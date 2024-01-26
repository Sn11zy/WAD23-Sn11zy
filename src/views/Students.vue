<template>
<div>
<h3>RPL request</h3>

<div class="container">
    <table>
          <tr>
            <th>St. Code</th>
            <th>Course name</th>
            <th>UT Course code</th>
            <th>Course ECTS</th>
            <th>UT Course code</th>
            <th>UT Course name</th>
            <th>UT Course ECTS</th>
            <th>Decision</th>
          </tr>
      <tr v-for="request in rplrequests" :key="request.id" >
        <td>{{request.studentcode}}</td>
        <td>{{request.coursename}}</td>
        <td>{{request.coursecode}}</td>
        <td>{{request.courseects}}</td>
        <td>{{request.utcoursecode}}</td>
        <td>{{request.utcoursename}}</td>
        <td>{{request.utcourseects}}</td>
        <td v-if="request.decision==''">Under proccessing</td>
        <td v-if="request.decision!=''">{{request.decision}}</td>
      </tr>
    </table>
  </div>
  <h3>Submit an RPL request</h3>
  <div class="container">
    <form>
      <label>Student code</label>
      <input type="text">
      <label>Course name</label>
      <input type="text">
      <label>UT Course name</label>
      <input type="text">
      <label>Course code</label>
      <input type="text">
      <label>UT Course code</label>
      <input type="text">
      <label>Course ETCS</label>
      <input type="text">
      <label>UT Course ETCS</label>
      <input type="text">
    </form>
  </div>
  <button>Submit an RPL request</button>
  </div>
</template>



<script>
export default {
  name: "Students",
  data() {
    return {
      request:{

      },
      rplrequests: [],
    };
  },
  methods: {
    fetchRecords() {
      fetch(`http://localhost:3000/api/rplrequests`)
        .then((response) => response.json())
        .then((data) => (this.rplrequests = data))
        .catch((err) => console.log(err.message));
  },
  },
  mounted() {
    this.fetchRecords();
    console.log("mounted");
  } 
};
</script>

<style scoped>
h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}
.container {
  background: #d5d7d8;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 90%;
  display: flex;
  justify-content: center;
}
th {
  background-color: darkgreen;
  padding: 10px 20px;
}
td {
  background-color: palegreen;
  padding: 10px 20px;
}
</style>
