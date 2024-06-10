import './Dashboard.css';
import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard(){
    const [actionButton,setActionButton]=useState('Add Student')
    const [fullname,setFullname]=useState('')
    const [emailAddress,setEmail]=useState('')
    const [dob,setDob]=useState('')
    const [gender,setGender]=useState('')
    const [mobileNo,setMobile]=useState('')
    const [process,setProcess]=useState(false)
    const [students,setStudents]=useState([])
    const [isDelete,setDelete]=useState(false)
    const [tempFullname,setTempFullname]=useState(false)

    const notify = (message) => toast(message);
    const onFullnameChange=(e)=>{
        setFullname(e.target.value)
    }
    const onEmailChange=(e)=>{
        setEmail(e.target.value)
    }
    const onDobChange=(e)=>{
        setDob(e.target.value)
    }
    const onGenderChange=(e)=>{
        setGender(e.target.value)
    }
    const onMobileChange=(e)=>{
        setMobile(e.target.value)
    }
    const fetchStudents=async()=>{
        const res = await fetch('http://localhost/phpDemo/getStudents.php')
        const data =await res.json()
        setStudents(data.message)
        
    }

    fetchStudents()

    const onStudentFormSubmit=async(e)=>{
        e.preventDefault();
        setProcess(true)
        console.log(fullname,emailAddress,dob,gender,mobileNo);
        if(actionButton==="Add Student"){
            const res = await fetch('http://localhost/phpDemo/insertStudent.php',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({fullname:fullname,emailAddress:emailAddress,dob:dob,
                    gender:gender,mobileNo:mobileNo})
            })
            const data = await res.json();
            console.log(data)
            
            setTimeout(()=>{
                setActionButton('Add Student')
                setDob('')
                setGender('')
                setFullname('')
                setEmail('')
                setMobile('')
                notify('Student enrolled successfully !!')
                setProcess(false)
            },2500);
        }else if(actionButton==="Edit Student"){
            const res = await fetch('http://localhost/phpDemo/updateStudent.php',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({fullname:fullname,emailAddress:emailAddress,dob:dob,
                    gender:gender,mobileNo:mobileNo})
            })
            const data = await res.json();
            console.log(data)
            
            setTimeout(()=>{
                setActionButton('Add Student')
                setDob('')
                setGender('')
                setFullname('')
                setEmail('')
                setMobile('')
                notify('Student updated successfully !!')
                setProcess(false)
            },2500);            
        }
    } 
    const deleteStudent=(FullName)=>{
        setDelete(true)
        setTempFullname(FullName)
    }
    const onReject=()=>{
        setDelete(false)
    }
    const delete1=async()=>{
        setDelete(false)
        const res = await fetch('http://localhost/phpDemo/deleteStudent.php',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({fullname:tempFullname})
            })
            const data = await res.json();
            console.log(data)
            
            setTimeout(()=>{
                setActionButton('Add Student')
                setDob('')
                setGender('')
                setFullname('')
                setEmail('')
                setMobile('')
                notify('Student deleted successfully !!')
                setProcess(false)
            },2500);
        }        
    
    const selectStudent=(index)=>{
        setActionButton('Edit Student')
        setFullname(students[index].Fullname)
        setEmail(students[index].EmailAddress)
        setDob(students[index].DoB)
        setGender(students[index].Gender)
        setMobile(students[index].MobileNo)
    }

    const navigate=useNavigate();
    useEffect(()=>{
        let uname=localStorage.getItem('token')
        if(uname===null){
            navigate('/login')
        }
    },[])
    return(
        <div>
            {isDelete && (<div className='shadow'>
                <div className='box'>
                    <h2>Are you sure you want to delete this?</h2>
                    <div className='actions'>
                        <button onClick={()=>delete1()}>Yes</button>
                        <button onClick={()=>onReject()}>No</button>
                    </div>
                </div>
            </div>)}
            <div className='dash-title'>
                <h2>CRUD  Operation Using MySQL</h2>
            </div>
            <div className='dash-container'>
                <div className='form-container'>
                    <form onSubmit={onStudentFormSubmit}>
                        <div className='title'>
                            <h3>College Enrollment Form</h3>
                        </div>
                        <div className='input-field'>
                            <label>Student Name  :</label>
                            <input type='text' className={process?'disabled':''}
                            value={fullname}
                            onChange={onFullnameChange}></input>
                        </div>
                        <div className='input-field'>
                            <label>Email Address  :</label>
                            <input type='email' className={process?'disabled':''}
                            value={emailAddress}
                            onChange={onEmailChange}></input>
                        </div>
                        <div className='input-field1'>
                            <label>Date Of Birth :</label>
                            <input type='date' className={process?'disabled':''}
                            value={dob}
                            onChange={onDobChange}></input>
                        
                        
                            <label>Gender  :</label>
                            <select value={gender} className={process?'disabled':''}
                            onChange={onGenderChange} >
                                <option value='Please Select'>Please select</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Not prefer to say</option>
                            </select>
                        </div>  
                        
                                                   
                        <div className='input-field'>
                            <label>Phone Number  :</label>
                            <input type='number' className={process?'disabled':''}
                            value={mobileNo}
                            onChange={onMobileChange}></input>
                        </div>
                        <div className='actions' onSubmit={onStudentFormSubmit}>
                            <input type='submit' value={actionButton}></input>
                            <input type='reset' value='Cancel'></input>
                        </div>
                    </form>
                </div>
                <div className='table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>SrNo</th>
                                <th>FullName</th>
                                <th>Email Address</th>
                                <th>DoB</th>
                                <th>Gender</th>
                                <th>PhoneNo</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students && students.map((students,index)=>(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{students.Fullname}</td>
                                        <td>{students.EmailAddress}</td>
                                        <td>{students.DoB}</td>
                                        <td>{students.Gender}</td>
                                        <td>{students.MobileNo}</td>
                                        <td className='table-action'>
                                            <button onClick={()=>selectStudent(index)}><i class="fa-solid fa-pen-to-square"></i></button>
                                            <button onClick={()=>deleteStudent(students.Fullname)}><i class="fa-solid fa-trash-can"></i></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
        </div>
    );
}
export default Dashboard;