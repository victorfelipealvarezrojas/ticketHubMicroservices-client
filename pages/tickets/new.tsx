import React, { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const NewTicket = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const { doReques, errors } = useRequest({
        url: '/api/tickets',
        methos: 'post',
        body: {
            title,
            price
        },
        onSusses: () => Router.push('/'),
    });

    const onSubmit = async (e: any) => {
        e.preventDefault();
        doReques();
    }

    const onBlur = () => {
        const value = parseFloat(price);
        if (isNaN(value)) return;
        //redondeo
        setPrice(value.toFixed(2));
    }

    return (
        <>
            <h1>Ticket</h1>
            <div style={{ width: '50%' }}>
                <form onSubmit={onSubmit} >
                    <div className="form-group mt-3">
                        <label>Ticket</label>
                        <input
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Price</label>
                        <input
                            className="form-control"
                            value={price}
                            onBlur={onBlur}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    {errors}
                    <button className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
        </>
    )
}

export default NewTicket;

