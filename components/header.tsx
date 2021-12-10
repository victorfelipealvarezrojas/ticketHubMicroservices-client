import Link from 'next/link';

export const Header = ({ CurrentUser }) => {
    const links = [
        !CurrentUser && { labels: 'Sign Up', href: '/auth/sign-up' },
        !CurrentUser && { labels: 'Sign In', href: '/auth/sign-in' },
        CurrentUser && { labels: 'Sign Out', href: '/auth/sign-out' }
    ]
        .filter(linkConfig => linkConfig)
        .map(({ labels, href }) => {
            return (
                <li className="nav-item" key={href}>
                    <Link href={href}>
                        <a className="nav-link"> {labels}</a>
                    </Link>
                </li>
            )
        });

    return (
        <nav className="navbar navbar-light bg-light" style={{ marginLeft: 10, marginRight: 10 }}>
            <Link href="/">
                <a className="navbar-brand">TicketHub</a>
            </Link>
            <div className="d-flex justify-content-end">
                <ul className="nav d-flex align-items-center">
                    {links}
                </ul>
            </div>
        </nav>
    )
};

