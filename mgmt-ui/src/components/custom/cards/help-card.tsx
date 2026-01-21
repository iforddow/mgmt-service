export default function HelpCard({ content }: { content: React.ReactNode }) {
    return (
        <div className="rounded-lg border border-purple-200 bg-purple-50/50 dark:border-purple-900/50 dark:bg-purple-950/20 p-4">
            <h4 className="text-sm font-medium mb-2 text-purple-700 dark:text-purple-400">❓ Need Help?</h4>
            <p className="text-xs text-purple-700/80 dark:text-purple-300/80">
                {content}
            </p>
        </div>
    )
}