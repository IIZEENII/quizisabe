import { Questions } from "@/features/questions/presenters/questions";
import { Suspense } from "react";

export default function GamePage() {
    return (
        <Suspense fallback={<span>Loading</span>}>
            <Questions />
        </Suspense>
    );
}
