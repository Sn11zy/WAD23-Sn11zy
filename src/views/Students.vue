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
  <h3 @click="show()">Submit an RPL request</h3>
    <form id="rplreq">
      <div class="container">
      <div class="formfield">
      <label>Student code</label>
      <input type="text" name="studentcode" id="studentcode">
      </div>
      <div class="formfield">
      <label>Course name</label>
      <input type="text" name="coursename" id="coursename">
      </div>
      <div class="formfield">
      <label>UT Course name</label>
      <input type="text" name="utcoursename" id="utcoursename">
      </div>
      <div class="formfield">
      <label>Course code</label>
      <input type="text" name="coursecode" id="coursecode">
      </div>
      <div class="formfield">
      <label>UT Course code</label>
      <input type="text" name="utcoursecode" id="utcoursecode">
      </div>
      <div class="formfield">
      <label>Course ETCS</label>
      <input type="text" name="courseects" id="courseects">
      </div>
      <div class="formfield">
      <label>UT Course ETCS</label>
      <input type="text" name="utcourseects" id="utcourseects">
      </div>
      </div>
      <button @click="submitform()">Submit an RPL request</button>
    </form>
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
    submitform() {
      var body = {
        studentcode: document.getElementById("studentcode").value,
        coursename: document.getElementById("coursename").value,
        utcoursename: document.getElementById("utcoursename").value,
        coursecode: document.getElementById("coursecode").value,
        utcoursecode: document.getElementById("utcoursecode").value,
        courseects: document.getElementById("courseects").value,
        utcourseects: document.getElementById("utcourseects").value,
      }
      fetch(`http://localhost:3000/api/rplrequests`,{
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(body)
      })
          .then((response) => response.json())
          .then((data) => (this.rplrequests = data))
          .catch((err) => console.log(err.message));
    },
    show(){
      var form = document.getElementById("rplreq")
      console.log(form.getAttribute("visibility"))
      if (form.style.visibility=='hidden'){
        form.style.visibility = 'visible'
      } else {
        form.style.visibility='hidden'
      }
    }
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
#rplreq{
  display: flex;
  flex-direction: column;
  visibility: hidden;
}
th {
  background-color: darkgreen;
  padding: 10px 20px;
}
td {
  background-color: palegreen;
  padding: 10px 20px;
}
.formfield {
  display: flex;
  margin: 2px 2px;
  flex-direction: column;
}
label{
  background-color: darkgreen;
  padding: 10px 20px;
  margin-bottom: 2px;
}
button{
  margin-top: 10px;
  margin-left: 40%;
  margin-right: 40%;
}
input {
  background-size: 20px 20px;
}
</style>
