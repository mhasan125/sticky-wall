import React, { useState } from 'react'
import { Button, Col, ColorPicker, DatePicker, Divider, Form, Input, Row, Select, Space, TimePicker, Typography, message, theme } from 'antd'
import { Link, useNavigate, } from 'react-router-dom'
import { firestore } from '../../Config/firebase'
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { useAuthContext } from '../../Context/AuthContext';

const { Title } = Typography

const initialState = { title: "", date: "", description: "", }

export default function AddNote() {

  const { user } = useAuthContext()
  const [state, setState] = useState(initialState)
  const [stateStatus, setStateStatus] = useState({ status: "" })
  const navigate = useNavigate()
  const [color, setColor] = useState("#FFFFFF")
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleDate = (_, date) => setState(s => ({ ...s, date }))
  const handleChangeStatus = (value) => { setStateStatus((prevStateStatus) => ({ ...prevStateStatus, status: value })) }
  const handleColorChange = (color) => setColor(color.toHexString())
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(color)
    let { title, date, description } = state
    let { status } = stateStatus


    if (!title) { return message.error("Please enter title") }
    if (!date) { return message.error("Please enter date") }
    // if (!color) { return message.error("Please enter color") }
    // if (!status) { return message.error("Please enter status") }

    // const formattedDate = dayjs(date).format('MMMM D, YYYY [at] h:mm:ss A');
    const formattedDate = dayjs(date).format('MMMM DD, YYYY');
    const note = {
      title, description,
      date: formattedDate,
      backgroundColor:color,
      status,
      serverTime: serverTimestamp(),
      id: Math.random().toString(36).slice(2),
        createdBy: {
          fullName: user.fullName,
          email: user.email,
          uid: user.uid,
        }
    }

    // console.log(note)
    try {
      await setDoc(doc(firestore, 'note', note.id), note);
      message.success("A new Note added successfully & Your time is according to time zone")
    } catch (error) {
      message.error(error)
      message.error("something went wrong while creating note")
    }
    navigate("/")
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
                      <Input placeholder='Input your title' name='title' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Date">
                      <DatePicker className='w-100' onChange={handleDate} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Description">
                      <Input.TextArea placeholder='Input your description' name='description' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Space>
                    <Form.Item label="List">
                      <Select defaultValue="Select" style={{ width: 120, }} onChange={handleChangeStatus}
                        options={[{ value: 'personal', label: 'Personal', }, { value: 'work', label: 'Work', },]} />
                    </Form.Item>
                    <Form.Item label="Background Color" >
                      <ColorPicker value={color} onChangeComplete={handleColorChange}/>
                    </Form.Item>
                    </Space>
                  </Col>
                  <Col span={12}>
                    
                  </Col>
                  <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                    <Button type='primary' htmlType='submit' className='w-100' onClick={handleSubmit}>Add Todo</Button>
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
