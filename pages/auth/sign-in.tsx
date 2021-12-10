import React, { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

type FormData = { email: string; password: string };

const signUp = () => {
    const [initislState, setInitislState] = useState<FormData>({
        email: '',
        password: '',
    });
    const { email, password } = initislState;
    const { doReques, errors } = useRequest({
        url: '/api/users/sign-in',
        methos: 'post',
        body: {
            email,
            password,
        },
        onSusses: () => Router.push('/'),
    });

    const onSubmit = async (e: any) => {
        e.preventDefault();
        await doReques()
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign In</h1>
            <div className="form-group">
                <label>Email adres</label>
                <input
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setInitislState({
                        ...initislState,
                        [e.target.name]: e.target.value
                    })}
                />            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => setInitislState({
                        ...initislState,
                        [e.target.name]: e.target.value
                    })}
                />
            </div>
            {
                errors
            }
            <button className="btn btn-primary">Sign In</button>
        </form>
    )
}

export default signUp;
