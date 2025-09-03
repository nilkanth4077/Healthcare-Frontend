import { JitsiMeeting } from '@jitsi/react-sdk';
import React from 'react'

const PatientVideoCall = () => {

    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const roomName = user ? `Dr. ${user.firstName} ${user.lastName}` : "defaultRoom";
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