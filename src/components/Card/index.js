import React from "react";
import styles from './Card.module.scss';


function Card({ title, imageUrl, price, onFavorit, onPlus}) {
    const [isAdded, setIsAdded] = React.useState(false);
    const onClickPlus = () => {
        onPlus({ title, imageUrl, price});
        setIsAdded(!isAdded);
    }
    return(
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFavorit}>
                <img src="/img/heart-unliked.svg" alt="Unliked"/>
            </div>

            <img width={133} height={112} src={imageUrl} alt=""/>
            <p>{title}</p>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column ">
                    <span>Price:</span>
                    <b>{price}</b>
                </div>
                    <img
                        className={styles.plus}
                        onClick={onClickPlus}
                        src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                        alt=""
                    />
            </div>
        </div>
    );
}

export default Card;