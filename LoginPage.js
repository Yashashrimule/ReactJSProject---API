import './LoginPage.css';
import React,{useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage(){

    const [uname,setUName]=useState('')
    const [upwd,setUPwd]=useState('')
    const [isLoading,setLoading]=useState(false)
    const navigate=useNavigate();
   

    const onChangeUsername=(e)=>{
        setUName(e.target.value)
    }
    const onChangePwd=(e)=>{
        setUPwd(e.target.value)
    }
    const notify = (message) => toast(message);
    const onLogin=async (e)=>{
        e.preventDefault();
        console.log(uname)
        console.log(upwd)
        setLoading(true)
        if(uname!='' && upwd!=''){
            const res = await fetch('http://localhost/phpDemo/login.php',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({uname,upwd})
            })
            const data = await res.json();
            console.log(data)
            
            setTimeout(()=>{
                setLoading(false)
                if(data.message==='1'){
                    notify('Login successfully !!')
                    setTimeout(()=>{
                        localStorage.setItem('token',uname)
                        navigate('/dash');
                    },3500);
                }else{
                    notify('Login failed !!')
                }
            },1500);
        }
    }

    return(
        <div>
            <div className='login-container'>
                <div className='login-box'>
                    <div className='title'>
                        <h1>Welcome Back </h1>
                        <h4>Please sign-in to continue !</h4>
                    </div>
                    <form onSubmit={onLogin}>
                        <div className='input-field'>
                            <label>Username :</label>
                            <input type='email' value={uname}
                            onChange={onChangeUsername}
                            className={isLoading ? 'process':''}></input>
                        </div>
                        <div className='input-field'>
                            <label>Password :</label>
                            <input type='password' value={upwd}
                            onChange={onChangePwd}
                            className={isLoading ? 'process' :''}></input>
                        </div>
                        <div className='input-field'>
                            <input type='submit' value={isLoading ? 'Please wait...':'Sign In'} ></input>
                        </div>
                        <div className='input-field'>
                            <Link to="/signup">Don't have account? Sign Up</Link>
                        </div>
                    </form>
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
export default LoginPage;