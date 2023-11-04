// import { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "./Landing.css";

// function Landing() {
//   const [formData, setFormData] = useState({
//     title: '',
//   });

//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [image, setImage] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setImage(selectedFile);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!image || !formData.title) {
//       setError('Por favor, complete todos los campos.');
//       return;
//     }

//     const formDataToSend = new FormData();
//     formDataToSend.append('title', formData.title);
//     formDataToSend.append('image', image);

//     try {
//       const response = await fetch('http://localhost:8000/upload', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       if (response.ok) {
//         setSuccess(true);
//         setError(null);
//         toast.success('Imagen enviada con éxito');
//       } else {
//         setError('Error al enviar la imagen.');
//       }
//     } catch (error) {
//       setError('Error de red');
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className='main-content'>
//         <div className='welcomeText'>
//           <h1 className='greetingRegistration'>Subir imagen</h1>
//         </div>
//         <form className='registrationForm' onSubmit={handleSubmit}>
//           <div className='formGroup'>
//             <label className='identifier'>Título de la imagen</label>
//             <input
//               className='registrationBox'
//               type='text'
//               name='title'
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className='formGroup'>
//             <label className='identifier'>Seleccionar imagen</label>
//             <label htmlFor='imageInput' className='registrationBox' id='regis'>
//               Elegir archivo
//             </label>
//             <input
//               id='imageInput'
//               type='file'
//               onChange={handleImageChange}
//               required
//               style={{ display: 'none' }}
//             />
//           </div>
//           <button className='registrationButton' type='submit'>
//             Enviar Imagen
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Landing;

import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../components/Card/Card';
import './Landing.css';

function Landing() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [imageList, setImageList] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUpload = () => {
    if (selectedFile && title) {
      const newImage = {
        file: URL.createObjectURL(selectedFile),
        title: title,
      };
      setImageList([...imageList, newImage]);
      setSelectedFile(null);
      setTitle('');
      toast.success('Imagen añadida con éxito', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    } else {
      toast.error('Por favor, seleccione una imagen y añada un título');
    }
  };

  return (
    <div className="image-uploader-container">
      <div className="upload-form">
        <div className="form-row">
          <label className="file-upload-label" htmlFor="fileInput">
            Subir imagen
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            placeholder="Título de la imagen"
            value={title}
            onChange={handleTitleChange}
          />
          <button onClick={handleUpload}>Subir</button>
        </div>
      </div>
      <div className="card-container">
        {imageList.map((image, index) => (
          <Card key={index} img_card={image.file} text={image.title} />
        ))}
      </div>
    </div>
  );
}

export default Landing;

