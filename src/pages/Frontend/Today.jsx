import React from 'react'
import List from '../../components/List'
import { where } from 'firebase/firestore'
export default function Today() {

    // useEffect(() => {
    //     // Get a reference to the server time offset path
    //     const serverTimeOffsetRef = database.ref('.info/serverTimeOffset');

    //     // Listen for changes to the server time offset
    //     serverTimeOffsetRef.on('value', (snapshot) => {
    //         // Get the offset value
    //         const serverTimeOffset = snapshot.val();

    //         // Get the current client time
    //         const clientTime = Date.now();

    //         // Calculate the server time
    //         const serverTime = clientTime + serverTimeOffset;

    //         console.log('Server time:', new Date(serverTime));
    //     });

    // }, [])
        const currentDate = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const formattedDate = currentDate.toLocaleDateString(undefined, options);
        // console.log(typeof(formattedDate))
    


    return (
        <>
            <List query={where("date", "==", formattedDate)} />
        </>
    )
}
