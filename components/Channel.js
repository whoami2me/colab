import React, {useState, useEffect} from 'React';
import { initializeApp } from 'firebase/app';
import { QuerySnapshot } from 'firebase/firestore';

const Channel = ({user = null , db = null}) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (db) {
            const unsubscribe = db.collection('messages')
            .orderBy('createdAt')
            .limit(100)
            .then(querySnapshot =>{
                const data = querySnapshot.docs.map(doc => ({
                    ... doc.data(),
                    id: doc.id,
                }));
                setMessages(data);
            })
            return unsubscribe;
        }
    }, [db]);

};

export default Channel;