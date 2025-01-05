'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card,Row,Col, Modal } from 'react-bootstrap'
import {Tab,Tabs} from 'react-bootstrap'


const Page = () => { 
    
    const [data,setData] = useState([])
    const [modalFlag,setModalFlag] = useState(false)
   
   
     const [resultModal,setResultModal] = useState(false)
     const [result,setResult] = useState([])
     const [searchNameModal,setSearchNameModal] = useState(false)


    const [details,setDetails] = useState({
        id:"",
        name:""
    })

    const [admin,setAdmin] = useState({

        username:"",
        password:""
    })

    const [searchTime,setSearchTime] = useState({
        starting:"",
        ending:""
    })

    const addName = async function(){
        
      

        try{
            const response = await axios.post("https://next-1-backend-1.vercel.app/add_name",details)
            console.log(response)
            
        }catch(e){

        }

        setDetails((prev)=>{
            return {...prev,id:"",name:""}
        })

        setModalFlag(false)
        window.location.reload()

    }

    const searchTable = async () => {
        
        

        try{
            
            const response = await axios.post("https://next-1-backend-1.vercel.app/searchTable",searchTime)
            console.log(response , "<=== search response")
            const result_list = []
            
            setResult(response.data)
            setResultModal(true)

        }catch(e){}

    }
  
    useEffect(()=>{
       
        const getTables = async() => {
             
            try{
                const response = await axios.get("https://next-1-backend-1.vercel.app/get_tables");
                console.log(response)
                setData(response.data)
    
            }catch(e){
                if(e){
                    console.log(e);
                }
            }
        }

        getTables();

    },[])

  return (
    <div style={{width:"100%",display:"grid",placeItems:"center"}} >
        
         
          <div>
             
          </div>
          <div style={{width:"60%",marginTop:"100px"}}> 
               
               <Row>
                   <Col lg = {4}>
                      
                      <div style={{width:"100%",height:"100%",marginTop:"15px"}}>
                     
                        <Card style={{display:"flex",width:"100%"}} >
                            
                            <Card.Header>  <input type='date' placeholder='date'/></Card.Header>

                           <Card.Body>

                           <div style={{border:"0px solid",display:"flex",justifyContent:"space-between"}}>
                                <p>starting time</p>
                                
                                <input onChange={e=>setSearchTime((prev)=>{
                                    return {...prev,starting:e.target.value}
                                })}  style={{width:"50%"}} type='time'/>
                                </div>
                          <p></p>
                          <div style={{border:"0px solid",display:"flex",justifyContent:"space-between"}} >
                                 
                                 <p>ending time</p>
                               
                                <input onChange={e=>setSearchTime((prev)=>{
                                    return {...prev,ending:e.target.value}
                                })} style={{width:"50%"}} type='time'/>
                                </div>

                           </Card.Body>
                           <Card.Footer>
                               <Button onClick={searchTable} > search</Button>
                           </Card.Footer>

                        </Card>
                        <p></p>
                        <Card style={{padding:"15px"}}>
                            <h3>Admin</h3>
                            
                           <Card.Footer>
                            <Link href={`/admin`}>
                            <Button>Enter</Button></Link>
                           </Card.Footer>

                         
                        </Card>
                        

                      </div>

                   </Col>
                   <Col lg = {8} >
                       
                       <div style={{height:"85vh",overflow:"scroll",paddingRight:"15px"}}>
                       {
                        data.map((x)=>{
                            return <Card onClick={(e)=>{
                                setDetails((prev)=>{
                                    return {...prev,id:x._id}
                                })
                                setModalFlag(true)
                            }} style={{border:"1px solid",margin:"15px",width:"100%"}} >
                                <Card.Header>
                                <h4> {x.name}</h4>
                                </Card.Header>

                    <Card.Body>
                
                   
                    {x.time}
                    <p></p>
                    <h6> {x.date.split("-").reverse().join("/")}</h6>
                    </Card.Body>
                    
                    <Card.Footer> number of people going - <span style={{fontWeight:"bold"}}>{x.contacts_of_guests.length}</span></Card.Footer>
                </Card>
            })
         }
                       </div>
                   
                   </Col>
               </Row>
          </div>
        
         <Modal show = {modalFlag} style={{marginTop:"30%"}} >
             <Modal.Body style={{gap:"15px"}}>
                 <input onChange={e=>setDetails((prev)=>{
                    return {...prev,name:e.target.value}
                 })} placeholder='name' />
                 <Button onClick={addName} style={{marginLeft:"15px"}}>done</Button>
             </Modal.Body>
         </Modal>

         <Modal show = {resultModal} style={{marginTop:"10%"}} >
             <Modal.Body>
                  
                  {
                    result.map((x)=>{
                        return <Card onClick={(e)=>{
                            setSearchNameModal(true)
                            setDetails((prev)=>{
                                return {...prev,id:x._id}
                            })
                        }} style={{marginBottom:"5px"}}>
                             <h5>{x.name}
                         -
                         {x.time}
                        </h5>
                        </Card>
                    })
                  }
               <Button onClick={e=>setResultModal(false)} >close</Button>
             </Modal.Body>
         </Modal>

         <Modal show = {searchNameModal} style={{marginTop:"500px"}} >
              
         <Modal.Body style={{display:"flex",justifyContent:"space-between"}} >
               <h4>Add Name</h4>
               <p></p>
            
                 <input
                    onChange={e=>setDetails((prev)=>{
                        return {...prev,name:e.target.value}
                    })}
                 />
                 <Button onClick={addName} >Add name</Button>
              </Modal.Body>


         </Modal>
    </div>
  )
}

export default Page