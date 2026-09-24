function FormularioAviso({
  titulo,
  texto,
  onTituloChange,
  onTextoChange,
  onSubmit,
  onCancelar,
  emEdicao,
  erroFormulario,
}) {
  return (
    <form className="formulario" onSubmit={onSubmit}>
      <h2>{emEdicao ? 'Editar aviso' : 'Novo aviso'}</h2>

      <div className="campo">
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => onTituloChange(e.target.value)}
          placeholder="Ex: Prova remarcada"
        />
      </div>

      <div className="campo">
        <label htmlFor="texto">Texto do aviso</label>
        <textarea
          id="texto"
          value={texto}
          onChange={(e) => onTextoChange(e.target.value)}
          placeholder="Escreva os detalhes do aviso..."
        />
      </div>

      {erroFormulario && (
        <div className="erro-formulario">{erroFormulario}</div>
      )}

      <div className="botoes-formulario">
        <button type="submit" className="botao">
          {emEdicao ? 'Salvar' : 'Publicar aviso'}
        </button>
        {emEdicao && (
          <button type="button" className="botao secundario" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default FormularioAviso
