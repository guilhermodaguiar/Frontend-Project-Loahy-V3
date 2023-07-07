import "./UserProfile.css";

import React, {useContext} from "react";
import GreetUser from "../greetUser/GreetUser";
import {AuthContext} from "../../../context/AuthContext";
import UserInformation from "../userInformation/UserInformation";
import WishList from "../../../pages/wishList/Wishlist";
import UserUpdate from "../userUpdate/UserUpdate";
import UserNavBar from "../../../layout/userNavBar/UserNavBar";
import UserChangePassword from "../changePassword/UserChangePassword";
import {BsFillPenFill} from "react-icons/bs";
import {RiLockPasswordFill} from "react-icons/ri";
import {MdAccountCircle} from "react-icons/md";
import LogoutButton from "../../buttonComponents/logoutButon/LogoutButton";


function UserProfile() {
    const {user} = useContext(AuthContext);

    return (<>
        {user.roles !== "ROLE_USER" ? <h3>U moet ingelogd zijn om deze content te mogen zien..</h3> :
            <div>
                <GreetUser/>
                <UserNavBar/>
                <div className="user-outer-container">
                    <section className="first-box-container">
                        <div id="profile">
                            <section className="userprofile-page">
                                <h1 className="ph-container"><MdAccountCircle size={40}/>Profiel</h1>
                                <div className="up-container">
                                    <UserInformation/>
                                </div>
                            </section>
                        </div>
                        <div id="change_password">
                            <div>
                                <h1 className="pc-container"><RiLockPasswordFill size={40}/>Wachtwoord</h1>
                                <h3 className="pc-text">Loahy wachtwoord wijzigen</h3>
                                <UserChangePassword/>
                            </div>
                        </div>
                    </section>
                    <section className="second-box-container">
                        <section id="update">
                            <div className="user-page-outer-container">
                                <h1 className="register-user-container"><BsFillPenFill size={30}/>Profiel aanpassen</h1>
                                <div className="user-register-inner-container">
                                    <h3 className="register-user-text">Loahy account aanpassen</h3>
                                    <UserUpdate/>
                                </div>
                            </div>
                        </section>
                    </section>
                    <section id="wishlist">
                        <div>
                            <h1 className="pc-container"><MdAccountCircle size={40}/>Verlanglijstje
                            </h1>
                            <WishList/>
                        </div>
                    </section>
                </div>
                <div className="logout">
                    <LogoutButton/>
                </div>
            </div>}
    </>)
}

export default UserProfile;