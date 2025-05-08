import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { SlEqualizer } from "react-icons/sl";
import {
  getStoredProductList,
  getStoredWishList,
  removeStoredProduct,
  removeStoredWishProduct,
} from "../utility/addRemoveProduct";
import CartWish from "../components/CartWish";
import ModalImg from "../assets/Group.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import WishList from "../components/WishLIst";

const Dashboard = () => {
  document.title = "Dashboard | Gadget Heaven";

  const navigate = useNavigate();
  const [addCartList, setAddCartList] = useState([]);
  console.log(addCartList);
  const [addWishList, setAddWishList] = useState([]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    addCartList.map(product => {
      sum += product.price;
    });
    setTotal(sum);
  }, [addCartList]);



  useEffect(() => {
    const storedAddProductList = getStoredProductList();
    setAddCartList(storedAddProductList);
  }, []);

  useEffect(() => {
    const storedWishProductList = getStoredWishList();
    setAddWishList(storedWishProductList);
  }, []);

  const handleSortBy = () => {
    // if (sortItem) {
    //   const sortedItems = [...addCartList].sort((a, b) => b.price - a.price);
    //   setAddCartList(sortedItems);
    // }
    const sortedItems = [...addCartList].sort((a, b) => b.price - a.price);
      setAddCartList(sortedItems);
  };

  const handleRemoveProduct = (id) => {
    removeStoredProduct(id);
    const addCartProduct = getStoredProductList();
    setAddCartList(addCartProduct);
  };

  const handlePurchase = () =>{
    document.getElementById("my_modal_4").showModal()
  }

  const handleWishListRemoveProduct = (id) => {
    removeStoredWishProduct(id);
    const addWishProduct = getStoredWishList();
    setAddWishList(addWishProduct);
  };

  return (
    <>
      <div className="hero bg-[#9538E2] pb-1">
        <div className="hero-content text-center flex-col">
          <div className="max-w-4xl">
            <Heading
              title={"Dashboard"}
              subTitle={
                "Explore the latest gadgets that will take your experience to the next level. From smart devices to the coolest accessories, we have it all!"
              }
            ></Heading>
          </div>
        </div>
      </div>

      <div>
        <Tabs>
          <TabList className="flex flex-col md:flex-row items-center justify-center border-none bg-[#9538E2] pb-7 gap-5 mb-5 cursor-pointer">
            <Tab className="outline-none p-3 text-white border rounded-full font-semibold">
              Read Books
            </Tab>
            <Tab className="outline-none p-3 text-white border rounded-full font-semibold">
              Wishlist Books
            </Tab>
          </TabList>

          <div className="max-w-7xl mx-auto">
            <TabPanel>
              <div className="flex flex-col md:flex-row items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    Cart: {addCartList.length}
                  </h2>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-5">
                  <p className="text-2xl font-bold">Total cost: {total}</p>
                  <button
                    onClick={() => handleSortBy()}
                    className="btn flex items-center shadow-none rounded-full text-[#9538E2] gap-2 text-lg font-semibold border-2 border-[#9538E2] bg-transparent hover:bg-transparent"
                  >
                    Sort By Price <SlEqualizer />
                  </button>

                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn text-lg font-semibold  shadow-none rounded-full text-white border bg-gradient-to-b from-[#9538E2] to-fuchsia-500"
                    onClick={() => handlePurchase()}
                  >
                    Purchase
                  </button>
                  <dialog id="my_modal_4" className="modal">
                    <div className="modal-box flex flex-col items-center max-w-xs">
                      <div>
                        <img src={ModalImg} alt="" />
                      </div>
                      <h2 className="text-2xl font-bold pt-2">
                        Payment Successful
                      </h2>
                      <div className="divider"></div>
                      <p className="text-gray-500">Thanks for purchasing</p>
                      <p className="py-2 text-gray-500">Total: {total}</p>

                      <div className="w-full mx-auto">
                        <form method="dialog">
                          {/* if there is a button, it will close the modal */}
                          <button
                            onClick={() => {
                              navigate("/");
                              toast.success("Back To Home", {
                                position: "top-center",
                                autoClose: 800,
                                theme: "colored",
                              });
                            }}
                            className="btn w-full rounded-full"
                          >
                            Close
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
              {addCartList.map((product) => (
                <CartWish
                  key={product.id}
                  product={product}
                  handleRemoveProduct={handleRemoveProduct}
                ></CartWish>
              ))}
            </TabPanel>
            <TabPanel>
              <h2 className="text-2xl font-bold">Wish Read: </h2>
              {addWishList.map((product) => (
                <WishList
                  key={product.id}
                  product={product}
                  handleWishListRemoveProduct={handleWishListRemoveProduct}
                ></WishList>
              ))}
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default Dashboard;
