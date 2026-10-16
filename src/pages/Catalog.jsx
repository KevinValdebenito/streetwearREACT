import { ProductGrid } from '../components/ProductGrid'

export function Catalog({ products, categories, category, search, onSearch, onCategory, mode, onAdd }) {
  if (mode === 'categories') {
    return (
      <section className="page-section">
        <div className="section-heading"><span>02 / EXPLORA</span><h1>Categorías</h1></div>
        <div className="category-grid">
          {categories.slice(1).map((item) => <button key={item} onClick={() => { onCategory(item); onSearch(''); }}>{item}<span>→</span></button>)}
        </div>
      </section>
    )
  }

  const listedProducts = mode === 'offers' ? products.filter((product) => product.price < 30000) : products
  return (
    <section className="page-section">
      <div className="section-heading"><span>{mode === 'offers' ? '02 / SELECCIÓN' : '02 / CATÁLOGO'}</span><h1>{mode === 'offers' ? 'Ofertas' : 'Productos'}</h1></div>
      {mode !== 'offers' && <div className="filters"><input placeholder="Buscar productos..." value={search} onChange={(event) => onSearch(event.target.value)} />{categories.map((item) => <button className={category === item ? 'active' : ''} key={item} onClick={() => onCategory(item)}>{item}</button>)}</div>}
      <ProductGrid products={listedProducts.filter((product) => category === 'Todas' || product.category === category).filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))} onAdd={onAdd} />
    </section>
  )
}
