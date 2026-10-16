const carouselImages = [
  'e7f51400f06d10d5f70701c60bf629b3.jpg',
  '8d0f9c3f806d5678ba4037fb759ba6e0.jpg',
  '9e0c44e3360ac2b09e98669a8f59bd71.jpg',
  '7da991eb65311f318b25013fdd62ac53.jpg',
  'pintura6.jpg',
  'ec0c1a267259b9475c15ab6c5c859858.jpg',
  'd50824d36f64a5e8b6fdc510ba599b98.jpg',
  'pintura8.JPG',
  'APTO.png',
  'pintura10.png',
  'a0067c4a0a732b23278dcbc29b50c4a4.jpg',
  'f22633b56fb69f445f57409bb4778a76.jpg',
  '12a98279c693d011466fb8407782a558.jpg',
  'pintura14.jpg',
  'pintura15.jpg',
  'pintura9.png',
]

export function UrbanCarousel() {
  return (
    <section className="urban-carousel" aria-label="Galería de arte urbano">
      {carouselImages.map((image, index) => (
        <img
          key={image}
          src={`/img/carousel/${image}`}
          alt={`Diseño urbano ${index + 1}`}
          loading="eager"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
          style={{ '--carousel-index': index }}
        />
      ))}
    </section>
  )
}
