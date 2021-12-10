import React from 'react';
import Link from 'next/link';
import  Router  from 'next/router';

//se ejecuta desde el navegador, en el renderizado del lado del cliente
const LandingPage = ({ CurrentUser, tickets }) => {

    const onClickNew = () => {
        Router.push('/tickets/new');
    }

    const ticketList = tickets.map(ticket => {
        return (
            <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td>
                    <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
                        <a>View</a>
                    </Link>
                </td>
            </tr>
        )
    });

    return (
        <div className="mt-5">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>Tickets</h1>
                <button
                    className="btn btn-primary btn-sm"
                    style={{ marginTop: 20, width: '15%' }}
                    onClick = {onClickNew}
                >New Ticket</button>
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>

                        <th>Title</th>
                        <th>Price</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketList}
                </tbody>
            </table>
        </div>
    )
};

//se ejecuta desde el server, durante el renderizado en el server y no en el cliente(_app.tsx entrega estos valores)
LandingPage.getInitialProps = async (context: any, client: any, CurrentUser: any) => {
    const { data } = await client.get('/api/tickets');

    return { tickets: data }
}

export default LandingPage;

/*
    NOTA: index actualmente sirve como página de destino o nuestra aplicación cliente
*/
