export default function TipCard({ tipList }: { tipList: React.ReactNode[] }) {
    return (
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/20 p-4">
            <h4 className="text-sm font-medium mb-2 text-amber-700 dark:text-amber-400">💡 Tips</h4>
            <ul className="list-disc list-inside text-xs text-amber-700/80 dark:text-amber-300/80 space-y-2">
                {tipList.map((tip, index) => (
                    <li key={index}>{tip}</li>
                ))}
            </ul>
        </div>
    );
}