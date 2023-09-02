// import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore/lite';
// import React, { useEffect, useState } from 'react'
// import { firestore } from '../Config/firebase';
// import { DeleteOutlined } from '@ant-design/icons';
// import { Button, Tooltip, message } from 'antd';

// export default function Work() {
//     const [documents, setDocuments] = useState([])
//     const [allNote, setAllNote] = useState([])
//     const [date, setDate] = useState()
//     const getData = async () => {
//         const q = query(collection(firestore, "note"), where("status", "==", 'work'));
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
//   return (
//     <>
//             <div className="container">
//                 <div className="row row-cols-1 row-cols-md-3 g-4">
//                     {documents.map((document, i) => {
//                         return (
                            
//                             <div className="col" key={i}>
//                             <div className="card">
//                                 <div className="card-body" style={{ height: '260px' }}>
//                                     <div style={{ height: '85%' }}>
//                                         <h5 className="card-title">{document.title}</h5>
//                                         <p className="card-text">{document.description}</p>
//                                     </div>
//                                     <div className='d-flex align-items-end'>
//                                         <Tooltip title="Delete" color='red'>
//                                             <Button style={{ backgroundColor: 'red' }} danger icon={<DeleteOutlined />}
//                                              onClick={() => { handleDelete(document) }} />
//                                         </Tooltip>
//                                         <p className='mb-1 ms-2'>{date}</p>
//                                         <p className='mb-1 ms-2' style={{color:'#1677FF'}}>{document.status.charAt(0).toUpperCase() + document.status.slice(1) || 'No Thing'}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
                            
//                         )
//                     })
//                     }
//                 </div>
//             </div>
//         </>
//   )
// }


import React from 'react'
import List  from "../../components/List";
import { where } from 'firebase/firestore';

export default function Work() {
  return (
    <>
    <List query={where("status", "==", "work")} />
    </>
    )
}