"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { AlertArea, Card, CardSection } from "./components";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const topcRef = useRef<HTMLTextAreaElement>(null);
  const languageRef = useRef<HTMLSelectElement>(null);
  const writingStyleRef = useRef<HTMLSelectElement>(null);
  const writingToneRef = useRef<HTMLSelectElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const titlePromptRef = useRef<HTMLTextAreaElement>(null);
  const sectionRef = useRef<HTMLTextAreaElement>(null);
  const sectionPromptRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const resumeRef = useRef<HTMLTextAreaElement>(null);
  const numberSectionRef = useRef<HTMLSelectElement>(null);
  const numberParagraphRef = useRef<HTMLSelectElement>(null);

  const alertTitle = useRef("Copiado com sucesso.");
  const alertMessage = useRef("O conteúdo selecionado, foi copiado com sucesso.");
  const alertType = useRef("success");

  const [alertShow, setAlertShow] = useState(false);
  const [step, setStep] = useState(1);

  const handleAutoSelect = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value !== "") {
      e.currentTarget.focus();
      e.currentTarget.select();
      e.currentTarget.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(e.currentTarget.value);
      handleShowArlet("success", "Copiado com sucesso.", "O conteúdo selecionado, foi copiado com sucesso.");
    }
  };

  const handleShowArlet = (type: string, title: string, message: string) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.error(message);
        break;
      default:
        toast(message);
    }
    // alertTitle.current = title;
    // alertMessage.current = message;
    // alertType.current = type;
    // setAlertShow(true);
    // setTimeout(handleCloseAlert, 3500);
  };

  const handleCloseAlert = (): void => {
    setAlertShow(false);
  };

  const handleGeneratePrompt = () => {
    if (
      topcRef.current &&
      languageRef.current &&
      writingStyleRef.current &&
      writingToneRef.current &&
      titleRef.current &&
      titlePromptRef.current &&
      sectionRef.current &&
      sectionPromptRef.current &&
      contentRef.current &&
      resumeRef.current &&
      numberSectionRef.current &&
      numberParagraphRef.current
    ) {
      switch (step) {
        case 2:
          if (topcRef.current?.value !== "")
            titlePromptRef.current.value = `Write a title for an article about "${topcRef.current.value}" in ${languageRef.current.value}. Style: ${writingStyleRef.current.value}. Tone: ${writingToneRef.current.value}. Must be between 40 and 60 characters.`;
          else handleShowArlet("error", "Campo não preenchido.", "Por favor, preencha o campo de Tópico.");
          break;
        case 3:
          if (topcRef.current?.value !== "" && titleRef.current?.value !== "")
            sectionPromptRef.current.value = `Write ${numberSectionRef.current.value} consecutive headings for an article about "${titleRef.current.value}", in ${languageRef.current.value}. Style: ${writingStyleRef.current.value}. Tone: ${writingToneRef.current.value}. Each heading is between 40 and 60 characters. Use Markdown for the headings (## ).`;
          else handleShowArlet("error", "Campo não preenchido.", "Por favor, preencha o campo de Título do artigo.");
          break;
        case 4:
          if (topcRef.current?.value !== "" && titleRef.current?.value !== "" && sectionRef.current?.value !== "") {
            contentRef.current.value = `Write an article about "${titleRef.current.value}" in ${languageRef.current.value}. The article is organized by the following headings:\n\r${sectionRef.current.value}\n\rWrite ${numberParagraphRef.current.value} paragraphs per heading. Use Markdown for formatting. Add an introduction prefixed by "===INTRO: ", and a conclusion prefixed by "===OUTRO: ". Style: ${writingStyleRef.current.value}. Tone: ${writingToneRef.current.value}.`;
            resumeRef.current.value = `Write an excerpt for an article about "${titleRef.current.value}" in ${languageRef.current.value}. Style: ${writingStyleRef.current.value}. Tone: ${writingToneRef.current.value}. Must be between 40 and 60 characters.`;
          } else handleShowArlet("error", "Campo não preenchido.", "Por favor, preencha o campo de seções do artigo.");
          break;
        case 5:
          break;
      }
    }
  };

  const handleNextStep = () => {
    switch (step) {
      case 1:
        setStep(2);
        break;
      case 2:
        if (topcRef.current?.value !== "") setStep(3);
        else handleShowArlet("error", "Campo não preenchido.", "Por favor, preencha o campo de Tópico.");
        break;
      case 3:
        if (topcRef.current?.value !== "" && titleRef.current?.value !== "") setStep(4);
        else handleShowArlet("error", "Campo não preenchido.", "Por favor, preencha o campo de Título do artigo.");
        break;
      case 4:
        if (topcRef.current?.value !== "" && titleRef.current?.value !== "" && sectionRef.current?.value !== "") setStep(5);
        else handleShowArlet("error", "Campo não preenchido.", "Por favor, preencha o campo de seções do artigo.");
        break;
      case 5:
        break;
    }
  };
  const handlePrevStep = () => {
    switch (step) {
      case 1:
        break;
      case 2:
        setStep(1);
        break;
      case 3:
        setStep(2);
        break;
      case 4:
        setStep(3);
        break;
      case 5:
        setStep(4);
        break;
    }
  };

  return (
    <>
      <AlertArea
        show={alertShow}
        type={alertType.current}
        title={alertTitle.current}
        message={alertMessage.current}
        closeFunction={handleCloseAlert}
      />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 items-center justify-between font-mono text-sm lg:flex w-full max-w-[1300px] mx-auto">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Gerador de prompt para posts
          </p>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="#Lucas."
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleShowArlet("warning", "Em breve...", `Logo disponibilizarei o link para meu site. \n\r Aguarde...`);
              }}
            >
              By <Image src="/lucas_logo_branca.svg" alt="Lucas Logo" className="" width={100} height={24} priority />
            </a>
          </div>
        </div>

        <div className="pt-20 relative flex place-items-start w-full max-w-[1300px] mx-auto before:absolute before:left-1/2 before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:left-1/3 after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <div className="z-[1] flex flex-wrap items-start gap-4 w-full">
            <Card className="w-full flex items-center gap-[10px] text-lg uppercase whitespace-nowrap text-white/60">
              <div className={`${step === 1 && "text-[#fe842b] font-bold"}`}>Configurção</div>
              <div className="h-[1px] bg-white/20 w-full max-w-[300px]"></div>
              <div className={`${step === 2 && "text-[#fe842b] font-bold"}`}>Titulo</div>
              <div className="h-[1px] bg-white/20 w-full max-w-[300px]"></div>
              <div className={`${step === 3 && "text-[#fe842b] font-bold"}`}>Seções</div>
              <div className="h-[1px] bg-white/20 w-full max-w-[300px]"></div>
              <div className={`${step === 4 && "text-[#fe842b] font-bold"}`}>Conteudo</div>
              <div className="h-[1px] bg-white/20 w-full max-w-[300px]"></div>
              <div className={`${step === 5 && "text-[#fe842b] font-bold"}`}>Resumo</div>
            </Card>

            <div className={`w-full ${step === 1 ? "block" : "hidden"}`}>
              <CardSection className="w-full">
                <Card className="w-full">
                  <h2 className="text-2xl pb-4">Configurações do prompt:</h2>
                  <div className="flex w-full justify-between gap-4">
                    <div className="py-4 flex flex-col items-start w-full">
                      <h2 className="text-xl pb-4">Idioma:</h2>
                      <select
                        defaultValue="English"
                        ref={languageRef}
                        className="bg-white/20 border-white/20 border px-5 py-4 w-full rounded-lg"
                      >
                        <option className="bg-black/50" value="English">
                          English
                        </option>
                        <option className="bg-black/50" value="German">
                          German
                        </option>
                        <option className="bg-black/50" value="French">
                          French
                        </option>
                        <option className="bg-black/50" value="Spanish">
                          Spanish
                        </option>
                        <option className="bg-black/50" value="Italian">
                          Italian
                        </option>
                        <option className="bg-black/50" value="Chinese">
                          Chinese
                        </option>
                        <option className="bg-black/50" value="Japanese">
                          Japanese
                        </option>
                        <option className="bg-black/50" value="Portuguese">
                          Portuguese
                        </option>
                        {/* <option className="bg-black/50" value="Other">Other</option> */}
                      </select>
                    </div>
                    <div className="py-4 flex flex-col items-start w-full">
                      <h2 className="text-xl pb-4">Estilo de escrita:</h2>
                      <select
                        defaultValue="Creative"
                        ref={writingStyleRef}
                        className="bg-white/20 border-white/20 border px-5 py-4 w-full rounded-lg"
                      >
                        <option className="bg-black/50" value="Informative">
                          Informative
                        </option>
                        <option className="bg-black/50" value="Descriptive">
                          Descriptive
                        </option>
                        <option className="bg-black/50" value="Creative">
                          Creative
                        </option>
                        <option className="bg-black/50" value="Narrative">
                          Narrative
                        </option>
                        <option className="bg-black/50" value="Persuasive">
                          Persuasive
                        </option>
                        <option className="bg-black/50" value="Reflective">
                          Reflective
                        </option>
                        <option className="bg-black/50" value="Argumentative">
                          Argumentative
                        </option>
                        <option className="bg-black/50" value="Analytical">
                          Analytical
                        </option>
                        <option className="bg-black/50" value="Evaluative">
                          Evaluative
                        </option>
                        <option className="bg-black/50" value="Journalistic">
                          Journalistic
                        </option>
                        <option className="bg-black/50" value="Technical">
                          Technical
                        </option>
                      </select>
                    </div>
                    <div className="pt-4 flex flex-col items-start w-full">
                      <h2 className="text-xl pb-4">Tom de escrita:</h2>
                      <select
                        defaultValue="Cheerful"
                        ref={writingToneRef}
                        className="bg-white/20 border-white/20 border px-5 py-4 w-full rounded-lg"
                      >
                        <option className="bg-black/50" value="Neutral">
                          Neutral
                        </option>
                        <option className="bg-black/50" value="Formal">
                          Formal
                        </option>
                        <option className="bg-black/50" value="Assertive">
                          Assertive
                        </option>
                        <option className="bg-black/50" value="Cheerful">
                          Cheerful
                        </option>
                        <option className="bg-black/50" value="Humorous">
                          Humorous
                        </option>
                        <option className="bg-black/50" value="Informal">
                          Informal
                        </option>
                        <option className="bg-black/50" value="Inspirational">
                          Inspirational
                        </option>
                        <option className="bg-black/50" value="Professional">
                          Professional
                        </option>
                        <option className="bg-black/50" value="Confluent">
                          Confluent
                        </option>
                        <option className="bg-black/50" value="Emotional">
                          Emotional
                        </option>
                        <option className="bg-black/50" value="Persuasive">
                          Persuasive
                        </option>
                        <option className="bg-black/50" value="Supportive">
                          Supportive
                        </option>
                        <option className="bg-black/50" value="Sarcastic">
                          Sarcastic
                        </option>
                        <option className="bg-black/50" value="Condescending">
                          Condescending
                        </option>
                        <option className="bg-black/50" value="Skeptical">
                          Skeptical
                        </option>
                        <option className="bg-black/50" value="Narrative">
                          Narrative
                        </option>
                        <option className="bg-black/50" value="Journalistic">
                          Journalistic
                        </option>
                      </select>
                    </div>
                  </div>
                </Card>
              </CardSection>
            </div>

            <div className={`w-full ${step === 2 ? "block" : "hidden"}`}>
              <CardSection className="gap-4">
                <Card className="w-full max-w-[calc((100%_/_3)_-_(1rem_*_(3_-_1)_/_3))]">
                  <div className="pb-4 flex flex-col items-start">
                    <h2 className="text-xl">Topico</h2>
                    <p className="text-sm text-white/70 pb-4">Insira o tópico do artigo. Isso será usado para o prompt de título</p>
                    <textarea
                      className="bg-white/20 border-white/20 border p-5 rounded-lg w-full"
                      cols={30}
                      rows={5}
                      placeholder="Ex: Escreva para mim 5 tópicos sobre como ganhar dinheiro como um afiliado na internet vendendo infoprodutos"
                      ref={topcRef}
                    ></textarea>
                  </div>
                </Card>
                <Card className="w-full flex flex-col">
                  <h2 className="text-xl pb-4">Prompt para Titulo</h2>
                  <textarea
                    ref={titlePromptRef}
                    className="bg-white/20 border-white/20 border p-5 rounded-lg select-all w-full"
                    readOnly
                    cols={30}
                    rows={6}
                    onClick={handleAutoSelect}
                  ></textarea>
                  <button
                    className="bg-[#fe842b] mt-4 px-8 py-2 rounded-lg self-end hover:bg-[#D65D0E] uppercase transition-all duration-300 border border-[#fe842b]"
                    onClick={handleGeneratePrompt}
                  >
                    Gerar
                  </button>
                </Card>
              </CardSection>
            </div>

            <div className={`w-full ${step === 3 ? "block" : "hidden"}`}>
              <CardSection className="gap-4">
                <Card className="w-full max-w-[calc((100%_/_3)_-_(1rem_*_(3_-_1)_/_3))]">
                  <div className="pb-4 flex flex-col items-start w-full">
                    <h2 className="text-xl">Titulo do artigo</h2>
                    <p className="text-sm text-white/70 pb-4">
                      Insira o título gerado pela IA, ou defina um próprio caso já tenha. Isso será usado para o prompt de seções
                    </p>
                    <textarea
                      className="bg-white/20 border-white/20 border p-5 rounded-lg w-full"
                      cols={30}
                      rows={2}
                      placeholder="Ex: 5 Maneiras de lucrar online com infoprodutos!"
                      ref={titleRef}
                    ></textarea>
                  </div>
                  <div className="pt-4 flex flex-col items-start w-full">
                    <h2 className="text-xl pb-4">Nº de seções:</h2>
                    <select
                      defaultValue="2"
                      ref={numberSectionRef}
                      className="bg-white/20 border-white/20 border px-5 py-4 w-full rounded-lg"
                    >
                      <option className="bg-black/50" value="2">
                        2
                      </option>
                      <option className="bg-black/50" value="3">
                        3
                      </option>
                      <option className="bg-black/50" value="4">
                        4
                      </option>
                      <option className="bg-black/50" value="6">
                        6
                      </option>
                      <option className="bg-black/50" value="8">
                        8
                      </option>
                      <option className="bg-black/50" value="10">
                        10
                      </option>
                      <option className="bg-black/50" value="12">
                        12
                      </option>
                    </select>
                  </div>
                </Card>
                <Card className="w-full flex flex-col">
                  <h2 className="text-xl pb-4">Prompt para Seção</h2>
                  <textarea
                    ref={sectionPromptRef}
                    className="bg-white/20 border-white/20 border p-5 rounded-lg w-full"
                    readOnly
                    onClick={handleAutoSelect}
                    cols={30}
                    rows={8}
                  ></textarea>
                  <button
                    className="bg-[#fe842b] mt-4 px-8 py-2 rounded-lg self-end hover:bg-[#D65D0E] uppercase transition-all duration-300 border border-[#fe842b]"
                    onClick={handleGeneratePrompt}
                  >
                    Gerar
                  </button>
                </Card>
              </CardSection>
            </div>

            <div className={`w-full ${step === 4 ? "block" : "hidden"}`}>
              <CardSection className="gap-4">
                <Card className="w-full max-w-[calc((100%_/_3)_-_(1rem_*_(3_-_1)_/_3))]">
                  <div className="pb-4 flex flex-col items-start w-full">
                    <h2 className="text-xl">Seções do artigo</h2>
                    <p className="text-sm text-white/70 pb-4">
                      Insira as seções gerado pela IA, ou defina um próprio caso já tenha. Isso será inserido no prompt de conteúdo e o de
                      resumo
                    </p>
                    <textarea
                      className="bg-white/20 border-white/20 border p-5 rounded-lg w-full"
                      cols={30}
                      rows={2}
                      placeholder="Ex: 5 Maneiras de lucrar online com infoprodutos!"
                      ref={sectionRef}
                    ></textarea>
                  </div>
                  <div className="pt-4flex flex-col items-start">
                    <h2 className="text-xl pb-4">Nº de parágrafos por seção:</h2>
                    <select
                      defaultValue="3"
                      ref={numberParagraphRef}
                      className="bg-white/20 border-white/20 border px-5 py-4 w-full rounded-lg"
                    >
                      <option className="bg-black/50" value="1">
                        1
                      </option>
                      <option className="bg-black/50" value="2">
                        2
                      </option>
                      <option className="bg-black/50" value="3">
                        3
                      </option>
                      <option className="bg-black/50" value="4">
                        4
                      </option>
                      <option className="bg-black/50" value="6">
                        6
                      </option>
                      <option className="bg-black/50" value="8">
                        8
                      </option>
                      <option className="bg-black/50" value="10">
                        10
                      </option>
                    </select>
                  </div>
                </Card>
                <Card className="w-full flex flex-col">
                  <h2 className="text-xl pb-4">Prompt para Conteudo</h2>
                  <textarea
                    ref={contentRef}
                    className="bg-white/20 border-white/20 border p-5 rounded-lg w-full"
                    readOnly
                    onClick={handleAutoSelect}
                    cols={30}
                    rows={8}
                  ></textarea>
                  <button
                    className="bg-[#fe842b] mt-4 px-8 py-2 rounded-lg self-end hover:bg-[#D65D0E] uppercase transition-all duration-300 border border-[#fe842b]"
                    onClick={handleGeneratePrompt}
                  >
                    Gerar
                  </button>
                </Card>
              </CardSection>
            </div>

            <div className={`w-full ${step === 5 ? "block" : "hidden"}`}>
              <CardSection className="gap-4">
                <Card className="w-full">
                  <h2 className="text-xl pb-4">Prompt para Resumo</h2>
                  <textarea
                    ref={resumeRef}
                    className="bg-white/20 border-white/20 border p-5 rounded-lg w-full"
                    readOnly
                    onClick={handleAutoSelect}
                    cols={30}
                    rows={6}
                  ></textarea>
                </Card>
              </CardSection>
            </div>

            <CardSection>
              <Card className="w-full flex justify-between items-center gap-4">
                <div>
                  {step !== 1 && (
                    <button
                      className="bg-[#fe842b] px-8 py-2 rounded-lg self-end hover:bg-[#D65D0E] uppercase transition-all duration-300 border border-[#fe842b]"
                      onClick={handlePrevStep}
                    >
                      Voltar
                    </button>
                  )}
                </div>
                <div className="text-center">
                  <span>
                    &copy; {new Date().getFullYear()} Esse aplicativo foi desenvolvido por{" "}
                    <a
                      className="pb-[2px] border-b border-dotted hover:text-[#fe842b] hover:border-[#fe842b]"
                      href="https://github.com/eulukasthyago"
                      target="_blank"
                    >
                      Lucas Tiago
                    </a>{" "}
                    com muito ❤️️ |
                  </span>{" "}
                  <a
                    className="pb-[2px] border-b border-dotted hover:text-[#fe842b] hover:border-[#fe842b]"
                    href="https://github.com/eulukasthyago/post-prompt-generator"
                    target="_blank"
                  >
                    Github
                  </a>
                </div>
                <div>
                  {step !== 5 && (
                    <button
                      className="bg-[#fe842b] px-8 py-2 rounded-lg self-end hover:bg-[#D65D0E] uppercase transition-all duration-300 border border-[#fe842b]"
                      onClick={handleNextStep}
                    >
                      Proximo
                    </button>
                  )}
                </div>
              </Card>
            </CardSection>
          </div>
        </div>

        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
      </main>
      <Toaster />
    </>
  );
}
