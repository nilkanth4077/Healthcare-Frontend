import { JitsiMeeting } from '@jitsi/react-sdk';
import { nav } from 'framer-motion/client';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const PatientVideoCall = () => {

    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const location = useLocation();
    const navigate = useNavigate();
    const { roomName } = location.state || { roomName: "defaultRoom" };
    const domain = "meet.jit.si";

    return (
        <>
            <div style={{ height: "100vh", display: "grid", flexDirection: "column" }}>
                <JitsiMeeting
                    roomName={roomName}
                    domain={domain}
                    displayName="Patient"
                    containerStyle={{ display: "flex", flex: 1 }}
                    configOverwrite={{
                        prejoinPageEnabled: true
                    }}
                />
            </div>
        </>
    )
}

export default PatientVideoCall