import { useState, useEffect } from 'react';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import classes from './NavbarLinksGroup.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

interface LinksGroupProps {
    icon: React.FC<any>;
    label: string;
    initiallyOpened?: boolean;
    link?: string;
    links?: { label: string; link: string }[];
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, link, links }: LinksGroupProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const hasLinks = Array.isArray(links) && links.length > 0;

    // Check if any child link is active
    const isChildActive = hasLinks && links.some((l) => location.pathname === l.link);

    // Check if this direct link is active (for items without submenus)
    const isDirectLinkActive = !hasLinks && link && location.pathname === link;

    // Auto-open dropdown if a child is active
    const [opened, setOpened] = useState(initiallyOpened || isChildActive);

    // Update opened state when location changes
    useEffect(() => {
        if (isChildActive && !opened) {
            setOpened(true);
        }
    }, [location.pathname, isChildActive]);

    const items = (hasLinks ? links : []).map((childLink) => {
        const isActive = location.pathname === childLink.link;
        return (
            <Text<'a'>
                component="a"
                className={`${classes.link} ${isActive ? classes.linkActive : ''}`}
                href={childLink.link}
                key={childLink.label}
                onClick={(event) => {
                    event.preventDefault();
                    navigate(childLink.link);
                }}
            >
                {childLink.label}
            </Text>
        );
    });

    const handleClick = () => {
        if (hasLinks) {
            setOpened((o) => !o);
        } else if (link) {
            navigate(link);
        }
    };

    // Determine if control should show active state
    const isControlActive = isDirectLinkActive || isChildActive;

    return (
        <>
            <UnstyledButton
                onClick={handleClick}
                className={`${classes.control} ${isControlActive ? classes.controlActive : ''}`}
            >
                <Group justify="space-between" gap={0}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <ThemeIcon variant={isControlActive ? 'filled' : 'light'} size={30}>
                            <Icon size={18} />
                        </ThemeIcon>
                        <Box ml="md">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <IconChevronRight
                            className={classes.chevron}
                            stroke={1.5}
                            size={16}
                            style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}

const mockdata = {
    label: 'Releases',
    icon: IconCalendarStats,
    links: [
        { label: 'Upcoming releases', link: '/' },
        { label: 'Previous releases', link: '/' },
        { label: 'Releases schedule', link: '/' },
    ],
};

export function NavbarLinksGroup() {
    return (
        <Box mih={220} p="md">
            <LinksGroup {...mockdata} />
        </Box>
    );
}