import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";
import AppContext from "../../context";

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onClickAdd,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price };

  const handleClickPlus = () => {
    onClickAdd(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={187}
          viewBox="0 0 150 187"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
          <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
          <circle cx="576" cy="277" r="20" />
          <rect x="0" y="101" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="121" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="155" rx="8" ry="8" width="80" height="24" />
          <rect x="118" y="148" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                src={
                  isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"
                }
                alt="Unliked"
              />
            </div>
          )}
          <img width={133} height={112} src={imageUrl} alt="Sneakers" />

          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div>
              <p>Цена</p>
              <b>{price} грн.</b>
            </div>
            {onClickAdd && (
              <img
                className={styles.plus}
                src={
                  isItemAdded(id) ? "/img/btn-cheked.svg" : "/img/btn-plus.svg"
                }
                alt="Plus"
                onClick={handleClickPlus}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
