import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa';


    var semGPA = [] //semGPA = semesters
    var semGPA2 = [] //semGPA2 = semesters, grade, creds, gpa
    var semGPA3 = [] //semGPA3 = gpa

function GPATable({ data, setDataItems, subjectData }) {

    const [dataRows, setDataRows] = useState();
    const [totalGPA, setTotalGPA] = useState(0);

    const styles = {
      textCenter: {textAlign: 'center'},
      textRight: {textAlign: 'right'},
      textLeft: {textAlign: 'left'}
    }

    useEffect(() => {

      let gpa = 0
      let currGrade = 0
      let cred = 0
      let totalCred = 0

      const z = data.map((v, i) => {

        if (v.grade === "A") {
          currGrade = "4.00"
        } else if (v.grade === "A-") {
          currGrade = "3.75"
        } else if (v.grade === "B+") {
          currGrade = "3.25"
        } else if (v.grade === "B") {
          currGrade = "3.00"
        } else if (v.grade === "B-") {
          currGrade = "2.75"
        } else if (v.grade === "C+") {
          currGrade = "2.25"
        } else if (v.grade === "C") {
          currGrade = "2.00"
        } else if (v.grade === "C-") {
          currGrade = "1.75"
        } else if (v.grade === "D") {
          currGrade = "1.00"
        } else if (v.grade === "F") {
          currGrade = "0.00"
        } else if (v.grade === "-") {
          currGrade = "0.00"
        }

        // Get credits and total credits
        subjectData.forEach((e) => {
          if (v.grade !== "-" && e[0] === v.course) {
            cred = e[2]
            totalCred += Number(cred)
          }
        })

        gpa += Number(currGrade) * Number(cred) 

        let sem = "" + v.term + "/" + v.year
        let existInArr = semGPA.indexOf(sem) > -1
        let semChanged = false

        //If new semester will push
        if (existInArr === false) {
          semGPA.push(sem)
          semChanged = true
        }

        if (semChanged === true) {
          semGPA2.push([sem, 0, 0, 0, 0]) //sem,g,cr,sum,gpa
          semGPA3.push([sem, 0]) //sem,gpa
        }

        //Calculate each semester's grade, creds, gpa
        let currGPA = 0
        semGPA2.forEach((s) => {
          if (s[0] === sem) {
            s[1] += Number(currGrade)
            s[2] += Number(cred)
            s[3] += Number(currGrade) * Number(cred)
            s[4] = s[3] / s[2]
            currGPA = s[4]
          }

        })

        semGPA3.forEach((sg) => {
          if (sg[0] === sem) {
            sg[1] = currGPA
          }
        })

        
        return (
          <tr key={i}>
            <td><FaTrash onClick={() => deleteClick(i)}/></td>
            <td style={styles.textleft}>{v.term}{"/"}{v.year}</td>
            <td style={styles.textleft}>{v.course}</td>
            <td style={styles.textLeft}>{v.grade}</td>
          </tr>
        );
      });
    console.log("sum gpa, credits:", gpa, totalCred)
    setDataRows(z);
    setTotalGPA(gpa / totalCred) 
    }, [data]);

    const clearData = () => {
      setDataItems([])
      setDataRows([])
      console.log('cleared items')
    }

    const deleteClick = (i) => {
      console.log(i, 'deleted!')
      data.splice(i,1)
      setDataItems([...data])
    }

    return (
      <Container>

        <Row>

          <Col>
            <h3>Chanoknon Tangthienkul</h3>
            <h3>6217412</h3>
            <h1>My GPA</h1>
          </Col>

          <Col>
            <Button onClick={clearData} variant="dark">Reset</Button>
          </Col>

        </Row>

        <Table striped bordered hover>

          <thead>
            <tr>
              <th></th>
              <th>Semester</th>
              <th>Subjects</th>
              <th>Grade</th>
            </tr>
          </thead>

          <tbody>
            {dataRows}
          </tbody>

          <tfoot>
            <tr>
              <th colSpan={2}></th>
              <th style={styles.textRight}>Total GPA</th>
              <th style={styles.textCenter}>{(totalGPA).toFixed(2)}</th>
            </tr>
          </tfoot>

        </Table>

        </Container>
    )
}

export default GPATable;