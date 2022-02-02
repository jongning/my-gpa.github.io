import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useRef, useState  } from 'react';
import useLocalStorage from 'react-localstorage-hook';
import Data from './cs-2019.json';
import GPATable from './GPATable';

function App() {

  const yearRef = useRef();
  const termRef = useRef();
  const courseRef = useRef();
  const gradeRef = useRef();

  const [dataItems, setDataItems] = useLocalStorage("dataItems", []);

  var subjectData = []
  var x = []

  const options = Data.curriculum.subjects.map((v, i) => {
    x = []
    v.subjects.forEach((e, j) => { //Loop the subjects to push subject name as option into x
      x.push(<option key={j} value={e.name}>{e.code} {e.name}</option>)
      subjectData.push([e.name, e.code, e.credits])//save subject info
    })
    return x
  })

  const addItem = () => {

    var itemObj = {
      year: yearRef.current.value,
      term: termRef.current.value,
      course: courseRef.current.value,
      grade: gradeRef.current.value
    }

    console.log('before', dataItems) 
    dataItems.push(itemObj) //Push itemObj into dataItems
    setDataItems([...dataItems])
    console.log('after', dataItems)
  }

  return (
    <Container>

      <Row>
        <Col xs={5} style={{backgroundColor: '#f24755'}}>
          <br/><h5>My GPA Calculation</h5><br/>
          <Form>

            <Row>
              <Form.Group as={Col} className="mb-3" controlId="formYear">
                <Form.Label>Year</Form.Label>
                <Form.Select aria-label="Select year" ref={yearRef}>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formTerm">
                <Form.Label>Semester</Form.Label>
                <Form.Select aria-label="Select semester" ref={termRef}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group as={Col} className="mb-3" controlId="formCourse">
              <Form.Label>Subjects</Form.Label>
              <Form.Select aria-label="Select course" ref={courseRef}>
                {options}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGrade">
              <Form.Label>Grade</Form.Label>
              <Form.Select aria-label="Select grade" ref={gradeRef}>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D">D</option>
                <option value="F">F</option>
                <option value="-">W, I, S, U, R, TR</option>
              </Form.Select>
            </Form.Group>

            <Button variant="dark" onClick={addItem}>Add</Button>

          </Form>
        </Col>

        <Col>
          <GPATable data={dataItems} setDataItems={setDataItems} subjectData={subjectData}/>
        </Col>

      </Row>

    </Container>
  );
}

export default App;
