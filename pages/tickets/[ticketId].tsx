import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const TicketShow = ({ ticket }) => {
    const { doReques, errors } = useRequest({
        url: '/api/orders',
        methos: 'post',
        body: {
            ticketId: ticket.id,
            price: ticket.price
        },
        onSusses: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`)
    })

    return (
        <div className="mt-5">
            <h1>{ticket.title}</h1>
            <h4>Price: {ticket.price}</h4>
            {errors}
            <button
                className="btn btn-primary"
                onClick={() => doReques()}
            >Purchase</button>
        </div>
    );
}

TicketShow.getInitialProps = async (context: any, client: any) => {
    const { ticketId } = context.query;
    const { data } = await client.get(`/api/tickets/${ticketId}`);
    return { ticket: data };
}

export default TicketShow;