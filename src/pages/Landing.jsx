// import { useState } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Card from '../components/Card/Card';
// import './Landing.css';

// function Landing() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [title, setTitle] = useState('');
//   const [imageList, setImageList] = useState([]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   const handleUpload = () => {
//     if (selectedFile && title) {
//       const newImage = {
//         file: URL.createObjectURL(selectedFile),
//         title: title,
//       };
//       setImageList([...imageList, newImage]);
//       setSelectedFile(null);
//       setTitle('');
//       toast.success('Imagen añadida con éxito', {
//         position: 'bottom-right',
//         autoClose: 3000,
//       });
//     } else {
//       toast.error('Por favor, seleccione una imagen y añada un título');
//     }
//   };

//   return (
//     <div className="image-uploader-container">
//       <div className="upload-form">
//         <div className="form-row">
//           <label className="file-upload-label" htmlFor="fileInput">
//             Elige tu recuerdo
//           </label>
//           <input
//             type="file"
//             id="fileInput"
//             onChange={handleFileChange}
//             required
//           />
//         </div>
//         <div className="form-row">
//           <input
//             type="text"
//             placeholder="Escoge un título"
//             value={title}
//             onChange={handleTitleChange}
//           />
//           <button onClick={handleUpload}>Guardar</button>
//         </div>
//       </div>
//       <div className="card-container">
//         {imageList.map((image, index) => (
//           <Card key={index} img_card={image.file} text={image.title} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Landing;

import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../components/Card/Card';
import './Landing.css';

const API_URL = "http://localhost:8000";

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

  const handleUpload = async () => {
    if (selectedFile && title) {
      try {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('title', title);
  
        const response = await fetch(`${API_URL}/images`, {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const newImage = await response.json();
          // Asegúrate de incluir la propiedad 'img_card' con la URL de la imagen
          newImage.img_card = newImage.image_url;
  
          // Agrega el objeto de imagen a la lista
          setImageList([...imageList, newImage]);
          setSelectedFile(null);
          setTitle('');
          toast.success('Imagen añadida con éxito', {
            position: 'bottom-right',
            autoClose: 3000,
          });
        } else {
          throw new Error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
      }
    } else {
      toast.error('Por favor, seleccione una imagen y añada un título');
  }
  }

  return (
    <div className="image-uploader-container">
      <div className="upload-form">
        <div className="form-row">
          <label className="file-upload-label" htmlFor="fileInput">
            Elige tu recuerdo
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
            placeholder="Escoge un título"
            value={title}
            onChange={handleTitleChange}
          />
          <button onClick={handleUpload}>Guardar</button>
        </div>
      </div>
      <div className="card-container">
  {imageList.map((image) => (
    <Card
      key={image.id}
      img_card={image.image_url}
      text={image.title}
      imageId={image.id}
      setImageList={setImageList} 
    />
  ))}
</div>

    </div>
  );
}

export default Landing;