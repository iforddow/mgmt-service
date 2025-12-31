import {
    IconAdjustments,
    IconCalendarStats,
    IconFileAnalytics,
    IconGauge,
    IconLogs,
    IconPresentationAnalytics,
    IconShield,
} from '@tabler/icons-react';
import { Code, ScrollArea } from '@mantine/core';
import { LinksGroup } from './navbar_links/NavbarLinksGroup';
import classes from './Navbar.module.css';

const data = [
    { label: 'Dashboard', icon: IconGauge, link: '/' },
    {
        label: 'Server Logs',
        icon: IconLogs,
        initiallyOpened: false,
        links: [
            { label: 'Overview', link: '/logs/overview' },
            { label: 'Forecasts', link: '/logs/forecasts' },
            { label: 'Outlook', link: '/logs/outlook' },
            { label: 'Real time', link: '/logs/realtime' },
        ],
    },
    {
        label: 'Releases',
        icon: IconCalendarStats,
        links: [
            { label: 'Upcoming releases', link: '/releases/upcoming' },
            { label: 'Previous releases', link: '/releases/previous' },
            { label: 'Releases schedule', link: '/releases/schedule' },
        ],
    },
    { label: 'Analytics', icon: IconPresentationAnalytics, link: '/analytics' },
    { label: 'Contracts', icon: IconFileAnalytics, link: '/contracts' },
    { label: 'Settings', icon: IconAdjustments, link: '/settings' },
    {
        label: 'Security',
        icon: IconShield,
        links: [
            { label: 'IP Lookup', link: '/security/ip-lookup' },
            { label: 'Block List', link: '/security/blocklist' },
            { label: 'Add Block Rule', link: '/security/blocklist/add' },
        ],
    },
];

export default function Navbar() {
    const links = data.map((item) => <LinksGroup {...item} key={item.label} />);

    return (
        <nav className={classes.navbar}>

            <ScrollArea className={classes.links}>
                {links}
            </ScrollArea>

            <div className={classes.footer}>
                <Code fw={700} className={classes.version}>
                    v0.1.0
                </Code>
            </div>
        </nav>
    );
}