import sharp from "sharp"
import { existsSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, "..")

const images = [
  {
    input: resolve(root, "public/assets/hero.jpg"),
    output: resolve(root, "public/assets/hero.webp"),
  },
  {
    input: resolve(root, "public/assets/canvas.png"),
    output: resolve(root, "public/assets/canvas.webp"),
  },
]

for (const { input, output } of images) {
  if (existsSync(output)) {
    console.log(`Skipping ${output} — already exists`)
    continue
  }
  await sharp(input).webp({ quality: 85 }).toFile(output)
  console.log(`Converted ${input} → ${output}`)
}
