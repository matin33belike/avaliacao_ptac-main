import CartaoAviso from './CartaoAviso.jsx'

function ListaAvisos({ avisos, carregando, erro, onEditar, onExcluir }) {
  if (carregando) {
    return <p className="estado-info">Carregando avisos...</p>
  }

  return (
    <div>
      {erro && <p className="estado-erro">{erro}</p>}

      {!erro && avisos.length === 0 && (
        <p className="estado-info">
          Nenhum aviso publicado — seja a primeira pessoa a escrever no mural.
        </p>
      )}

      <div className="lista-avisos">
        {avisos.map((aviso) => (
          <CartaoAviso
            key={aviso.id}
            aviso={aviso}
            onEditar={onEditar}
            onExcluir={onExcluir}
          />
        ))}
      </div>
    </div>
  )
}

export default ListaAvisos
