import "./UserProfile.css";

import React, {useContext} from "react";
import GreetUser from "../greetUser/GreetUser";
import {AuthContext} from "../../../context/AuthContext";
import UserInformation from "../userInformation/UserInformation";
import WishList from "../../../pages/wishList/Wishlist";
import UserUpdate from "../userUpdate/UserUpdate";
import UserNavBar from "../../../layout/userNavBar/UserNavBar";
import UserChangePassword from "../userChangePassword/UserChangePassword";
import {BsFillPenFill} from "react-icons/bs";
import {RiLockPasswordFill} from "react-icons/ri";
import {MdAccountCircle} from "react-icons/md";


function UserProfile() {
    const {user, logout} = useContext(AuthContext);


    return (
        <>
            {user.roles !== "ROLE_USER" ?
                <h3>U moet ingelogd zijn om deze content te mogen zien..</h3>
                :
                <div>
                    <section>
                        <GreetUser/>
                    </section>
                    <UserNavBar/>
                    <div className="user-outer-container">
                        <div className="first-box-container">
                            <section id="profile">
                                <section className="userprofile-page">
                                    <h1 className="profile-header-container"><MdAccountCircle size={40}/>Profiel</h1>
                                    <div className="userprofile-container">
                                        <UserInformation/>
                                    </div>
                                </section>
                            </section>

                            <section id="change_password">
                                <div>
                                    <h1 className="password-change-container"><RiLockPasswordFill size={40}/>Wachtwoord
                                    </h1>
                                    <div>
                                        <h3 className="password-change-text">Loahy wachtwoord wijzigen
                                        </h3>
                                    </div>
                                    <UserChangePassword/>
                                </div>
                            </section>

                        </div>
                        <div className="second-box-container">
                            <section id="update">
                                <div className="user-page-outer-container">
                                    <h1 className="register-user-container"><BsFillPenFill size={30}/>Profiel
                                        aanpassen</h1>
                                    <div className="user-register-inner-container">
                                        <div>
                                            <h3 className="register-user-text">Loahy account aanpassen
                                            </h3>
                                        </div>
                                        <UserUpdate/>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <section id="wishlist">
                            <div>
                                <h1 className="password-change-container"><MdAccountCircle size={40}/>Verlanglijstje</h1>
                                <WishList/>
                            </div>
                        </section>
                    </div>

                    <section className="logout">
                        <button type="button" onClick={logout}>
                            Uitloggen
                        </button>
                    </section>
                </div>
            }
        </>
    )
}

export default UserProfile;