<template>
  <div>
  <h1>RPL Management Pannel</h1>
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
            <td><input type="text" id="decision" required v-model="request.decision"></td>
            <td><button @click="decide(request.id,request.decision)">decision</button></td>
          </tr>
    </table>
    
  </div>
</div>
</template>


<script>
export default {
  name: "RPLManagement",
  data() {
    return {
      request:{
        decision:""
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
    decide(id,body){
      fetch(`http://localhost:3000/api/rplrequests/${id}`,{
        method:'PUT',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(body)
      })
          .then((response) => response.json())
          .then((data) => (this.rplrequests = data))
          .catch((err) => console.log(err.message));
    }
  },
  mounted() {
    this.fetchRecords();
    console.log("mounted");
  } 
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
.container {
  background: #d5d7d8;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  margin-top: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 80%;
  border-radius: 20px;
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