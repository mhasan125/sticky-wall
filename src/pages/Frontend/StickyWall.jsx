import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom';
import { firestore } from '../../Config/firebase';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip, message } from 'antd';
import { useAuthContext } from '../../Context/AuthContext';

export default function StickyWall() {

    // const handleChange = e => setTodo(s => ({ ...s, [e.target.name]: e.target.value }))
    const { user } = useAuthContext()
    const [documents, setDocuments] = useState([])
    const [allNote, setAllNote] = useState([])
    const [date, setDate] = useState("")
    const navigate = useNavigate()
    const getData = async () => {
        try {
            const q = query(collection(firestore, "note"), where("createdBy.uid", "==", user.uid))
            const querySnapshot = await getDocs(q);
        const array = []
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            array.push(data)
            // console.log(data.serverTime)
            time(data)
        });
        setDocuments(array)
        setAllNote(array)
        } catch (error) {
            console.log(error)
            message.error("please connect to Internet")
          return () => getData()
        }
    }
    const time = (data) => {
        const serverTime = data.serverTime
        const jsDate = serverTime.toDate();
        const formattedDate = jsDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        // const formattedTime = jsDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
        // const formattedTimestamp = `${formattedDate} at ${formattedTime}`;
        setDate(formattedDate)
        // console.log(formattedTimestamp)
    }
    useEffect(() => {
        getData()
    }, [])
    const handleDelete = async (document) => {
try {
    await deleteDoc(doc(firestore, "note", document.id));
    let documentsAfterDelete = documents.filter(doc => doc.id !== document.id)
    setDocuments(documentsAfterDelete)
      setAllNote(documentsAfterDelete)
    message.success("Todo deleted successfully")
} catch (error) {
    // console.log(error)
    message.error("something went wrong while deleting todo")
}  
  }
    return (
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {documents.map((document, i) => {
                        return (
                            <div className="col" key={i}>
                                <div className="card" style={{backgroundColor:document.backgroundColor}}>
                                    <div className="card-body" style={{ height: '260px' }}>
                                        <div style={{ height: '85%' }}>
                                            <h5 className="card-title">{document.title || "Title"}</h5>
                                            <p className="card-text">{document.description || "Description"}</p>
                                        </div>
                                        <div className='d-flex align-items-end'>
                                        <Space>
                                            <Tooltip title="Delete" color='red'>
                                                <Button style={{ backgroundColor: 'red' }} danger icon={<DeleteOutlined />}
                                                 onClick={() => { handleDelete(document) }} />
                                            </Tooltip>
                                            <Tooltip title="Edit">
                                                <Button type="primary" icon={<EditOutlined />} onClick={() => { navigate(`/addNote/${document.id}`) }} />
                                            </Tooltip>
                                            </Space>
                                            <p className='mb-1 ms-2'>{document.date==="Invalid Date"? "Date":document.date}</p>
                                            <p className='mb-1 ms-2' style={{color:'#1677FF'}}>{document.status.charAt(0).toUpperCase() + document.status.slice(1) || 'No Thing'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                    })
                    }
                    <div className="col">
                        <Link to='/addNote' className="card" id='addNew'>
                            <div className="card-body" style={{ height: '260px' }}>
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                                    <div style={{ fontSize: '48px' }}>+</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
