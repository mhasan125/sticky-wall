// import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore/lite';
// import React, { useEffect, useState } from 'react'
// import { firestore } from '../Config/firebase';
// import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
// import { Button, Col, Form, Input, Modal, Row, Space, Tooltip, message } from 'antd';
// import { useNavigate } from 'react-router-dom';

// export default function Personal() {
//     const [documents, setDocuments] = useState([])
//     const [allNote, setAllNote] = useState([])
//     const [date, setDate] = useState()
//     const [isModalOpen, setIsModalOpen] = useState(false)
//     const navigate = useNavigate()
//     const handleChange = e => setTodo(s => ({ ...s, [e.target.name]: e.target.value }))
//     const getData = async () => {
//         const q = query(collection(firestore, "note"), where("status", "==", 'personal'));
//         const querySnapshot = await getDocs(q);
//         // const querySnapshot = await getDocs(collection(firestore, "note"));
//         const array = []
//         querySnapshot.forEach((doc) => {
//             let data = doc.data()
//             array.push(data)
//             // console.log(data)
//             time(data)
//         });
//         setDocuments(array)
//         setAllNote(array)
//     }
//     const time = (data) => {
//         const serverTime = data.serverTime
//         const jsDate = serverTime.toDate();
//         const formattedDate = jsDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
//         const formattedTime = jsDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
//         const formattedTimestamp = `${formattedDate} at ${formattedTime}`;
//         setDate(formattedTimestamp)
//         // console.log(formattedTimestamp)
//     }
//     useEffect(() => {
//         getData()
//     }, [])
//     const handleDelete = async (document) => {
// try {
//     await deleteDoc(doc(firestore, "note", document.id));
//     let documentsAfterDelete = documents.filter(doc => doc.id !== document.id)
//     setDocuments(documentsAfterDelete)
//       setAllNote(documentsAfterDelete)
//     message.success("Todo deleted successfully")
// } catch (error) {
//     // console.log(error)
//     message.error("something went wrong while deleting todo")
// }  
//   }
//   const handleUpdate = () => {
//     let { title, description } = todo

//     if (!title) { return message.error("Please enter title") }

//     const updatedTodo = {
//       title, location, date, description,
//       dateModified: new Date().getTime()
//     }

//     const updatedTodos = documents.map(oldTodo => {
//       if (oldTodo.id === todo.id)
//         return updatedTodo
//       return oldTodo
//     })

//     setDocuments(updatedTodos)
//     localStorage.setItem("todos", JSON.stringify(updatedTodos))
//     message.success("Todo updated successfully")
//     setIsModalOpen(false)
//   }
//   return (
//     <>
//             <div className="container">
//                 <div className="row row-cols-1 row-cols-md-3 g-4">
//                     {documents.map((document, i) => {
//                         return (
//                             <div className="col" key={i}>
//                                 <div className="card">
//                                     <div className="card-body" style={{ height: '260px' }}>
//                                         <div style={{ height: '85%' }}>
//                                             <h5 className="card-title">{document.title}</h5>
//                                             <p className="card-text">{document.description}</p>
//                                         </div>
//                                         <div className='d-flex align-items-end'>
//                                             <Space>
//                                             <Tooltip title="Delete" color='red'>
//                                                 <Button style={{ backgroundColor: 'red' }} danger icon={<DeleteOutlined />}
//                                                  onClick={() => { handleDelete(document) }} />
//                                             </Tooltip>
//                                             <Tooltip title="Edit">
//                                                 <Button type="primary" icon={<EditOutlined />} onClick={() => { navigate(`/addNote/${document.id}`) }} />
//                                             </Tooltip>
//                                             </Space>
//                                             <p className='mb-1 ms-2'>{date}</p>
//                                             <p className='mb-1 ms-2' style={{color:'#1677FF'}}>{document.status.charAt(0).toUpperCase() + document.status.slice(1) || 'No Thing'}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             )
//                     })
//                     }
//                 </div>
//             </div>

//             <Modal title="Update Todo"centered open={isModalOpen}onOk={handleUpdate}okText="Confirm"cancelText="Close"
//             onCancel={() => setIsModalOpen(false)}style={{ width: 1000, maxWidth: 1000 }}>
//         <Form layout="vertical" className='py-4'>
//           <Row gutter={16}>
//             <Col xs={24} lg={8}>
//               <Form.Item label="Title">
//                 <Input placeholder='Input your title' name='title' value={document.title} onChange={handleChange} />
//               </Form.Item>
//             </Col>
//             <Col xs={24} lg={8}>
//               <Form.Item label="Location">
//                 <Input placeholder='Input your location' name='location' value={document.location} onChange={handleChange} />
//               </Form.Item>
//             </Col>
//             <Col span={24}>
//               <Form.Item label="Description" className='mb-0'>
//                 <Input.TextArea placeholder='Input your description' name='description' value={document.description} onChange={handleChange} />
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </Modal>
//         </>
//   )
// }


import React from 'react'
import List from '../../components/List'
import { where } from 'firebase/firestore'

export default function Personal() {
  return (
    <>
    <List query={where("status", "==", "personal")} />
    </>
  )
}
