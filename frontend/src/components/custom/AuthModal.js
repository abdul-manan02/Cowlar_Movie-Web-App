import React, { useState } from 'react';

const AuthModal = ({ isOpen, isSignUp, toggleModal, switchAuthMode }) => {
  // State for sign up form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name,
      email,
      username,
      password
    };
    // Here you would typically send formData to your server
    console.log(formData);
  };

  return (
    <div>
      {isOpen && (
        <div tabIndex="-1" className="modal modal-open">
          <div className="modal-box">
            <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={toggleModal}>✕</button>
            {isSignUp ? (
              <div>
                <h3 className="font-bold text-lg">Sign Up</h3>
                <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                  <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs"
                         value={name} onChange={(e) => setName(e.target.value)} />
                  <input type="email" placeholder="Email" className="input input-bordered w-full max-w-xs my-2"
                         value={email} onChange={(e) => setEmail(e.target.value)} />
                  <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs my-2"
                         value={username} onChange={(e) => setUsername(e.target.value)} />
                  <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs"
                         value={password} onChange={(e) => setPassword(e.target.value)} />
                  <div className='py-2'>
                    <button type="submit" className="btn bg-rose-400 hover:bg-rose-700 text-white">Sign Up</button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-lg">Sign In</h3>
                <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                  <input type="email" placeholder="Email" className="input input-bordered w-full max-w-xs"
                         value={email} onChange={(e) => setEmail(e.target.value)} />
                  <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs my-2"
                         value={password} onChange={(e) => setPassword(e.target.value)} />
                  <div className='py-2'>
                    <button type="submit" className="btn bg-rose-400 hover:bg-rose-700 text-white">Sign In</button>
                  </div>
                </form>
              </div>
            )}
            <div className="modal-action">
              <button className="btn" onClick={switchAuthMode}>
                {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthModal;
