import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ProductCard } from "./";

const NUMBER_OF_PRODUCT_SKELETONS = 6;
const FILTER_BUTTONS_LABELS = [
  "All",
  "Men's Clothing",
  "Women's Clothing",
  "Jewelery",
  "Electronics",
];

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (isMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      isMounted = false; // cleanup function on unmount
    };
  }, []);

  const renderSkeleton = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        {[...Array(NUMBER_OF_PRODUCT_SKELETONS).keys()].map((number) => (
          <div key={number} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
            <Skeleton height={540} />
          </div>
        ))}
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const renderProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          {FILTER_BUTTONS_LABELS.map((label) => (
            <button
              key={label}
              className="btn btn-outline-dark btn-sm m-2"
              onClick={() =>
                label === "All"
                  ? setFilter(data)
                  : filterProduct(label.toLowerCase())
              }
            >
              {label}
            </button>
          ))}
        </div>
        {filter.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? renderSkeleton() : renderProducts()}
        </div>
      </div>
    </>
  );
};

export default Products;
