'use client'
import { Linden_Hill } from 'next/font/google'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { Button, Card, Tab, Tabs,Modal,Row,Col } from 'react-bootstrap'



const Page = () => {
      
     const [detailsModal,setDetailsModal] = useState(true)
     
     const [adminId,setAdminId] = useState("")
     const [tableList,setTableList] = useState([])
     
     const [admin,setAdmin] = useState({
        username:"",
        password:"",
        re_password:""
     })

     const [values,setValues] = useState({
        name:"",
        date:"",
        time:"",
        
        
     })
    
     

     const sendData = async() => {
         
        try{
            const response = await axios.post("https://next-1-backend-1.vercel.app/reservation_create",{...values,admin:adminId})
            console.log(response)
            
        }catch(e){

        }

        window.location.reload()

     }


     const registerAdmin = async() => {
       
        try{ 
           const response = await axios.post("https://next-1-backend-1.vercel.app/registerAdmin",admin)
           console.log(response)
           if(response.statusText === 'OK'){
             setDetailsModal(false)
             setAdminId(response.data._id)
           }
        }catch(e){

        }
        
        setAdmin((prev)=>{
          return {...prev,username:"",password:"",re_password:""}
        })

     }

     const loginAdmin = async() =>{ 

        try{
          const response = await axios.post("https://next-1-backend-1.vercel.app/loginAdmin",admin)
          console.log(response)
          if(response.data.length>0){
            setAdminId(response.data[0]._id)
            setDetailsModal(false)
          }

          
        }catch(e){}
        
     }
     
     useEffect(()=>{

         const getTables = async() => {
             
          const response = await axios.post("https://next-1-backend-1.vercel.app/getAdminTables",{id:adminId})
          if(response.statusText === 'OK'){
             
            setTableList(response.data)
            console.log(tableList, "<==== all tables")
          }
          

         }

         getTables()
       
      
     },[adminId])
     
    
  return (
    <div style={{width:"100%",height:"",display:"grid",placeItems:"center",marginBottom:"50px"}}>

       <Card style={{width:"50%",marginTop:"100px"}}>
         <Card.Body style={{display:"flex",justifyContent:"space-between"}}>
          
          <div>
          Name
          <p></p>
         <input  placeholder='name' onChange={(e)=>{
            return setValues((prev)=>{
                return {...prev,name:e.target.value}
            })
        }}  />
          </div>
         
         <div>
            Date
            <p></p>
        <input type='date' placeholder='date' onChange={(e)=>{
            return setValues((prev)=>{
                return {...prev,date:e.target.value}
            })
        }}  />
        </div>

         <div>
            Time 
            <p></p>
            <input type = "time" onChange={(e)=>{
            return setValues((prev)=>{
                return {...prev,time:e.target.value}
            })
        }}  />
         </div>

         </Card.Body>
           

       <Card.Footer> 
         
         <Button onClick={sendData} >ADD</Button>
         </Card.Footer>
       </Card>
        
        <p></p>
        <Card style={{width:"50%",height:"50vh",overflow:"scroll"}} >
            
            <Row>
            {
            tableList.map((x)=>{
              return  <Col lg = {4} sm= {12} >
                    <Card style={{margin:"5px"}}> 
                      <Card.Body>
                      {x.name}
              <p></p>
              {x.time}
                  
                      </Card.Body>
                      <Card.Footer>Number of People - {x.contacts_of_guests.length}</Card.Footer>
              </Card>
              </Col>
            })
          }
            </Row>

        </Card>

       
       <Modal show = {detailsModal} >
           
           <Modal.Body>
           <Tabs variant='underline' fill = {true} >
           
           <Tab eventKey="login" title = "login" >
                <p></p>
                <input placeholder='username' onChange={e=>setAdmin((prev)=>{
                  return {...prev,username:e.target.value}
                })} />
                <p></p>
                <input placeholder='password' onChange={e=>setAdmin((prev)=>{
                  return {...prev,password:e.target.value}
                })} /> 
                <p></p>
                <Button onClick={loginAdmin}>Login</Button>

           </Tab>

           <Tab eventKey="register" title = "register">
           <p></p>
                <input onChange={e=>setAdmin((prev)=>{
                  return {...prev,username:e.target.value}
                })} placeholder='username' />

                <p></p>

                <input onChange={e=>setAdmin((prev)=>{
                  return {...prev,password:e.target.value}
                })} placeholder='password' />
                <p></p>
                <input onChange={e=>setAdmin((prev)=>{
                  return {...prev,re_password:e.target.value}
                })} placeholder='password' />
                <p></p>
                <Button onClick={registerAdmin} >Register</Button>
           </Tab>

         </Tabs>

           </Modal.Body>
          
       </Modal>


    </div>
  )
}

export default Page