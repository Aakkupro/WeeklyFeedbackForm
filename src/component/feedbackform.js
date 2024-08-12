
// import React, { useState } from 'react';
// import './form.css'; // Include your CSS file for styling

// function MentorMenteeForm() {
//   const [formData, setFormData] = useState({
//     mentor_name: '',
//     mentee_name: '',
//     mentee_email: '',
//     strength: '',
//     improvement: '',
//     feedback: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const Sheet_Url = 'https://script.google.com/macros/s/AKfycbz1rcYWoBOXJpnyMhaArvEF0h61Iq7BOmGzNwoSvRw-ehU5GmGudelDbzunUxJmfWRm/exec';
//     try {
//       const response = await fetch(Sheet_Url, {
//         method: 'POST',
//         mode: 'no-cors', 
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok || response.type === 'opaque') {
//         console.log('Data sent successfully, but response not readable due to no-cors');
//         alert('Form submitted successfully!');
//         setFormData({
//           mentor_name: '',
//           mentee_name: '',
//           mentee_email: '',
//           strength: '',
//           improvement: '',
//           feedback: ''
//         });
//       } else {
//         console.log('Data sent but response not readable');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('There was an error submitting the form.');
//     }
//   };

//   return (
//     <div className="form-wrapper">
//       <form onSubmit={handleSubmit} className="form-container">
//         <h2>Weekly Feedback Form</h2>
//         <div className="input-group">
//           <label>
//           <i className="fas fa-user" style={{ color: '#3498db' }}></i>
//             Mentor Name:
//             <input type="text" name="mentor_name" value={formData.mentor_name} onChange={handleChange} placeholder='Enter_here' required />
//           </label>
//         </div>
//         <div className="input-group">
//           <label>
//           <i className="fas fa-user" style={{ color: '#e74c3c' }}></i>
//             Mentee Name:
//             <input type="text" name="mentee_name" value={formData.mentee_name} onChange={handleChange} placeholder='Enter_here' required />
//           </label>
//         </div>
//         <div className="input-group">
//           <label>
//           <i className="fas fa-envelope" style={{ color: '#f39c12' }}></i>
//             Mentee Email:
//             <input type="email" name="mentee_email" value={formData.mentee_email} onChange={handleChange} placeholder='abs@navgurukul.org' required />
//           </label>
//         </div>
//         <div className="input-group">
//           <label>
//           <i className="fas fa-chart-line" style={{ color: '#2ecc71' }}></i>
//             Strength:
//             <textarea name="strength" value={formData.strength} onChange={handleChange} placeholder='Highlight the strength of mentee' required/>
//           </label>
//         </div>
//         <div className="input-group">
//           <label>
//           <i className="fas fa-tools" style={{ color: '#9b59b6' }}></i>
//             Improvement:
//             <textarea name="improvement" value={formData.improvement} onChange={handleChange} placeholder='Scope of improvement' required/>
//           </label>
//         </div>
//         <div className="input-group">
//           <label>
//           <i className="fas fa-comment" style={{ color: '#1abc9c' }}></i>
//             Feedback:
//             <textarea name="feedback" value={formData.feedback} onChange={handleChange} placeholder='Overall feedback' required/>
//           </label>
//         </div>
//         <button type="submit"><i className="fas fa-paper-plane" style={{ color: '#e67e22' }}></i> Submit</button>
//       </form>
//     </div>
//   );
// }

// export default MentorMenteeForm;


import React, { useState } from 'react';
import './form.css'; // Include your CSS file for styling

function MentorMenteeForm() {
  const [formData, setFormData] = useState({
    mentor_name: '',
    mentee_name: '',
    mentee_email: '',
    strength: '',
    improvement: '',
    feedback: '',
  });

  const [errors, setErrors] = useState({
    mentor_name: '',
    mentee_name: '',
    mentee_email: '',
    strength: '',
    improvement: '',
    feedback: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let errorMsg = '';
    const textRegex = /^[A-Za-z\s,.]*$/;

    if (name !== 'mentee_email' && value && !textRegex.test(value)) {
      errorMsg = 'Enter only string/text';
    }

    setErrors({ ...errors, [name]: errorMsg });
    setFormData({ ...formData, [name]: value });

    if (!errorMsg) {
      document.getElementById(`label-${name}`).classList.remove('blink-label');
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === 'mentee_email') {
      let errorMsg = '';

      if (value && (/[A-Z]/.test(value) || /^[0-9]/.test(value))) {
        errorMsg = 'Invalid input';
      } else if (value && !/^[a-z][a-z0-9]*@navgurukul\.org$/.test(value)) {
        if (value.includes('@navgurukul.org')) {
          errorMsg = 'Enter only lowercase letters and numbers. Email must start with a letter.';
        } else {
          errorMsg = 'Enter only NavGurukul email Id';
        }
      }

      setErrors({ ...errors, [name]: errorMsg });

      if (!errorMsg) {
        document.getElementById(`label-${name}`).classList.remove('blink-label');
      } else {
        document.getElementById(`label-${name}`).classList.add('blink-label');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    Object.keys(errors).forEach((key) => {
      if (errors[key]) {
        hasError = true;
        document.getElementById(`label-${key}`).classList.add('blink-label');
      }
    });

    if (hasError) {
      alert('Please correct the errors before submitting the form.');
      return;
    }

    const Sheet_Url = 'https://script.google.com/macros/s/AKfycbz1rcYWoBOXJpnyMhaArvEF0h61Iq7BOmGzNwoSvRw-ehU5GmGudelDbzunUxJmfWRm/exec';
    try {
      const response = await fetch(Sheet_Url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok || response.type === 'opaque') {
        console.log('Data sent successfully, but response not readable due to no-cors');
        alert('Form submitted successfully!');
        setFormData({
          mentor_name: '',
          mentee_name: '',
          mentee_email: '',
          strength: '',
          improvement: '',
          feedback: '',
        });
        setErrors({
          mentor_name: '',
          mentee_name: '',
          mentee_email: '',
          strength: '',
          improvement: '',
          feedback: '',
        });
      } else {
        console.log('Data sent but response not readable');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form.');
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Weekly Feedback Form</h2>

        <div className="input-group">
          <label id="label-mentor_name">
            <i className="fas fa-user" style={{ color: '#3498db' }}></i>
            Mentor Name:
            {errors.mentor_name && <span className="error-message">{errors.mentor_name}</span>}
            <input
              type="text"
              name="mentor_name"
              value={formData.mentor_name}
              onChange={handleChange}
              placeholder='Enter here'
              required
            />
          </label>
        </div>

        <div className="input-group">
          <label id="label-mentee_name">
            <i className="fas fa-user" style={{ color: '#e74c3c' }}></i>
            Mentee Name:
            {errors.mentee_name && <span className="error-message">{errors.mentee_name}</span>}
            <input
              type="text"
              name="mentee_name"
              value={formData.mentee_name}
              onChange={handleChange}
              placeholder='Enter here'
              required
            />
          </label>
        </div>

        
        <div className="input-group">
          <label id="label-mentee_email">
            <i className="fas fa-envelope" style={{ color: '#f39c12' }}></i>
            Mentee Email:
            {errors.mentee_email && <span className="error-message">{errors.mentee_email}</span>}
            <input
              type="email"
              name="mentee_email"
              value={formData.mentee_email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='abc@navgurukul.org'
              required
            />
          </label>
        </div>

        <div className="input-group">
          <label id="label-strength">
            <i className="fas fa-chart-line" style={{ color: '#2ecc71' }}></i>
            Strength:
            {errors.strength && <span className="error-message">{errors.strength}</span>}
            <textarea
              name="strength"
              value={formData.strength}
              onChange={handleChange}
              placeholder='Highlight the strength...'
              required
            />
          </label>
        </div>

        <div className="input-group">
          <label id="label-improvement">
            <i className="fas fa-tools" style={{ color: '#9b59b6' }}></i>
            Improvement:
            {errors.improvement && <span className="error-message">{errors.improvement}</span>}
            <textarea
              name="improvement"
              value={formData.improvement}
              onChange={handleChange}
              placeholder='Scope of improvement...'
              required
            />
          </label>
        </div>

        <div className="input-group">
          <label id="label-feedback">
            <i className="fas fa-comment" style={{ color: '#1abc9c' }}></i>
            Feedback:
            {errors.feedback && <span className="error-message">{errors.feedback}</span>}
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder='Write overall feedback...'
              required
            />
          </label>
        </div>

        <button type="submit">
          <i className="fas fa-paper-plane" style={{ color: '#e67e22' }}></i> Submit
        </button>
      </form>
    </div>
  );
}

export default MentorMenteeForm;
