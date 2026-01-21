export default function RelatedCard({ links }: { links: { href: string; label: string }[] }) {
    return (
        <div className="rounded-lg border border-blue-200 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-950/20 p-4">
            <h4 className="text-sm font-medium mb-2 text-blue-700 dark:text-blue-400">🔗 Related Settings</h4>
            <ul className="text-xs space-y-2">
                {links.map((link, index) => (
                    <li key={index}><a href={link.href} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">{link.label}</a></li>
                ))}
            </ul>
        </div>
    )
}