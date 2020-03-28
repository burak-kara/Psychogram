import React from "react";
import profile_pic from "../../assets/demo_data/profile/profile_pic.jpg";
import {GoCalendar, GoLocation, GoMail, MdInsertEmoticon} from "react-icons/all";

const PersonalInfo = (props) => {
    return (
        <div className="col-lg-3 pl-5 pr-5 pt-2 pb-4 profile-info">
            <div className="col-md-12 h-auto text-center">
                <img src={profile_pic} className="img-fluid rounded-circle"/>
            </div>
            <div className="row mt-4">
                <div className="col-lg-9 col-9">
                    <div className="row name">
                        <span>
                            {`${props.user.name} ${props.user.surname}`}
                        </span>
                    </div>
                    <div className="row username">
                        <span>
                            {`${props.user.username}`}
                        </span>
                    </div>
                </div>
                <div className="col-lg-3 col-3 text-center">
                    <span className="status-icon" onClick={() => alert("change status")}>
                        <MdInsertEmoticon/>
                    </span>
                </div>
            </div>
            <div className="row mt-2 h-auto">
                <span>
                    {`${props.user.description}`}
                </span>
            </div>
            <div className="row mt-3">
                <button
                    className="btn btn-secondary btn-block"
                    type="button"
                    onClick={() => alert("go to settings")}
                >
                    Settings
                </button>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <div className="row text-capitalize">
                        <span>
                            <GoLocation className="profile-icon"/>
                            {` ${props.user.location}`}
                        </span>
                    </div>
                    <div className="row">
                        <span>
                            <GoMail className="profile-icon"/>
                            {` ${props.user.mail}`}
                        </span>
                    </div>
                    <div className="row">
                        <span>
                            <GoCalendar className="profile-icon"/>
                            {` ${props.user.birthday}`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;