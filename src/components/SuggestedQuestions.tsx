export const SuggestedQuestions = ({ suggestedQuestions, append, setSubmitted }: { suggestedQuestions: string[], append: Function, setSubmitted: Function }) => {
    if (!suggestedQuestions.length) return null;

    return (
        <div className="flex flex-col gap-4 p-3 mb-32 rounded-md bg-neutral-900/70 border border-neutral-800/20">
            <h2 className="text-lg font-medium text-neutral-200">Suggested Questions</h2>
            <ul className="flex flex-col gap-2">
                {suggestedQuestions.map((q, i) => (
                    <li
                        key={i}
                        onClick={() => {
                            append({ role: 'user', content: q });
                            setSubmitted(true);
                        }}
                        className="text-neutral-400 hover:text-white cursor-pointer px-2 py-1 rounded-md hover:bg-neutral-800/70"
                    >
                        {q}
                    </li>
                ))}
            </ul>
        </div>
    );
};