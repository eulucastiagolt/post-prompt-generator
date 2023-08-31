"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import AlertArea from "./components/alert-area";

export default function Home() {
  const [showAlert, setShowAlert] = useState(true);
  const [showAlertType, setShowAlertType] = useState("");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const topcRef = useRef<HTMLTextAreaElement>(null);
  const languageRef = useRef<HTMLSelectElement>(null);
  const writingStyleRef = useRef<HTMLSelectElement>(null);
  const writingToneRef = useRef<HTMLSelectElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const sectionRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const resumeRef = useRef<HTMLTextAreaElement>(null);
  const numberSectionRef = useRef<HTMLSelectElement>(null);
  const numberParagraphRef = useRef<HTMLSelectElement>(null);

  const t = useRef("Copiado com sucesso");
  const m = useRef("O conteudo selecionado, foi copiado com sucesso");

  const handleGeneratePrompt = () => {
    if (
      topcRef.current &&
      languageRef.current &&
      writingStyleRef.current &&
      writingToneRef.current &&
      titleRef.current &&
      sectionRef.current &&
      contentRef.current &&
      resumeRef.current &&
      numberSectionRef.current &&
      numberParagraphRef.current
    ) {
      if (topcRef.current.value === "") {
        setShowAlert(true);
        return;
      }
      titleRef.current.value = `Write a title for an article about "${topcRef.current.value}" in ${languageRef.current.value}. Style: ${writingStyleRef.current.value}. Tone: ${writingToneRef.current.value}. Must be between 40 and 60 characters.`;
      sectionRef.current.value = `Write ${numberSectionRef.current.value} consecutive headings for an article about "${topcRef.current.value}", in ${languageRef.current.value}. Style: ${writingStyleRef.current.value}. Tone: ${writingToneRef.current.value}. Each heading is between 40 and 60 characters. Use Markdown for the headings (## ).`;
      contentRef.current.value = `Write an article about "${topcRef.current.value}" in ${languageRef.current.value}. The article is organized by the following headings:\n\r{SECTIONS}\n\rWrite ${numberParagraphRef.current.value} paragraphs per heading. Use Markdown for formatting. Add an introduction prefixed by "===INTRO: ", and a conclusion prefixed by "===OUTRO: ". Style: ${writingStyleRef.current.value}. Tone: ${writingToneRef.current.value}.`;
      resumeRef.current.value = `Write an excerpt for an article about "${topcRef.current.value}" in ${languageRef.current.value}. Style: ${writingStyleRef.current.value}. Tone: ${writingToneRef.current.value}. Must be between 40 and 60 characters.`;
    }
  };

  const handleAutoSelect = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value !== "") {
      e.currentTarget.focus();
      e.currentTarget.select();
      e.currentTarget.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(e.currentTarget.value);
      setShowAlert(true);
      setShowAlertType("success");
      setTimeout(handleCloseAlert, 2000);
    }
  };

  const handleCloseAlert = (): void => {
    setShowAlert(false);
  };

  return (
    <>
      <AlertArea show={showAlert} type={showAlertType} message={m.current} title={t.current} closeFunction={handleCloseAlert} />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Gerador de prompt para posts
          </p>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By <Image src="/lucas_logo_branca.svg" alt="Lucas Logo" className="" width={100} height={24} priority />
            </a>
          </div>
        </div>

        <div className="pt-20 relative flex place-items-start before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <div className="z-[1] flex items-start gap-4">
            <div className="bg-white/5 p-5 rounded-lg border-white/10 border border-solid">
              <div className="pb-4 flex flex-col items-start">
                <h2 className="text-xl pb-4">Topic</h2>
                <textarea
                  className="bg-white/20 border-white/20 border p-5 rounded-lg"
                  cols={30}
                  rows={5}
                  placeholder="Ex: Escreva para mim 5 tópicos sobre como ganhar dinheiro como um afiliado na internet vendendo infoprodutos"
                  ref={topcRef}
                ></textarea>
              </div>
              <div className="py-4 flex flex-col items-start">
                <h2 className="text-xl pb-4">Idioma:</h2>
                <select defaultValue="English" ref={languageRef} className="bg-white/20 border-white/20 border px-5 py-4 w-full rounded-lg">
                  <option value="English">English</option>
                  <option value="German">German</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Italian">Italian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Portuguese">Portuguese</option>
                  {/* <option value="Other">Other</option> */}
                </select>
              </div>
              <div className="py-4 flex flex-col items-start">
                <h2 className="text-xl pb-4">Estilo de escrita:</h2>
                <select
                  defaultValue="Creative"
                  ref={writingStyleRef}
                  className="bg-white/20 border-white/20 border px-5 py-4 w-full rounded-lg"
                >
                  <option value="Informative">Informative</option>
                  <option value="Descriptive">Descriptive</option>
                  <option value="Creative">Creative</option>
                  <option value="Narrative">Narrative</option>
                  <option value="Persuasive">Persuasive</option>
                  <option value="Reflective">Reflective</option>
                  <option value="Argumentative">Argumentative</option>
                  <option value="Analytical">Analytical</option>
                  <option value="Evaluative">Evaluative</option>
                  <option value="Journalistic">Journalistic</option>
                  <option value="Technical">Technical</option>
                </select>
              </div>
              <div className="py-4 flex flex-col items-start">
                <h2 className="text-xl pb-4">Tom de escrita:</h2>
                <select
                  defaultValue="Cheerful"
                  ref={writingToneRef}
                  className="bg-white/20 border-white/20 border px-5 py-4 w-full rounded-lg"
                >
                  <option value="Neutral">Neutral</option>
                  <option value="Formal">Formal</option>
                  <option value="Assertive">Assertive</option>
                  <option value="Cheerful">Cheerful</option>
                  <option value="Humorous">Humorous</option>
                  <option value="Informal">Informal</option>
                  <option value="Inspirational">Inspirational</option>
                  <option value="Professional">Professional</option>
                  <option value="Confluent">Confluent</option>
                  <option value="Emotional">Emotional</option>
                  <option value="Persuasive">Persuasive</option>
                  <option value="Supportive">Supportive</option>
                  <option value="Sarcastic">Sarcastic</option>
                  <option value="Condescending">Condescending</option>
                  <option value="Skeptical">Skeptical</option>
                  <option value="Narrative">Narrative</option>
                  <option value="Journalistic">Journalistic</option>
                </select>
              </div>
              <div className="py-4 flex flex-col items-start">
                <h2 className="text-xl pb-4">Nº de seções:</h2>
                <select defaultValue="2" ref={numberSectionRef} className="bg-white/20 border-white/20 border px-5 py-4 w-full rounded-lg">
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="8">8</option>
                  <option value="10">10</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="py-4 flex flex-col items-start">
                <h2 className="text-xl pb-4">Nº de parágrafos por seção:</h2>
                <select
                  defaultValue="3"
                  ref={numberParagraphRef}
                  className="bg-white/20 border-white/20 border px-5 py-4 w-full rounded-lg"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="8">8</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div className="pt-4 flex flex-col items-start">
                <button
                  ref={buttonRef}
                  className="bg-[#fe842b] px-8 py-2 rounded-lg mt-4 self-end hover:bg-[#D65D0E] uppercase transition-all duration-300 border border-[#fe842b]"
                  onClick={handleGeneratePrompt}
                >
                  Gerar
                </button>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-lg border-white/10 border border-solid divide-y divide-dashed divide-white/20">
              <div className="pb-5">
                <h2 className="text-xl pb-4">Prompt para Titulo</h2>
                <textarea
                  ref={titleRef}
                  className="bg-white/20 border-white/20 border p-5 rounded-lg select-all"
                  readOnly
                  cols={30}
                  rows={6}
                  onClick={handleAutoSelect}
                ></textarea>
              </div>
              <div className="py-5">
                <h2 className="text-xl pb-4">Prompt para Seção</h2>
                <textarea
                  ref={sectionRef}
                  className="bg-white/20 border-white/20 border p-5 rounded-lg"
                  readOnly
                  onClick={handleAutoSelect}
                  cols={30}
                  rows={8}
                ></textarea>
              </div>
              <div className="py-5">
                <h2 className="text-xl pb-4">Prompt para Conteudo</h2>
                <textarea
                  ref={contentRef}
                  className="bg-white/20 border-white/20 border p-5 rounded-lg"
                  readOnly
                  onClick={handleAutoSelect}
                  cols={30}
                  rows={8}
                ></textarea>
              </div>
              <div className="pt-5">
                <h2 className="text-xl pb-4">Prompt para Resumo</h2>
                <textarea
                  ref={resumeRef}
                  className="bg-white/20 border-white/20 border p-5 rounded-lg"
                  readOnly
                  onClick={handleAutoSelect}
                  cols={30}
                  rows={6}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
      </main>
    </>
  );
}
