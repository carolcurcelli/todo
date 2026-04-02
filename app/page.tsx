"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const hoje = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  /* carregar do localstorage */
  useEffect(() => {
    const salvas = localStorage.getItem("tarefas");
    if (salvas) {
      try {
        const tarefasConvertidas = JSON.parse(salvas);
        setTarefas(tarefasConvertidas);
      } catch (erro) {
        console.error("Erro ao fazer o prase:", erro);
        setTarefas([]);
      }
    }
  }, []);

  /* salvar no localstorage */
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  /* criar tarefa */
  type Tarefa = {
    texto: string;
    concluida: boolean;
  }
  
  function adicionarTarefa() {
    if (novaTarefa.trim() === "") return;
    setTarefas([
      ...tarefas,
      { texto: novaTarefa, concluida: false }
    ]);
    setNovaTarefa("");
  }

  /* concluir tarefa */
  function toggleTarefa(index: number) {
    const novas = [...tarefas];
    novas[index].concluida = !novas[index].concluida;
    setTarefas(novas);
  }

  /* limpar lista */
  function limparLista () {
    setTarefas([]);
  }
  
  return (
    <main className="rounded-lg bg-white p-6 shadow-md outline outline-black/5 dark:bg-gray-800 w-md">
      <h1 className="text-3x1 font-bold mb-4">🧁 Tarefas de dia {hoje}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          adicionarTarefa();
        }}
        className="flex gap-2 mb-6"
      >
        <input
          type="text"
          placeholder="Digite uma tarefa..."
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          className="border border-gray-500 rounded-lg px-4 py-2 mr-4"
        />

        <button
          type="submit"
          className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500"
        >
          Adicionar
        </button>
      </form>
      <ul className="min-h-80 pt-4 pb-4">
        {tarefas.map((tarefa, index) => (
          <li 
            key={index}
            onClick={() => toggleTarefa(index)}
            className={`cursor-pointer border-b-2 border-gray-100 ${tarefa.concluida ? "line-through text-gray-400" : ""}`}
          >
            {tarefa.texto}
          </li>
        ))}
      </ul>
      <button onClick={limparLista} className="text-gray-400 border border-gray-400 px-4 py-2 rounded-lg cursor-pointer">Limpar</button>
    </main>
  )
}