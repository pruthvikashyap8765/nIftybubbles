import React, { useEffect,useState } from "react";
import { Link } from 'react-router-dom'
import api from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import { useAuth } from "../AuthContext";





export default function Login() {

    useEffect(() => {
        import('./Login.css')
      }, []);




      let successNotification = () =>{
              toast.success("Login Successful", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        let redirectingNotification = () =>{
            toast.success("Redirecting to Homepage", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
      }

        let errorNotification = () =>{
            toast.error("Invalid Credentials", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
      }


      let [logindata, setLoginData] = useState(
        {
              username:'',
              password:''
          }
        )
      
      
      
      
      
    let changeData = (event) => {
        const { name, value } = event.target;
        let oldData = {...logindata}
        oldData[name] = value
        setLoginData(oldData)
    }


    const navigate = useNavigate();
    const { login } = useAuth();

      let handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new URLSearchParams();
            formData.append("username", logindata.username);
            formData.append("password", logindata.password);

            const response = await api.post("/login", formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            });
            login(response.data);
            successNotification();
            redirectingNotification();
            setTimeout(() => {
                navigate("/"); // Redirect to the login page
            }, 2000); // 3-second delay for showing a success message


          } catch (err) {
            errorNotification();
          }
        
      }


      let[pstatus, setPstatus] = useState(false)



  return (
    <div className='login'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-12'>
                    <form onSubmit={handleSubmit}>
                        <div className='text-start my-3'>
                            <label className="label">UserName</label>
                            <input type="text" onChange={changeData} className='form-control' name="username" value={logindata.username}/> {/* This input is a controlled component as it is controlled by the uname use state */}
                        </div>
                        <div className='text-start my-3' style={{position:'relative'}}>
                            <label className="label">Password</label>
                            <input type={(pstatus) ? "text" : "password"} className='form-control pinput' name='password' onChange={changeData} value={logindata.password}/> 
                            <span class="password-toggle-icon pbtn" onClick={() => setPstatus(!pstatus)}><i class="fas fa-eye"></i></span>
                        </div>
                        <div className='text-start my-3'>
                            <button className="loginbtn">Login</button>
                        </div>
                        <div className='text-start my-6 signuplink'>
                            <p>New User? <Link to='/signup'>Signup</Link></p>
                        </div>
                    </form>
                </div>

            </div>

        </div>
        <ToastContainer />
    </div>
  )
}
