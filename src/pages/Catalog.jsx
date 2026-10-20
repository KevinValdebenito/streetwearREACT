
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

  const offerIds = [1, 2, 3]

  const listedProducts = mode === 'offers'
    ? products.filter((product) => offerIds.includes(product.id))
    : products

  const filteredProducts = mode === 'offers'
    ? listedProducts
    : listedProducts.filter((product) => category === 'Todas' || product.category === category)
        .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <section className="page-section">
      <div className="section-heading"><span>{mode === 'offers' ? '02 / SELECCIÓN' : '02 / CATÁLOGO'}</span><h1>{mode === 'offers' ? 'Ofertas' : 'Productos'}</h1></div>
      {mode !== 'offers' && <div className="filters"><input placeholder="Buscar productos..." value={search} onChange={(event) => onSearch(event.target.value)} />{categories.map((item) => <button className={category === item ? 'active' : ''} key={item} onClick={() => onCategory(item)}>{item}</button>)}</div>}
      <ProductGrid products={filteredProducts} onAdd={onAdd} />
    </section>
  )
}
