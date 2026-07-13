import "./ListedHomeCard.css";
import { FaHeart,FaStar} from "react-icons/fa";
function ListedHomeCard() {
  return (
    <div className="listed-card">
      <div className="listed-card-image">
        <img
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"
          alt=""
        />

        <FaHeart size={24} className="wishlist-btn"/>

      </div>

      <div className="listed-card-info">
        <h3 className="listed-card-title"> Luxury Apartment</h3>

        <div className="listed-card-footer">
          <p className="listed-card-price">
            ₹20,146
            <span>/night</span>
          </p>
         

          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <FaStar color="#222222" size={12} />
              <span>4.92</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListedHomeCard;
