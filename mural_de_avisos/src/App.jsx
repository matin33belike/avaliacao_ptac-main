import { useEffect, useState } from 'react'
import FormularioAviso from './components/FormularioAviso.jsx'
import ListaAvisos from './components/ListaAvisos.jsx'
import './App.css'

const API = 'https://jsonplaceholder.typicode.com/posts'

function App() {
  const [avisos, setAvisos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  const [titulo, setTitulo] = useState('')
  const [texto, setTexto] = useState('')
  const [erroFormulario, setErroFormulario] = useState('')
  const [avisoEditando, setAvisoEditando] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function carregarAvisos() {
      setCarregando(true)
      setErro('')
      try {
        const resposta = await fetch(`${API}?_limit=15`, {
          signal: controller.signal,
        })
        if (!resposta.ok) {
          throw new Error('Falha ao buscar avisos')
        }
        const dados = await resposta.json()
        setAvisos(dados)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setErro('Não foi possível conectar à API')
        }
      } finally {
        setCarregando(false)
      }
    }

    carregarAvisos()
    return () => controller.abort()
  }, [])

  function limparFormulario() {
    setTitulo('')
    setTexto('')
    setErroFormulario('')
    setAvisoEditando(null)
  }

  function handleEditar(aviso) {
    setAvisoEditando(aviso)
    setTitulo(aviso.title)
    setTexto(aviso.body)
    setErroFormulario('')
  }

  function handleCancelar() {
    limparFormulario()
  }

  async function handleExcluir(id) {
    const avisoRemovido = avisos.find((aviso) => aviso.id === id)
    setAvisos((atuais) => atuais.filter((aviso) => aviso.id !== id))

    try {
      const resposta = await fetch(`${API}/${id}`, { method: 'DELETE' })
      if (!resposta.ok) {
        throw new Error('Falha ao excluir')
      }
    } catch (err) {
      if (avisoRemovido) {
        setAvisos((atuais) => [...atuais, avisoRemovido])
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!titulo.trim() || !texto.trim()) {
      setErroFormulario('preencha o título e o texto antes de publicar')
      return
    }
    setErroFormulario('')

    if (avisoEditando) {
      try {
        const resposta = await fetch(`${API}/${avisoEditando.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: avisoEditando.id,
            userId: 1,
            title: titulo,
            body: texto,
          }),
        })
        if (!resposta.ok) {
          throw new Error('Falha ao atualizar')
        }
        setAvisos((atuais) =>
          atuais.map((aviso) =>
            aviso.id === avisoEditando.id
              ? { ...aviso, title: titulo, body: texto }
              : aviso,
          ),
        )
        limparFormulario()
      } catch (err) {
        setErroFormulario('Não foi possível salvar as alterações. Tente novamente.')
      }
    } else {
      try {
        const resposta = await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 1, title: titulo, body: texto }),
        })
        if (!resposta.ok) {
          throw new Error('Falha ao publicar')
        }
        const novoAviso = await resposta.json()
        setAvisos((atuais) => [{ ...novoAviso, id: Date.now() }, ...atuais])
        limparFormulario()
      } catch (err) {
        setErroFormulario('Não foi possível publicar o aviso. Tente novamente.')
      }
    }
  }

  return (
    <div className="app">
      <header className="cabecalho">
        <h1>Mural de Avisos</h1>
      </header>

      <div className="conteudo">
        <FormularioAviso
          titulo={titulo}
          texto={texto}
          onTituloChange={setTitulo}
          onTextoChange={setTexto}
          onSubmit={handleSubmit}
          onCancelar={handleCancelar}
          emEdicao={!!avisoEditando}
          erroFormulario={erroFormulario}
        />

        <ListaAvisos
          avisos={avisos}
          carregando={carregando}
          erro={erro}
          onEditar={handleEditar}
          onExcluir={handleExcluir}
        />
      </div>
    </div>
  )
}

export default App
