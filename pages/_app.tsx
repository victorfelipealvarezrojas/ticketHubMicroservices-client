import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import { Header } from '../components/header';

const AppComponent = ({ Component, pageProps, CurrentUser }) => {
    return (
        <div>
            <Header CurrentUser={CurrentUser} />
            <div className="container">
                <Component CurrentUser={CurrentUser} {...pageProps} />
            </div>
        </div>
    )
};

//se ejecuta desde el servidor
AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/current-user')

    //esta informacion es para el manejo del componente y todos sus hijos
    let pageProps;
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.CurrentUser);
    }

    return {
        pageProps,
        CurrentUser: data.CurrentUser,
    };
};

export default AppComponent;