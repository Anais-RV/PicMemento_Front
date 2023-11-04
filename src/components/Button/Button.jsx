

const Card = (props) => {
const { image, title } = props;

const handleEditClick = () => {
};

const handleDeleteClick = () => {

};

return (
<div className="card">
    <img src={image} alt={title} />
    <h3>{title}</h3>
    <button onClick={handleEditClick}>Editar</button>
    <button onClick={handleDeleteClick}>Eliminar</button>
</div>
);
};

export default Card;
