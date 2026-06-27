/**
 * Pipeline d'optimisation des assets — exécuté EN AMONT (build-time), jamais au runtime.
 *
 *   node scripts/optimize-assets.mjs
 *
 * Lit le dossier `sources/` (référence client, LECTURE SEULE — jamais modifié) et
 * produit des images web légères :
 *   - photos curées  -> src/assets/photos/<slug>-NN.jpg   (importées via import.meta.glob)
 *   - logo (app)     -> src/assets/logo.jpg
 *   - logo (favicon) -> public/assets/logo.jpg
 *
 * Réglages : plus grand côté ramené à 1600px max, ré-encodage JPEG qualité 78
 * (mozjpeg). Les sources WhatsApp font déjà <= 1536px de large ; on borne surtout
 * la hauteur des portraits (2048 -> 1600) et on allège le poids.
 *
 * La CURATION (listes ci-dessous) a été faite à la main depuis des planches-contact :
 * on ne sert qu'un sous-ensemble varié et appétissant, pas les 64 photos brutes.
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const SRC = 'sources'
const OUT_PHOTOS = 'src/assets/photos'
const OUT_LOGO_APP = 'src/assets/logo.jpg'
const OUT_LOGO_FAVICON = 'public/assets/logo.jpg'
// Photo de fond du hero HomePage, servie en statique depuis public/assets.
const OUT_HERO = 'public/assets/hero.jpg'

const MAX_EDGE = 1600
const QUALITY = 78

// --- Curation (numéros WA des fichiers sources/<dir>/IMG-...-WA<NNNN>.jpg) ---
// Mariage & cérémonie : cocktail froid, ateliers, desserts, ambiance.
const MARIAGE = [
  '0010', // table dressée en extérieur (ambiance)
  '0030', // assortiment de verrines fleuries
  '0023', // cupcakes aux fleurs comestibles
  '0026', // salade aux fleurs comestibles
  '0046', // plateau de charcuterie & fleurs
  '0047', // roulés jambon/saumon fleuris
  '0049', // canapés fleuris
  '0021', // blinis au saumon mariné
  '0038', // verrines colorées
  '0039', // pavlova / meringue & fruits rouges
  '0040', // fraisier (dessert à l'assiette)
  '0024', // tartelettes fleuries
]
// Événements à emporter : bûches festives + boîtes/plateaux à emporter.
const A_EMPORTER = [
  '0061', // bûche chocolat & feuille d'or (fêtes)
  '0059', // bûche aux agrumes (fêtes)
  '0071', // bûche passion / agrumes
  '0062', // assortiment madeleines & macarons
  '0053', // assortiment en boîte
  '0054', // makis & verrines en boîte
  '0056', // verrines & samossas en boîte
  '0057', // verrines aux jeunes pousses (plateau)
  '0064', // verrines de saumon (plateau)
  '0069', // œufs mimosa & bûche
]

function findByWA(dir, wa) {
  const f = fs.readdirSync(path.join(SRC, dir)).find((n) => n.includes(`WA${wa}`))
  if (!f) throw new Error(`Source introuvable: ${dir}/WA${wa}`)
  return path.join(SRC, dir, f)
}

async function optimizePhoto(input, output) {
  await sharp(input)
    .rotate() // respecte l'orientation EXIF
    .resize(MAX_EDGE, MAX_EDGE, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(output)
  return fs.statSync(output).size
}

async function run() {
  fs.mkdirSync(OUT_PHOTOS, { recursive: true })
  fs.mkdirSync(path.dirname(OUT_LOGO_FAVICON), { recursive: true })

  let total = 0
  const jobs = [
    ['mariage', MARIAGE],
    ['a-emporter', A_EMPORTER],
  ]
  for (const [dir, list] of jobs) {
    for (let i = 0; i < list.length; i++) {
      const out = path.join(OUT_PHOTOS, `${dir}-${String(i + 1).padStart(2, '0')}.jpg`)
      const size = await optimizePhoto(findByWA(dir, list[i]), out)
      total += size
      console.log(`  ${out}  ${(size / 1024).toFixed(0)} KB`)
    }
  }

  // Hero HomePage : photo de fond, largeur <= 1600px, q78, vers public/assets.
  await sharp(path.join(SRC, 'hero.jpg'))
    .rotate()
    .resize(MAX_EDGE, MAX_EDGE, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(OUT_HERO)
  total += fs.statSync(OUT_HERO).size
  console.log(`  ${OUT_HERO}  ${(fs.statSync(OUT_HERO).size / 1024).toFixed(0)} KB`)

  // Logo : carré ~512px, qualité un peu plus haute (peu de fichiers).
  for (const out of [OUT_LOGO_APP, OUT_LOGO_FAVICON]) {
    await sharp(path.join(SRC, 'logo.jpg'))
      .resize(512, 512, { fit: 'inside' })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(out)
    total += fs.statSync(out).size
    console.log(`  ${out}  ${(fs.statSync(out).size / 1024).toFixed(0)} KB`)
  }

  console.log(`\nTotal: ${(total / 1024).toFixed(0)} KB sur ${MARIAGE.length + A_EMPORTER.length} photos + logo`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
