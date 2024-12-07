import { useEffect, useState } from "react"
import { MIDTRANS_API_URL, MIDTRANS_CLIENT_KEY } from "../config/apiConfig";

const useSnap = () => {
    const [snap, setSnap] =  useState(null);

    useEffect(() => {
        const myMidtransClientKey = MIDTRANS_CLIENT_KEY;
        let scriptTag = document.createElement('script');
        scriptTag.src = MIDTRANS_API_URL;
        scriptTag.setAttribute('data-client-key', myMidtransClientKey);
        scriptTag.onload = () => {
            setSnap(window.snap);
        }

        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        }
    }, []);

    const snapEmbed = (snap_token, embedId, action) => {
        if(snap) {
            try {
                snap.embed(snap_token, {
                    embedId,
                    onSuccess: (result) => {
                        console.log('Payment successful:', result);
                        action.onSuccess(result);
                    },
                    onPending: (result) => {
                        console.log('Payment pending:', result);
                        action.onPending(result);
                    },
                    onError: (result) => {
                        console.error('Payment error:', result);
                        action.onError(result);
                    },
                    onClose: () => {
                        console.log('Payment popup closed.');
                        action.onClose();
                    }
                });
            } catch (error) {
                console.error('Snap embed error:', error);
            }
        }
    } 

    return { snapEmbed }
}

export default useSnap