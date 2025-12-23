import { ScrollArea as MantineScrollArea, type ScrollAreaProps as MantineScrollAreaProps } from '@mantine/core';
import classes from './ScrollArea.module.css';

export interface ScrollAreaProps extends MantineScrollAreaProps {
    children: React.ReactNode;
}

/**
 * A themed ScrollArea component that provides custom scrollbar styling
 * matching the application's theme colors.
 * 
 * Wraps Mantine's ScrollArea with custom CSS for themed scrollbars.
 */
export default function ScrollArea({ children, classNames, styles, ...props }: ScrollAreaProps) {
    return (
        <MantineScrollArea
            classNames={{
                scrollbar: classes.scrollbar,
                thumb: classes.thumb,
                root: classes.root,
                viewport: classes.viewport,
                ...classNames,
            }}
            scrollbarSize={8}
            styles={styles}
            {...props}
        >
            {children}
        </MantineScrollArea>
    );
}
