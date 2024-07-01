import { buttonVariants } from "@/features/shared/presenters/ui/button";
import Link from "next/link";
import { lexendSemibold } from "@/features/shared/presenters/typography";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col gap-4 justify-center items-center p-10 max-sm:px-4">
      <h1 className={"text-5xl max-sm:text-2xl text-center text-green-500 " + lexendSemibold.className}>QuizziSabe</h1>
      <h2 className={"text-3xl max-sm:text-2xl text-center" + lexendSemibold.className}>== Reglas del examen en linea ==</h2>
      <ul>
        <li><span className="text-yellow-500 font-bold">1.</span>  Solo tendras <span className="text-red-500 font-bold">15 segundos</span> para responder cada pregunta.</li>
        <li><span className="text-yellow-500 font-bold">2.</span> Una vez que seleccionas tu respuesta, no se puede deshacer.</li>
        <li><span className="text-yellow-500 font-bold">3.</span> No puedes selecciónar ninguna opción una vez que se acaabe el tiempo.</li>
        <li><span className="text-yellow-500 font-bold">4.</span> No puedes salir del Quizz mientras esta corriendo el tiempo.</li>
        <li><span className="text-yellow-500 font-bold">5.</span> Obtendras puntos con base en tus respuestas correctas.</li>
      </ul>
      <Link href="/game" className={buttonVariants()} >Play now</Link>
    </main>
  );
}
