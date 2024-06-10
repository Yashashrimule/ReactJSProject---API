import { useState } from 'react';
import './Signup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Signup(){
    const [error,setError]=useState('')
    const [fullname,setFullname]=useState('')
    const [email,setEmail]=useState('')
    const [pwd,setPassword]=useState('')
    const [confirmpwd,setConfirm]=useState('')
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()

    const onFullnameChange=(e)=>{
        setFullname(e.target.value)
    }
    const onEmailChange=(e)=>{
        setEmail(e.target.value)
    }
    const onPasswordChange=(e)=>{
        setPassword(e.target.value)
    }
    const onConfirmChange=(e)=>{
        setConfirm(e.target.value)
    }
    
    const notify = (message) => toast(message);
    const onRegister=async (e)=>{
        e.preventDefault();
        console.log(fullname,email,pwd,confirmpwd)
        if(fullname.length==0){
            setError('Fill your fullname !!') 
        }else if(email.length==0){
            setError('Fill your email address !!')
        }else if(pwd.length==0){
            setError('Fill your password !!')
        }else if(confirmpwd.length==0){
            setError('Fill your confirm password !!')
        }else{
            if(pwd==confirmpwd){
                setError('')
                setLoading(true)
                const res = await fetch('http://localhost/phpDemo/signup.php',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({fullname,email,pwd})
            })
            const data = await res.json();
            notify('User registered successfully !!')
            console.log(data)
            setTimeout(()=>{
                setLoading(false)
                if(data.status===true){
                    navigate("/login")
                }
            },2800);
            }else{
                setPassword('')
                setConfirm('')
                setError("Password doesn't match !!")
            }
        }
    }


    return(
        <div>
            <div className='signup-parent'>
                <div className='signup-box'>
                    <div className='child'>
                        <img src='https://st2.depositphotos.com/3382541/11091/v/450/depositphotos_110916360-stock-illustration-sign-up-button-isometric-concept.jpg'></img>
                        
                    </div>
                    <div className='child'>
                    <h3>Create your new account !!</h3>
                        <form onSubmit={onRegister}>
                            <div className='input-field'>
                                <label>Fullname :</label>
                                <input type='text'
                                value={fullname}
                                onChange={onFullnameChange}
                                className={loading ?'process':''}></input>
                            </div>
                            <div className='input-field'>
                                <label>Email Address :</label>
                                <input type='email'
                                value={email}
                                onChange={onEmailChange}
                                className={loading ?'process':''}></input>
                            </div>
                            <div className='input-field'>
                                <label>Password :</label>
                                <input type='password'
                                value={pwd}
                                onChange={onPasswordChange}
                                className={loading ?'process':''}></input>
                            </div>
                            <div className='input-field'>
                                <label>Confirm Password :</label>
                                <input type='password'
                                value={confirmpwd}
                                onChange={onConfirmChange}
                                className={loading ?'process':''}></input>
                            </div>
                            <div className='input-field'>
                                <input className={loading ?'process':''}
                                 type='submit' value='Register'></input>
                            </div>
                            <div className='input-field'>
                                <p className='error'>{error}</p>
                            </div>
                            

                        </form>
                    </div>
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
export default Signup;