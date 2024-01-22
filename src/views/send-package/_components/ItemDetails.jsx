import React, { useEffect, useState } from "react";
import { CatalogProductsModal } from "./modal/CatalogProductsModal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProducts } from "../../../redux/modules/products/actions/actions";
import { formatPrice } from "../../../lib/format-price";
import {
  reduceProductList,
  setProducts,
} from "../../../redux/modules/packages/actions/actions";

// import { useDebounce } from "use-debounce";
import { IoClose } from "react-icons/io5";

export const ItemDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const { products } = useSelector((state) => state.products);
  const { data } = products;
  const { token } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  // const [debouncedQty] = useDebounce(qtyProduct, 1000);

  const getData = () => {
    dispatch(getProducts({ token }));
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setItemShippingCost = () => {
    // Memastikan bahwa selectedProduct adalah array dan memiliki elemen
    if (Array.isArray(selectedProduct) && selectedProduct.length > 0) {
      // Iterasi melalui setiap produk dalam array
      const productsToRedux = selectedProduct.map((product) => {
        // const totalWeightPerProduct = product.weight * product.min_order;

        return {
          product_id: product.id,
          min_order: product.min_order,
          price: product.price,
          description: product.description,
          weight: product.weight,
          totalWeight: product.totalWeight,
          totalPrice: product.totalPrice,
        };
      });

      dispatch(setProducts(productsToRedux));
    } else {
      dispatch(setProducts([]));
    }
  };

  useEffect(() => {
    setItemShippingCost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct]);

  const handleWeightChange = (productId, event) => {
    const newWeightChange = [];

    const updatedProducts = selectedProduct.map((product) => {
      if (product.id === productId) {
        const totalWeightPerProduct =
          product.min_order * Number(event.target.value || "");

        newWeightChange.push({
          product_id: product.id,
          min_order: product.min_order,
          price: product.price,
          description: product.description,
          weight: Number(event.target.value || ""),
          totalWeight: totalWeightPerProduct,
          totalPrice: product.totalPrice,
        });
        return {
          ...product,
          weight: Number(event.target.value),
          totalWeight: totalWeightPerProduct,
          totalPrice: product.totalPrice,
        };
      }

      newWeightChange.push({
        product_id: product.id,
        min_order: product.min_order,
        price: product.price,
        description: product.description,
        weight: product.weight,
        totalWeight: product.totalWeight,
        totalPrice: product.totalPrice,
      });
      return product;
    });

    setSelectedProduct(updatedProducts);
    dispatch(setProducts(newWeightChange));
  };

  const handleDeleteListProduck = (id) => {
    const updatedListProducts = selectedProduct.filter(
      (product) => product.id !== id
    );

    setSelectedProduct(updatedListProducts);
    dispatch(reduceProductList(id));
  };

  const handleQuantityChange = (productId, event) => {
    const newQuantityChange = [];

    const updatedProducts = selectedProduct.map((product) => {
      if (product.id === productId) {
        const totalWeightPerProduct =
          product.weight * Number(event.target.value || "");

        const totalPricePerProduct =
          product.price * Number(event.target.value || "");

        newQuantityChange.push({
          product_id: product.id,
          min_order: Number(event.target.value || ""),
          price: product.price,
          description: product.description,
          weight: product.weight,
          totalWeight: totalWeightPerProduct,
          totalPrice: totalPricePerProduct,
        });
        return {
          ...product,
          min_order: Number(event.target.value),
          totalWeight: totalWeightPerProduct,
          totalPrice: totalPricePerProduct,
        };
      }

      newQuantityChange.push({
        product_id: product.id,
        min_order: product.min_order,
        price: product.price,
        description: product.description,
        weight: product.weight,
        totalWeight: product.totalWeight,
        totalPrice: product.totalPrice,
      });
      return product;
    });

    setSelectedProduct(updatedProducts);
    dispatch(setProducts(newQuantityChange));
  };

  return (
    <div>
      <div className="font-weight-bold font-lg  my-4 ">Detail Barang</div>
      <div className=" card p-3 shadow-sm rounded">
        <div className="mb-3">
          <CatalogProductsModal
            products={data}
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
          />
        </div>

        <div style={{ maxHeight: 500, overflowY: "auto" }} className="p-3">
          {selectedProduct && selectedProduct.length > 0 ? (
            selectedProduct
              .map((product) => {
                return (
                  <div key={product.id} className="card shadow-sm p-3">
                    <div className="d-flex justify-content-end mb-2">
                      <IoClose
                        onClick={() => handleDeleteListProduck(product.id)}
                        style={{ cursor: "pointer" }}
                        size={24}
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="">
                        <div className="d-flex">
                          {product.ImageProducts ? (
                            <div className="rounded shadow-sm border p-2">
                              <img
                                style={{ width: 80 }}
                                src={product.ImageProducts[0].url}
                                alt="product"
                              />
                            </div>
                          ) : (
                            <div className="form-group">
                              <label className="required-label">
                                Isi Paket
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          )}
                          <div className="ml-3">
                            <div className="font-weight-bold mb-2 ">
                              {product.name || ""}
                            </div>
                            {product.price && (
                              <div className="font-weight-bold mb-2">
                                {formatPrice(product.price)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <form>
                          <div className="form-group">
                            <label className="required-label">Berat</label>
                            <div style={{ position: "relative" }}>
                              <input
                                onChange={(event) =>
                                  handleWeightChange(product.id, event)
                                }
                                type="number"
                                value={product.weight || ""}
                                inputMode="numeric"
                                className="form-control"
                              />
                              <div
                                className="text-muted"
                                style={{
                                  position: "absolute",
                                  right: 0,
                                  top: 5,
                                  transform: "translateX(-10px)",
                                }}
                              >
                                gram
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="required-label mt-2">
                              Jumlah Item Dalam Paket
                            </label>
                            <input
                              onChange={(event) =>
                                handleQuantityChange(product.id, event)
                              }
                              value={product.min_order || ""}
                              type="number"
                              className="form-control"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                );
              })
              .reverse()
          ) : (
            <div className="text-center">
              Silahlak Pilih Produk Pada Katalog Produk
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
