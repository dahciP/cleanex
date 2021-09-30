import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
const AllOrderHistory = () => {
  const [userDetail, setUserDetail] = useState({ name: "" });
  const [userOrder, setUserOrderDetail] = useState([]);
  // localStorage.setItem("setUserDetail", JSON.stringify(setUserDetail));
  // const localData = localStorage.getItem("setUserDetail");

  const getUserprofileDetails = async () => {
    await axios
      .get("/customers/userProfile")
      .then((res) => {
        console.log(res.data.customer);
        setUserDetail(res.data.customer);
        const uName = res.data.customer.name;
        getUserOrder(uName);
        console.log(uName);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  // const handleId = (id) => {
  //   setId(id);
  //   console.log(id);
  // };

  const getUserOrder = async (userName) => {
    console.log(userName);
    try {
      const formData = {
        CustomerName: userName,
      };
      const res = await axios.post("/order/allorders", formData);
      setUserOrderDetail(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUserprofileDetails();
    // getUserOrder();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center ">
        <div className="flex border-2 rounded mt-20 -ml-8">
          <input
            type="Date"
            className="px-4 py-2 w-80"
            placeholder="Search"
          ></input>
          <button className="flex items-center justify-center px-4 border-l">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex mx-auto items-center justify-center shadow-lg mt-56  mb-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <h2 className="text-5xl font-extrabold pb-10 pt-10 text-center ml-8 ">
            All Orders
          </h2>
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg m-8">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-lighter-blue">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                    >
                      OrderID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                    >
                      Total Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                    ></th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                {userOrder.map((order) => (
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.StartDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order._id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.Total}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {order.WashingStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          className="text-green-600 hover:text-green-400"
                          to={`/auth/user/vieworder/${order._id}`}
                        >
                          View
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link className="text-red-500 hover:text-red-400">
                          Delete
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrderHistory;
