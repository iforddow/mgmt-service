import { useState } from 'react';
import {
    IconChartBar,
    IconLogout,
    IconReport,
    IconServer,
    IconSettings,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';

const data = [
    { link: '', label: 'Services', icon: IconServer },
    { link: '', label: 'Analytics', icon: IconChartBar },
    { link: '', label: 'Reports', icon: IconReport },
    { link: '', label: 'Settings', icon: IconSettings },
];

export function Navbar() {
    const [active, setActive] = useState('Billing');

    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                {links}
            </div>
            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSettings className={classes.linkIcon} stroke={1.5} />
                    <span>Settings</span>
                </a>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    );
}