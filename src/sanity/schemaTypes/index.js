
import { blockContentType } from './blockContentType'
import { postType } from './postType'
import { productCategory } from './productCategory'
import { productType } from './product'
import { exhibitionType } from './exhibitionType'
import { siteBanner } from './assetContentType'
import { blogCategoryType } from './blogCategoryType'
import { siteSeoType } from './siteSeoType'

export const schema = {
  types: [
    blockContentType,
    postType,
    productCategory,
    productType,
    exhibitionType,
    siteBanner,
    blogCategoryType,
    siteSeoType,
  ],
}
