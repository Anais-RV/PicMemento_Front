import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../components/Card/Card';
import './Landing.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";

const API_URL = "http://localhost:8000";

function Landing() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [imageList, setImageList] = useState([]);
  const [imageSelected, setImageSelected] = useState(false); 

  
  useEffect(() => {
    
    const loadImages = async () => {
      try {
        const response = await fetch(`${API_URL}/images`);
        if (response.ok) {
          const images = await response.json();
          
          setImageList(images);
        } else {
          throw new Error('Failed to load images');
        }
      } catch (error) {
        console.error('Error al cargar las imágenes:', error);
      }
    };

    loadImages(); 
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageSelected(true); 
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
          newImage.img_card = newImage.image_url;

          setImageList([...imageList, newImage]);
          setSelectedFile(null);
          setTitle('');
          setImageSelected(false); 
          toast.success('Imagen añadida con éxito', {
            position: 'bottom-right',
            autoClose: 3000,
            className: "custom-toast",
            icon: <FontAwesomeIcon icon={faHeartCircleCheck} size="1x" color="black" />
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
          <label
            className={`file-upload-label ${imageSelected ? "image-loaded" : ""}`}
            htmlFor="fileInput"
          >
            {imageSelected ? "Imagen Cargada" : "Elige tu Recuerdo"}
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
