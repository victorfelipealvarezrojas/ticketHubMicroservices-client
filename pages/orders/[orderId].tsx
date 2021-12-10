import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, CurrentUser }) => {
    const [timeLeft, setTimeLeft] = useState(0);

    const { doReques, errors } = useRequest({
        url: '/api/payments',
        methos: 'post',
        body: {
            orderId: order.id,
        },
        onSusses: (payment) => console.log(payment),
    });


    useEffect(() => {
        const findTimeLeft = () => {
            //tiempo restantev en milisegundos
            const msLeft = Number(new Date(order.expiresAt)) - Number(new Date());//fecha de expiracion - fecha actual
            setTimeLeft(Math.round(msLeft / 1000));//divido en 1000 para convertirlo a sefundos(1 seg son 10000ms)
        };

        findTimeLeft();//llamo a la funcion por primera vez

        //ejectuto la funcion con un intervalo de tiempo de 1 segundo
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [order]);

    if (timeLeft < 0) return <div>Order expired</div>;

    return (
        <div>
            <div>Time left to pay: {timeLeft} seconds</div>
            <StripeCheckout
                token={({ id }) => doReques({ token: id })}
                stripeKey="pk_test_51K3lZPI7j3zayC6Rka1f4JArk4ClfYsKpufNBTQ5o5W7gcUzQBA5jbGHpUY5hgTY6JT7PFAH8iIafhnmyllIYNp900ZeBTYk6p"
                amount={order.ticket.price * 100}
                email={CurrentUser.email}
            />
            {errors}
        </div>
    );
};

OrderShow.getInitialProps = async (context, client) => {
    //orderId es por el nombre del archivo
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);

    return { order: data };
};

export default OrderShow;
