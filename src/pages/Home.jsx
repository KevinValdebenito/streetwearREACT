import { ProductGrid } from '../components/ProductGrid'
import { UrbanCarousel } from '../components/UrbanCarousel'

export function Home({ products, onAdd, onNavigate }) {
  return (
    <>
      <UrbanCarousel />
      <section className="hero">
        <div>
          <span>01 / SKATE CO.</span>
          <h1>El caos<br /><em>es nuestro.</em></h1>
          <p>Skate, diseño y actitud urbana desde Chile.</p>
          <button onClick={() => onNavigate('products')}>Explorar productos →</button>
        </div>
        <img src="/img/branding/nyc-skyline.jpg" alt="Silueta urbana de Nueva York" />
      </section>
      <section className="content-section">
        <div className="section-heading"><span>02 / DESTACADOS</span><h2>Lo que está rodando.</h2></div>
        <ProductGrid products={products.filter((product) => product.featured)} onAdd={onAdd} />
      </section>
      <section className="editorial">
        <h2>Camina lento<br /><em>pero con paso firme </em></h2>
        <p>Descubre videos, cultura y productos seleccionados para quienes convierten cada calle en una pista.</p>
      </section>
    </>
  )
}
