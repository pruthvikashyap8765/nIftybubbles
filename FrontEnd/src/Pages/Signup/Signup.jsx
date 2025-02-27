import React, { useEffect,useState } from "react";
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../api/axios'

import { useNavigate } from "react-router-dom"; //To redirect the page after successful signup





export default function Signup() {

    // Use this use effect to only affect the bootstrap in this page
    useEffect(() => {
        import('./Signup.css');

      }, []);






      let showNotification1 = (msg) =>{
        toast.error(msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        }


        let showNotification3 = () =>{
            toast.success("Successful!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
        }

        let showNotification4 = () =>{
            toast.success("Redirecting you to Login Page!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
            }



      let [formData, setFormData] = useState(
            {
                username:'',
                email:'',
                phone:'',
                password:''
            }
        )





        let changeData = (event) => {
            const { name, value } = event.target;
            let oldData = {...formData}
            oldData[name] = value
            setFormData(oldData)
        }





        

        const navigate = useNavigate(); // React Router's navigation hook


        let addData = async (event) => {
            event.preventDefault();

            try {
                const response = await api.post("/user", formData);
                showNotification3();
                showNotification4();

                setFormData(
                    {
                        username:'',
                        email:'',
                        phone:'',
                        password:'',
                    }
                )

                setTimeout(() => {
                    navigate("/login"); // Redirect to the login page
                }, 3100); // 3-second delay for showing a success message
            }

            catch (error) {
                console.log(error.response.data.detail)
                showNotification1(error.response.data.detail);
            }
        }

            





        //For hiding and showing password
        let[pstatus, setPstatus] = useState(false)








        let SC = '!@#$%^&*().'
        let UC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let LC = 'abcdefghijklmnopqrstuvwxyz'
        let NC = '0123456789'


        let showNotification2 = () =>{
            toast.error('Please check at least one checkbox', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        



        let [uppercase, setUppercase] = useState(false)
        let [lowercase, setLowercase] = useState(false)
        let [numbers, setNumbers] = useState(false)
        let [specialchar, setSpecialchar] = useState(false)
        let [passlength, setPasslength] = useState(10)
        let [fpass, setFinalPass] = useState('')
        

        let generatePassword = () => {
            let finalpass = '';
            let charSet = '';
            if(uppercase || lowercase || numbers || specialchar){
                if(uppercase) charSet += UC;
                if(lowercase) charSet += LC;
                if(numbers) charSet += NC;
                if(specialchar) charSet += SC;
                
                for(let i = 0; i < passlength; i++){
                    finalpass += charSet.charAt(Math.floor(Math.random() * charSet.length))
                }

                setFinalPass(finalpass)


            }
            else{
                showNotification2()
            }
        }


    // To copy the generated password to the clipboard
    let copyPass = () => {
        navigator.clipboard.writeText(fpass)
    }




    let [gpstatus, setGpstatus] = useState(false)

    let closeGp = () => {
        setGpstatus(false)
        setFinalPass('')
        setUppercase(false)
        setLowercase(false)
        setNumbers(false)
        setSpecialchar(false)
        setPasslength(10)
    }



  return (
    <div className='signup'>

        <div className='container'>
            <div className='row'>
                <div className='col-lg-12'>
                        <div className="c1">
                            <form onSubmit={addData}>
                                <div className='text-start my-3'>
                                    <label className="label">UserName</label>
                                    <input type="text" onChange={changeData}  className='form-control' name='username' value={formData.username} /> 
                                </div>
                                <div className='text-start my-3'>
                                    <label className="label">Email</label>
                                    <input type="email" onChange={changeData} className='form-control' name='email' value={formData.email}/> 
                                </div>
                                <div className='text-start my-3'>
                                    <label className="label">Phone</label>
                                    <input type="tel" pattern="[0-9]{10}"  onChange={changeData} className='form-control' name='phone' value={formData.phone}/> 
                                </div>
                                <div className='text-start my-3' style={{position:"relative"}}>
                                    <label className="label">Password</label>
                                    <input type={(pstatus) ? "text" : "password"} onChange={changeData} className='form-control' name='password' value={formData.password}/> 
                                    <span class="password-toggle-icon pbtn" onClick={() => setPstatus(!pstatus)}><i class="fas fa-eye"></i></span>
                                    <button type="button" className="gp" onClick={() => setGpstatus(true)}>Generate Password</button>
                                </div>
                                <div className='text-start my-3'>
                                    <button type ="submit" className="signupbtn">
                                            Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                </div>

            </div>

        </div>





        <div className={`passwordgenerator ${gpstatus ? 'showpasswordgenerator' : ''}`} >
        
            <div className='c3'>
            <button className='btn close' onClick={closeGp}>&times;</button>
                <div className='row'>
                    <div className='col-lg-12'>
                        <h1>Password Generator</h1>
                        <div className='pfield' style={{position:"relative"}}>
                            <input value={fpass} className='form-control' name='password' readOnly />  {/* read only will make the input only readable */}
                            <span className="password-toggle-icon cbtn" onClick={copyPass}>&#x2398;</span>
                        </div> 
                        <div className='plength'>
                            <label className='pglabel'>Password Length</label>
                            <input className='inpn' type="number" min={10} max={20} value={passlength} onChange={(event) => setPasslength(event.target.value)} />
                        </div>             
                        <div className='plength'>
                            <label className='pglabel'>Include Uppercase Letters</label>
                            <input className='inpc' type="checkbox" checked={uppercase} onChange={() => setUppercase(!uppercase)}/> {/* checked = {uppercase} is to inital no check as the false state */}
                        </div>    
                        <div className='plength'>
                            <label className='pglabel'>Include Lowercase Letters</label>
                            <input className='inpc' type="checkbox" checked={lowercase} onChange={() => setLowercase(!lowercase)}/>
                        </div>    
                        <div className='plength'>
                            <label className='pglabel'>Include Special Characters</label>
                            <input className='inpc' type="checkbox" checked={specialchar} onChange={() => setSpecialchar(!specialchar)}/>
                        </div>    
                        <div className='plength'>
                            <label className='pglabel'>Include Numbers</label>
                            <input className='inpc' type="checkbox" checked={numbers} onChange={() => setNumbers(!numbers)}/>
                        </div>     
                        <div className='plength'>
                            <button className='gpbtn' onClick={generatePassword}>Generate Password</button>
                        </div>     
                    </div>
                </div>
            </div>

    </div>







        <ToastContainer />

    </div>
  )
}

