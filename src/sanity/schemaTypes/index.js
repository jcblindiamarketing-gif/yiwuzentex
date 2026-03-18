import { blockContentType } from './blockContentType'

import { postType } from './postType'
import { productCategory } from "./productCategory"
import { productType } from "./product"
import { exhibitionType } from "./exhibitionType"
import { siteBanner } from './assetContentType'

export const schema = {
  types: [blockContentType, postType, productCategory, productType, exhibitionType, siteBanner],
}

// import { categoryType } from './categoryType'