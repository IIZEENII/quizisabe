import Image from "next/image"

export default function GameLoader() {
    return (
        <div className="flex flex-col gap-8 items-center justify-center">
            <Image className="w-[30rem] h-[30rem]" src="quizzisabe-loading-game.svg" alt="loading game" width={800} height={800} />
            <h1 className="text-3xl">Cargando Partida...</h1>
        </div>
    )
}