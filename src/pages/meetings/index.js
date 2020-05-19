import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../_session';
import { snapshotToArray } from '../../_utility/functions';
import Search from './Search';
import MeetingList from './MeetingList';
import * as ROLES from '../../_constants/roles';
import ChatSection from './ChatSection';
import moment from 'moment';
import * as ROUTES from '../../_constants/routeConstants';

const Meetings = props => {
    const { authUser, firebase, history } = props;
    const [meetings, setMeetings] = useState([]);
    const [chatPairs, setChatPairs] = useState(new Map());
    const [currentMeetingKey, setCurrentMeetingKey] = useState(null);
    const [search, setSearch] = useState('');
    const [user, setUser] = useState({});
    const [doctorId, setDoctorId] = useState([]);

    useEffect(() => {
        // TODO loading indicator
        const sort = authUser.role === ROLES.PATIENT ? 'userId' : 'doctorId';
        firebase
            .meetings()
            .orderByChild(sort)
            .equalTo(authUser.uid)
            .on('value', snapshot => {
                const data = snapshotToArray(snapshot);
                setMeetings(sortByDate(data));
                meetings.map(meeting => {
                    const uid =
                        authUser.role === ROLES.PATIENT
                            ? meeting.doctorId
                            : meeting.userId;
                    firebase
                        .user(uid)
                        .once('value')
                        .then(snapshot => snapshot.val())
                        .then(data => {
                            setChatPairs(new Map(chatPairs.set(uid, data)));
                        });
                });
            });
    }, [authUser, firebase]);

    const sortByDate = data => (data ? data.sort(compare) : data);

    const compare = (item1, item2) => {
        if (item1.lastMessage && item2.lastMessage) {
            const item1Date = item1.lastMessage.date;
            const item2Date = item2.lastMessage.date;
            return moment(item1Date).isBefore(item2Date) ? 1 : -1;
        } else {
            return -1;
        }
    };

    const handleMeetingClick = key => {
        setCurrentMeetingKey(key);
        const [uid, doctorId] = key.split('_');
        console.log(doctorId);
        setDoctorId(doctorId);
    };

    const handleSearchType = e => {
        setSearch(e.target.value);
    };

    const handleEnd = () => {
        // TODO confirm dialog and also warning for doctor action
        if (authUser.role === ROLES.PATIENT)
            history.push({
                pathname: ROUTES.RATING,
                search: '',
                state: { doctorId },
            });
        else history.push(ROUTES.LANDING);
    };

    // TODO implement ui for meeting not chosen case
    return (
        <div className="meeting-container">
            <div className="container-fluid main-container">
                <div className="row h-100">
                    <div className="col border-right meetings-list-container">
                        <Search onChange={handleSearchType} />
                        <MeetingList
                            onClick={handleMeetingClick}
                            chatPairs={chatPairs}
                            meetings={meetings}
                            authUser={authUser}
                        />
                    </div>
                    <div className="col chat-section-container">
                        {currentMeetingKey ? (
                            <ChatSection
                                {...props}
                                currentMeetingKey={currentMeetingKey}
                            />
                        ) : null}
                    </div>
                    {/* TODO change*/}
                    <div className="col-sm-1">
                        {currentMeetingKey ? (
                            <button
                                type="button"
                                className="align-self-end btn btn-block btn-block btn-info"
                                onClick={handleEnd}
                            >
                                {' '}
                                End Meeting
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

const condition = authUser => authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(Meetings);
