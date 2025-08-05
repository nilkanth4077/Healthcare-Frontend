import React from "react";
import SideBar from "../SideBar";

const ManageUsers = () => {
    return (
        <>
            {/* <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-4"> */}
                <div className="bg-gray-900">
                    <h2>Hello</h2>
                    <SideBar />
                </div>
                <div className="bg-black pl-56">
                    <h2>Hello</h2>
                </div>
            {/* </div> */}
            <h3 className="text-center">Users Management Page</h3>
        </>
    );
};

export default ManageUsers;