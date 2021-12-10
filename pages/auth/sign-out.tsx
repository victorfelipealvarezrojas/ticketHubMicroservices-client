import {useEffect} from 'react';
import  Router  from 'next/router';
import useRequest from '../../hooks/use-request';


const signOut = () => {

    const { doReques } = useRequest({
        url: '/api/users/sign-out',
        methos: 'post',
        body: {},
        onSusses: () => Router.push('/'),
    });

    useEffect(() => {
        doReques();
    }, []);

    return <div>Signing you out...</div>
};

export default signOut;