export const showDatesQuery = `*[_type == "showDate"] | order(date asc) {
  _id, date, city, venue, address, ticketUrl, status, eventLabel, notes
}`

export const artistsQuery = `*[_type == "artist"] | order(order asc) {
  _id, name, slug, role, roleTag, group, photo, bio, order
}`

export const artistBySlugQuery = `*[_type == "artist" && slug.current == $slug][0] {
  _id, name, slug, role, roleTag, group, photo, bio, order
}`

export const partnersQuery = `*[_type == "partner"] {
  _id, name, logo, url, role
}`

export const contactInfoQuery = `*[_type == "contactInfo"][0] {
  swissContact, japanContact
}`

export const conceptPageQuery = `*[_type == "conceptPage"][0] {
  title, filmDescription, showDescription, directorNote, images, stats
}`

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  title, tagline, heroImage, heroCtaLabel
}`
