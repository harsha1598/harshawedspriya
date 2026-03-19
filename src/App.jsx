import siteContent from './content/siteContent.json';

const fontOptions = {
  cormorant: '"Cormorant Garamond", serif',
  manrope: '"Manrope", sans-serif',
};

function SectionTitle({ eyebrow, title, body, align = 'left' }) {
  return (
    <div className={`section-title section-title--${align}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {body ? <p className="section-copy">{body}</p> : null}
    </div>
  );
}

function FloatingNav({ links, buttonLabel, buttonTarget }) {
  return (
    <div className="floating-nav">
      <div className="floating-nav__brand">
        <span className="floating-nav__brand-mark">||</span>
        <span>{siteContent.nav.brandLabel}</span>
        <span className="floating-nav__brand-mark">||</span>
      </div>
      <nav aria-label="Section navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="button button--ghost" href={buttonTarget} target="_blank" rel="noreferrer">
        {buttonLabel}
      </a>
    </div>
  );
}

function Hero({ couple, event, venue, buttons, heroImages }) {
  return (
    <section className="hero" id="home">
      <div className="hero__backdrop" />
      <div className="hero__content">
        <div className="hero__ornament" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="hero__kicker">{siteContent.hero.kicker}</p>
        <p className="eyebrow">{event.tagline}</p>
        <h1>
          <span>{couple.brideName}</span>
          <span className="hero__ampersand">&amp;</span>
          <span>{couple.groomName}</span>
        </h1>
        <p className="hero__subtitle">{siteContent.hero.subKicker}</p>
        <p className="hero__date">{event.fullDate}</p>
        <p className="hero__lead">{event.invitationLine}</p>
        <div className="hero__meta">
          <div>
            <span className="hero__meta-label">Time</span>
            <strong>{event.ceremonyTime}</strong>
          </div>
          <div>
            <span className="hero__meta-label">Venue</span>
            <strong>{venue.name}</strong>
          </div>
        </div>
        <div className="hero__actions">
          <a className="button" href={buttons.primary.href}>
            {buttons.primary.label}
          </a>
          <a className="button button--ghost" href={buttons.secondary.href}>
            {buttons.secondary.label}
          </a>
        </div>
      </div>
      <div className="hero__visuals" aria-hidden="true">
        <figure className="hero__frame hero__frame--main">
          <img src={heroImages.primary.src} alt="" />
        </figure>
        <figure className="hero__frame hero__frame--accent">
          <img src={heroImages.secondary.src} alt="" />
        </figure>
      </div>
    </section>
  );
}

function Story({ story }) {
  return (
    <section className="story panel" id="story">
      <SectionTitle eyebrow={story.eyebrow} title={story.title} body={story.intro} />
      <div className="story__grid">
        {story.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <blockquote>{story.quote}</blockquote>
    </section>
  );
}

function CoupleCard({ person }) {
  return (
    <article className="couple-card">
      <div className="couple-card__image">
        <img src={person.photo} alt={person.alt} loading="lazy" />
      </div>
      <div className="couple-card__body">
        <p className="eyebrow">{person.role}</p>
        <h3>{person.name}</h3>
        <p>{person.description}</p>
      </div>
    </article>
  );
}

function CoupleSection({ couple }) {
  return (
    <section className="couple panel" id="couple">
      <SectionTitle
        eyebrow={couple.sectionEyebrow}
        title={couple.sectionTitle}
        body={couple.sectionBody}
        align="center"
      />
      <div className="couple__grid">
        <CoupleCard
          person={{
            role: 'The Bride',
            name: couple.brideName,
            description: couple.brideDescription,
            photo: couple.bridePhoto,
            alt: `${couple.brideName} portrait`,
          }}
        />
        <CoupleCard
          person={{
            role: 'The Groom',
            name: couple.groomName,
            description: couple.groomDescription,
            photo: couple.groomPhoto,
            alt: `${couple.groomName} portrait`,
          }}
        />
      </div>
    </section>
  );
}

function Timeline({ schedule }) {
  return (
    <section className="timeline panel" id="schedule">
      <SectionTitle
        eyebrow={schedule.eyebrow}
        title={schedule.title}
        body={schedule.description}
      />
      <div className="timeline__list">
        {schedule.events.map((item) => (
          <article className="timeline__item" key={`${item.time}-${item.title}`}>
            <p className="timeline__time">{item.time}</p>
            <div>
              <h3>{item.title}</h3>
              <p>{item.details}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function VenueCard({ venue }) {
  return (
    <section className="venue panel" id="venue">
      <div className="venue__card">
        <SectionTitle eyebrow={venue.eyebrow} title={venue.title} body={venue.description} />
        <div className="venue__content">
          <div>
            <h3>{venue.name}</h3>
            <p>{venue.address}</p>
            <p>{venue.landmark}</p>
          </div>
          <div className="venue__actions">
            <a className="button" href={venue.mapUrl} target="_blank" rel="noreferrer">
              Open Map
            </a>
            <a className="button button--ghost" href={`tel:${venue.phone}`}>
              Contact Venue
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery({ gallery }) {
  return (
    <section className="gallery panel" id="gallery">
      <SectionTitle eyebrow={gallery.eyebrow} title={gallery.title} body={gallery.description} />
      <div className={`gallery__grid gallery__grid--${gallery.variant}`}>
        {gallery.images.map((image) => (
          <figure key={image.src} className="gallery__item">
            <img src={image.src} alt={image.alt} loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  );
}

function Footer({ contact, event }) {
  return (
    <footer className="footer" id="contact">
      <p className="eyebrow">{contact.eyebrow}</p>
      <h2>{contact.title}</h2>
      <p>{contact.description}</p>
      <div className="footer__contacts">
        <a href={`tel:${contact.phone}`}>{contact.phoneLabel}</a>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </div>
      <p className="footer__note">{event.footerNote}</p>
    </footer>
  );
}

function App() {
  const { theme, nav, hero, couple, event, venue, story, schedule, gallery, contact } =
    siteContent;

  const themeStyles = {
    '--color-bg': theme.colors.background,
    '--color-surface': theme.colors.surface,
    '--color-surface-strong': theme.colors.surfaceStrong,
    '--color-text': theme.colors.text,
    '--color-muted': theme.colors.muted,
    '--color-accent': theme.colors.accent,
    '--color-accent-soft': theme.colors.accentSoft,
    '--color-leaf': theme.colors.leaf,
    '--color-leaf-soft': theme.colors.leafSoft,
    '--color-line': theme.colors.line,
    '--hero-overlay': theme.heroOverlay,
    '--font-heading': fontOptions[theme.fonts.heading] || fontOptions.cormorant,
    '--font-body': fontOptions[theme.fonts.body] || fontOptions.manrope,
  };

  return (
    <div className="app-shell" style={themeStyles}>
      <FloatingNav
        links={nav.links}
        buttonLabel={nav.mapButtonLabel}
        buttonTarget={venue.mapUrl}
      />
      <main className="page-shell">
        <Hero
          couple={couple}
          event={event}
          venue={venue}
          buttons={hero.buttons}
          heroImages={hero.images}
        />
        {story.enabled ? <Story story={story} /> : null}
        {couple.enabled ? <CoupleSection couple={couple} /> : null}
        {schedule.enabled ? <Timeline schedule={schedule} /> : null}
        {venue.enabled ? <VenueCard venue={venue} /> : null}
        {gallery.enabled ? <Gallery gallery={gallery} /> : null}
      </main>
      <Footer contact={contact} event={event} />
    </div>
  );
}

export default App;
