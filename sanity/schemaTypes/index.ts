import { blockContentType } from "./blockContentType"
import { destinationType } from "./destinationType"
import { manualType } from "./manualType"
import { routesConfigType } from "./routesConfigType"
import { siteConfigType } from "./siteConfigType"

export const schema = {
  types: [
    blockContentType,
    siteConfigType,
    destinationType,
    routesConfigType,
    manualType,
  ],
}
