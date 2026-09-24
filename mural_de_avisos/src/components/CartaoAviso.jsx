function CartaoAviso({ aviso, onEditar, onExcluir }) {
  return (
    <div className="cartao-aviso">
      <h3>{aviso.title}</h3>
      <p>{aviso.body}</p>
      <div className="metadados">
        post #{aviso.id} · autor {aviso.userId}
      </div>
      <div className="acoes">
        <button className="botao pequeno" onClick={() => onEditar(aviso)}>
          Editar
        </button>
        <button
          className="botao pequeno perigo"
          onClick={() => onExcluir(aviso.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  )
}

export default CartaoAviso
