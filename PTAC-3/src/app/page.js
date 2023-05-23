"use client"
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import Link from 'next/link';

export default async function Home() {
  const router = useRouter();
  const req = await fetch("http://localhost:3003/alunos", {
    cache: "no-cache"
  });
  const alunos = await req.json();
 

  const remover = async (id) => {
    try {
      await fetch("http://localhost:3003/alunos/" + id, {
        method: "DELETE"
      })
      router.refresh()
    } catch {
      alert.arguments("Não foi possivél remover!")
    }
  }
  return (
    <article className={styles.article}>
   
   <h1>Usuários Cadastrados</h1>  
    <main className={styles.divs}>
      {alunos.map(aluno => (
        <div id='div' key={aluno.id}>
          <p><b>Nome:</b> {aluno.nome}</p>
          <p><b>Curso:</b> {aluno.curso}</p>
          <button id="cadastrar" onClick={e => e.preventDefault(remover(aluno.id))}>REMOVER</button>
        </div>
      ))}
    </main>
    <a id="cadastrar" href="/cadastro">Voltar a Cadastrar Usuários</a> 
    </article>
  )
}
