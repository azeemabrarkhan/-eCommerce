import React from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const { id, image, title, description, price } = product;

  return (
    <div id={id} key={id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
      <div className="card text-center h-100" key={id}>
        <img
          className="card-img-top p-3 object-fit-contain"
          src={image}
          alt="Card"
          height={300}
        />
        <div className="card-body">
          <h5 className="card-title">{title.substring(0, 12)}...</h5>
          <p className="card-text">{description.substring(0, 90)}...</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item lead">$ {price}</li>
        </ul>
        <div className="card-body">
          <Link to={"/product/" + id} className="btn btn-dark m-1">
            Buy Now
          </Link>
          <button
            className="btn btn-dark m-1"
            onClick={() => {
              toast.success("Added to cart");
              addProduct(product);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
