import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, ColorPicker, DatePicker, Divider, Form, Input, Row, Select, Space, Typography, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { getDoc, setDoc, doc } from 'firebase/firestore'
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { firestore } from '../../Config/firebase';

const { Title } = Typography

const initialState = { title: "", date: "", description: "" }

export default function UpdateNote() {

  const [state, setState] = useState(initialState)
  const [stateStatus, setStateStatus] = useState("Select")
  const [color, setColor] = useState("#FFFFFF")
  const navigate = useNavigate()
  const params = useParams()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleChangeStatus = (value) => {setStateStatus((prevStatus) => ({ ...prevStatus, status:value }))}
  
  const handleDate = (_, date) => setState(s => ({ ...s, date }))
  const handleColorChange = (color) => setColor(color.toHexString())

  const getDocument = useCallback(async () => {
    const docRef = doc(firestore, "note", params.id)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const note = docSnap.data()
      setState(note)
      let status = note.status
      // console.log("status=>", status, typeof (status))
      // console.log("before set=>", stateStatus)
      setStateStatus(status);
      // console.log("after set=>", stateStatus)
      setColor(note.backgroundColor)
    } else {
      message.error("Note not found")
    }
  }, [])


  useEffect(() => {
    getDocument()
  }, [getDocument])



  const handleSubmit = async (e) => {
    e.preventDefault()
    let { title, description, date } = state
    let { status } = stateStatus
    const formattedDate = dayjs(date).format('MMMM DD, YYYY');
    const note = {
      ...state,
      title, description,
      date: formattedDate,
      backgroundColor: color,
      status,
      //   dateModified: new Date().getTime(),
    }
    // console.log(note)
    if (!status) { return message.error("Please Select Status") }
    try {
      await setDoc(doc(firestore, "note", note.id), note);
      message.success("Note updated successfully")
      navigate("/")
    } catch (error) {
      message.error("error")
      console.error(error);
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <Link to="/" className='btn btn-primary mb-3 mt-2'>Go Home</Link>
            <div className="card p-3 p-md-4">
              <Title level={2} className='m-0 text-center'>Add Note</Title>

              <Divider />

              <Form layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Title">
                      <Input placeholder='Input your title' name='title' value={state.title} onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Date">
                      <DatePicker className='w-100' value={state.date ? dayjs(state.date) : ""} onChange={handleDate} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Description">
                      <Input.TextArea placeholder='Input your description' value={state.description} name='description' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Space>
                      <Form.Item label="List">
                        <Select defaultValue={stateStatus} style={{ width: 120, }} onChange={handleChangeStatus}
                          options={[{ value: 'personal', label: 'Personal', }, { value: 'work', label: 'Work', },
                          { value: 'nothing', label: 'Nothing', }]} />
                           {/* <Select  
                          //  getPopupContainer={(trigger) =>trigger.parentElement} 
                      value={state.status} onChange={status => stateStatus(s => ({ ...s, status }))}>
                        {["personal", "work"].map((status, i) => {return <Select.Option key={i}
                         value={status}>{status}</Select.Option>})}
                      </Select> */}
                      </Form.Item>
                      <Form.Item label="Background Color" >
                        <ColorPicker value={color} onChangeComplete={handleColorChange} />
                      </Form.Item>
                    </Space>
                  </Col>
                  <Col span={12}>

                  </Col>
                  <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                    <Button type='primary' htmlType='submit' className='w-100' onClick={handleSubmit}>Update Todo</Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
