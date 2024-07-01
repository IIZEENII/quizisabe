import { ProgressBar } from "@/features/shared/presenters/ui/progress-bar";

interface Props {
    progress: number;
    maxSeconds: number;
}

export function QuizzGameHeader({ progress, maxSeconds }: Props) {
    return (
        <div className="flex gap-8 w-full items-center">
            <ProgressBar value={progress * (100 / maxSeconds)} className="w-full" />
            <span className="w-14 text-xl text-center bg-blue-600 py-1 rounded-sm">{progress}</span>
        </div>
    )
}
