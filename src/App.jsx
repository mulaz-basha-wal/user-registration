import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [emailElement, setEmailElement] = useState();
  const [usernameElement, setUsernameElement] = useState();

  useEffect(() => {
    setEmailElement(document.querySelector("#email-check"));
    setUsernameElement(document.querySelector("#username-check"));
  }, []);

  const checkEmail = () => {
    if (email.length === 0) {
      alert("Enter email to check");
      return;
    }
    emailElement.innerHTML = "<i class='fa fa-spinner fa-spin'/>";
    axios
      .get(`/users/checkemail/${email}`)
      .then((res) => {
        if (res.data.status === 0) {
          emailElement.innerHTML = "<i class='fa fa-close text-danger'/>";
        } else {
          emailElement.innerHTML = "<i class='fa fa-check text-success'/>";
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error while checking email");
        emailElement.innerHTML = "<i class='fa fa-check'/>";
      });
  };

  const checkUsername = () => {
    if (username.length === 0) {
      alert("Enter username to check");
      return;
    }
    usernameElement.innerHTML = "<i class='fa fa-spinner fa-spin'/>";
    axios
      .get(`/users/checkusername/${username}`)
      .then((res) => {
        if (res.data.status === 0) {
          usernameElement.innerHTML = "<i class='fa fa-close text-danger'/>";
        } else {
          usernameElement.innerHTML = "<i class='fa fa-check text-success'/>";
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error while checking email");
        usernameElement.innerHTML = "<i class='fa fa-check'/>";
      });
  };

  const addUser = (e) => {
    e.preventDefault();
    const userOb = {
      email,
      username,
      password: e.target.password.value,
      dob: e.target.dob.value,
    };
    axios.post("/users", userOb).then((res) => {
      if (res.data.error === null) {
        alert("User added successfully");
      } else {
        alert(res.data.error);
      }
    });
  };

  return (
    <div className='App'>
      <form className='form-container bg-light clearfix' onSubmit={addUser}>
        <h1 className='text-center mb-4'> Register</h1>
        <div className='forum-group inp-email'>
          <input
            required
            type='email'
            name='email'
            className='form-control'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              emailElement.innerHTML = "<i class='fa fa-question-circle'/>";
            }}
            placeholder='Email'
          />
          <button
            id='email-check'
            type='button'
            className='btn'
            onClick={checkEmail}
            title='Check Email availability'>
            <i className='fa fa-question-circle' />
          </button>
        </div>
        <div className='forum-group inp-uname'>
          <input
            required
            type='text'
            name='username'
            className='form-control'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              usernameElement.innerHTML = "<i class='fa fa-question-circle'/>";
            }}
            placeholder='Username'
          />
          <button
            id='username-check'
            type='button'
            className='btn'
            onClick={checkUsername}
            title='Check Username availability'>
            <i className='fa fa-question-circle' />
          </button>
        </div>
        <div className='forum-group'>
          <input
            required
            type='password'
            name='password'
            className='form-control'
            placeholder='Password'
          />
          <input type='date' name='dob' className='form-control' />
        </div>
        <input type='submit' className='btn btn-success m-1' value='Register' />
      </form>
    </div>
  );
}

export default App;
