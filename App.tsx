import { useState } from 'react'

type Product = {
  id: number
  category: 'smartphones' | 'gaming'
  brand: string
  name: string
  specs: string
  price: number
  image: string
  badge?: string
}

const products: Product[] = [
  {
    id: 1,
    category: 'smartphones',
    brand: 'Apple',
    name: 'iPhone 16 Pro Max',
    specs: '256 GB · Desert Titanium',
    price: 139990,
    image:
      './images/iphone 16.jpg',
    badge: 'Хит',
  },
  {
    id: 2,
    category: 'smartphones',
    brand: 'Samsung',
    name: 'Galaxy S25 Ultra',
    specs: '256 GB · Titanium Black',
    price: 129990,
    image:
      './images/samsung.jpg',
    badge: 'Новинка',
  },
  {
    id: 3,
    category: 'gaming',
    brand: 'Logitech G',
    name: 'PRO X2 SUPERSTRIKE',
    specs: 'Беспроводная · 60 г',
    price: 19990,
    image:
      './images/superstrike.jpg',
  },
  {
    id: 4,
    category: 'gaming',
    brand: 'BenQ ZOWIE',
    name: 'XL2566X+',
    specs: '24.5″ · Full HD · 400 Гц',
    price: 89990,
    image:
      './images/hero.jpg',
    badge: 'Pro choice',
  },
  {
    id: 5,
    category: 'smartphones',
    brand: 'Apple',
    name: 'iPhone 16 Pro',
    specs: '128 GB · Natural Titanium',
    price: 114990,
    image:
      './images/pro max.jpg',
  },
  {
    id: 6,
    category: 'smartphones',
    brand: 'Samsung',
    name: 'Galaxy Z Fold6',
    specs: '512 GB · Silver Shadow',
    price: 159990,
    image:
      './images/fold.jpg',
    badge: 'Foldable',
  },
  {
    id: 7,
    category: 'gaming',
    brand: 'Logitech G',
    name: 'G PRO X TKL RAPID',
    specs: 'Магнитные переключатели · TKL',
    price: 24990,
    image:
      './images/tkl.jpg',
  },
  {
    id: 8,
    category: 'gaming',
    brand: 'Logitech G',
    name: 'PRO X 2 LIGHTSPEED',
    specs: 'Беспроводная гарнитура · 50 мм',
    price: 22990,
    image:
      './images/light.jpg',
    badge: 'Выбор игроков',
  },
]

const formatPrice = (value: number) => `${value.toLocaleString('ru-RU')} ₽`

function Icon({ name }: { name: 'bag' | 'arrow' | 'check' | 'menu' | 'close' | 'minus' | 'plus' }) {
  const paths = {
    bag: <><path d="M6 8h12l1 12H5L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    minus: <path d="M5 12h14" />,
    plus: <path d="M12 5v14M5 12h14" />,
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

export default function App() {
  const [filter, setFilter] = useState<'all' | Product['category']>('all')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [ordered, setOrdered] = useState(false)

  const cartItems = products.filter((product) => cart[product.id])
  const quantity = Object.values(cart).reduce((sum, item) => sum + item, 0)
  const total = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0)
  const visibleProducts = filter === 'all' ? products : products.filter((product) => product.category === filter)

  const addToCart = (id: number) => {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }))
    setCartOpen(true)
  }

  const changeQuantity = (id: number, delta: number) => {
    setCart((current) => {
      const next = (current[id] || 0) + delta
      const updated = { ...current }
      if (next <= 0) delete updated[id]
      else updated[id] = next
      return updated
    })
  }

  const scrollToCatalog = (nextFilter: typeof filter = 'all') => {
    setFilter(nextFilter)
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
  }

  const submitOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setOrdered(true)
    setCart({})
  }

  return (
    <main>
      <header className="header">
        <a className="logo" href="#top" aria-label="iLounge — на главную">
          i<span>Lounge</span>
        </a>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          <a href="#catalog" onClick={() => setMenuOpen(false)}>Каталог</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>О нас</a>
          <a href="#contacts" onClick={() => setMenuOpen(false)}>Контакты</a>
        </nav>
        <div className="header-actions">
          <button className="cart-button" onClick={() => setCartOpen(true)}>
            <Icon name="bag" />
            <span>Корзина</span>
            {quantity > 0 && <b>{quantity}</b>}
          </button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню">
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Технологии, которые вдохновляют</p>
          <h1>Выбирайте лучшее.<br />Живите ярче.</h1>
          <p className="hero-text">Флагманские смартфоны и игровые девайсы для тех, кто не привык к компромиссам.</p>
          <button className="primary-button" onClick={() => scrollToCatalog()}>
            Смотреть каталог <Icon name="arrow" />
          </button>
          <div className="benefits">
            <span><Icon name="check" /> Только оригинал</span>
            <span><Icon name="check" /> Гарантия 1 год</span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="./images/123.jpg"
            alt="Современное игровое рабочее место"
          />
          <div className="floating-card">
            <span>Новый уровень игры</span>
            <strong>400 Гц</strong>
            <small>BenQ ZOWIE XL2566X+</small>
          </div>
        </div>
      </section>

      <section className="catalog" id="catalog">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Каталог iLounge</p>
            <h2>Техника, которую выбирают</h2>
          </div>
          <div className="filters" role="group" aria-label="Фильтр каталога">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Все</button>
            <button className={filter === 'smartphones' ? 'active' : ''} onClick={() => setFilter('smartphones')}>Смартфоны</button>
            <button className={filter === 'gaming' ? 'active' : ''} onClick={() => setFilter('gaming')}>Для геймеров</button>
          </div>
        </div>

        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                {product.badge && <span className="badge">{product.badge}</span>}
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <span className="brand">{product.brand}</span>
                <h3>{product.name}</h3>
                <p>{product.specs}</p>
                <div className="product-bottom">
                  <strong>{formatPrice(product.price)}</strong>
                  <button onClick={() => addToCart(product.id)} aria-label={`Добавить ${product.name} в корзину`}>
                    <Icon name="bag" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1650661926447-9efb2610f64c?auto=format&fit=crop&w=1200&q=85"
            alt="Технологичное рабочее пространство"
          />
        </div>
        <div className="about-copy">
          <p className="eyebrow">О нас</p>
          <h2>Место, где техника становится частью вашей жизни</h2>
          <p>iLounge — это отборные флагманские устройства, честная консультация и забота после покупки. Мы продаём только оригинальную технику с официальной гарантией.</p>
          <div className="stats">
            <div><strong>7 лет</strong><span>на рынке</span></div>
            <div><strong>12 000+</strong><span>довольных клиентов</span></div>
            <div><strong>4.9</strong><span>рейтинг магазина</span></div>
          </div>
        </div>
      </section>

      <footer id="contacts">
        <div className="footer-brand">
          <a className="logo logo-light" href="#top">i<span>Lounge</span></a>
          <p>Флагманская техника<br />для яркой жизни.</p>
        </div>
        <div>
          <h3>Магазин</h3>
          <button onClick={() => scrollToCatalog('smartphones')}>Смартфоны</button>
          <button onClick={() => scrollToCatalog('gaming')}>Для геймеров</button>
          <a href="#about">О нас</a>
        </div>
        <div>
          <h3>Контакты</h3>
          <a href="tel:+79991234567">+7 (999) 123-45-67</a>
          <a href="mailto:hello@ilounge.ru">hello@ilounge.ru</a>
          <p>Москва, ул. Тверская, 12</p>
        </div>
        <div>
          <h3>Режим работы</h3>
          <p>Ежедневно<br />10:00 — 21:00</p>
          <span className="open-status">Открыто сейчас</span>
        </div>
      </footer>

      {cartOpen && (
        <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && setCartOpen(false)}>
          <aside className="cart-panel">
            <div className="cart-header">
              <div><span>Ваш заказ</span><h2>Корзина</h2></div>
              <button onClick={() => { setCartOpen(false); setOrdered(false) }} aria-label="Закрыть корзину"><Icon name="close" /></button>
            </div>

            {ordered ? (
              <div className="order-success">
                <div><Icon name="check" /></div>
                <h2>Заказ оформлен</h2>
                <p>Мы свяжемся с вами в течение 15 минут. Оплата — при получении в магазине.</p>
                <button className="primary-button" onClick={() => { setOrdered(false); setCartOpen(false) }}>Вернуться в магазин</button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="empty-cart">
                <Icon name="bag" />
                <h3>В корзине пока пусто</h3>
                <p>Добавьте устройство из каталога — это займёт один клик.</p>
                <button className="primary-button" onClick={() => { setCartOpen(false); scrollToCatalog() }}>Перейти в каталог</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map((product) => (
                    <div className="cart-item" key={product.id}>
                      <img src={product.image} alt="" />
                      <div>
                        <h3>{product.name}</h3>
                        <p>{formatPrice(product.price)}</p>
                        <div className="quantity">
                          <button onClick={() => changeQuantity(product.id, -1)}><Icon name="minus" /></button>
                          <span>{cart[product.id]}</span>
                          <button onClick={() => changeQuantity(product.id, 1)}><Icon name="plus" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-total"><span>Итого</span><strong>{formatPrice(total)}</strong></div>
                <form className="checkout-form" onSubmit={submitOrder}>
                  <h3>Оформление самовывоза</h3>
                  <label>Ваше имя<input required placeholder="Александр" /></label>
                  <label>Номер телефона<input required type="tel" placeholder="+7 (___) ___-__-__" /></label>
                  <div className="pickup-note"><Icon name="check" /><span><b>Оплата при получении</b><small>Москва, ул. Тверская, 12</small></span></div>
                  <button className="primary-button" type="submit">Подтвердить заказ <Icon name="arrow" /></button>
                  <small className="legal">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</small>
                </form>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  )
}
