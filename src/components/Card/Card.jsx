import { useState } from "react";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const API_URL = "http://localhost:8000";

function Card(props) {
  console.log("Valor de props.imageId:", props.imageId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.text);

  const deleteImage = async (id) => {
    const userConfirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar la imagen para siempre?"
    );
    if (!userConfirmed) return;
  
    try {
      const response = await fetch(`${API_URL}/images/${id}`, { method: "DELETE" });
      if (response.ok) {
        // Elimina la imagen de la lista en el frontend
        props.setImageList((imageList) => imageList.filter((image) => image.id !== id));
      } else {
        throw new Error("Failed to delete image");
      }
    } catch (error) {
      console.error("Error eliminando la imagen:",error);
  }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    console.log("Guardar botón clicado");
    console.log("ID de imagen:", props.imageId);
  
    const url = `${API_URL}/images/${props.imageId}`; // Construye la URL
    console.log("URL de la solicitud:", url); // Muestra la URL en la consola

    const formData = new FormData();
    formData.append('title', editedText);

    const requestOptions = {
      method: "PUT",
      body: formData,
    };

    try {
      const response = await fetch(url, requestOptions); // Utiliza el formData en el cuerpo

      if (response.ok) {
        setIsEditing(false); // Cambia al modo de visualización
      } else {
        throw new Error("Failed to save image title");
      }
    } catch (error) {
      console.error("Error al guardar el título:", error);
    }
};



  
  

  const handleTitleChange = (event) => {
    setEditedText(event.target.value);
  };

  const renderIcon = (icon, action) => (
    <figure className={`icon-pointer ${icon}-icon`} onClick={action}>
      <FontAwesomeIcon icon={icon} size="xl" />
    </figure>
  );

  return (
    <div className="card">
      <img className="cardImage" src={`${API_URL}/${props.img_card}`} alt={props.text} />
      {isEditing ? (
        <div>
          <input
            className="edit"
            type="text"
            value={editedText}
            onChange={handleTitleChange}
          />
          <button className="save" onClick={handleSaveClick}>
            Guardar
          </button>
        </div>
      ) : (
        <div className="imageText">{editedText}</div>
      )}
      <div className="cardIcons">
        {renderIcon(faTrash, () => deleteImage(props.imageId))}
        {renderIcon(faEdit, handleEditClick)}
      </div>
    </div>
  );
      }

Card.propTypes = {
  img_card: PropTypes.string, 
  text: PropTypes.string,
  imageId: PropTypes.number,
  setImageList: PropTypes.func, 
};
export default Card;
