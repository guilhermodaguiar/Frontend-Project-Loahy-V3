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
        {user.roles !== "ROLE_USER" ?
            <h3>U moet ingelogd zijn om deze content te mogen zien..</h3> :
            <>
                <GreetUser/>
                <UserNavBar/>
                <article className="user-outer-container">
                    <section className="first-box-container">
                        <div className="userprofile-page" id="profile">
                            <h1 className="ph-container"><MdAccountCircle size={40}/>Profiel</h1>
                            <UserInformation/>
                        </div>
                        <div id="change_password">
                            <h1 className="pc-container"><RiLockPasswordFill size={40}/>Wachtwoord</h1>
                            <h3 className="pc-text">Loahy wachtwoord wijzigen</h3>
                            <UserChangePassword/>
                        </div>
                    </section>
                    <section className="second-box-container" id="update">
                        <div className="user-page-outer-container">
                            <h1 className="register-user-container"><BsFillPenFill size={30}/>Profiel aanpassen</h1>
                            <h3 className="register-user-text">Loahy account aanpassen</h3>
                            <UserUpdate/>
                        </div>
                    </section>
                    <section id="wishlist">
                        <h1 className="pc-container"><MdAccountCircle size={40}/>Verlanglijstje
                        </h1>
                        <WishList/>
                    </section>
                    <section className="logout">
                        <LogoutButton/>
                    </section>
                </article>
            </>}
    </>)
}

export default UserProfile;