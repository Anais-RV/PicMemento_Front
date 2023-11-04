import "./Card.css"

const Card = (props) => {
    return (
<div className="card">
<img className="cardImage" src={props.img_card}></img>
<div className="imageText">{props.text}</div>
</div>
);
};

export default Card;