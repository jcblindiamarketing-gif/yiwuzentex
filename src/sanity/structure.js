
import { BookIcon, TagIcon, UserIcon, PackageIcon, FolderIcon, ImageIcon } from '@sanity/icons' // or any other icon lib


const getSubCategoryList = (parentId, S) =>
  S.documentList()
    .title('Subcategories')
    .filter('_type == "productCategory" && parent._ref == $parentId')
    .params({ parentId })
    .child((subCategoryId) =>
      S.list()
        .title('Manage Subcategory')
        .items([
          S.listItem()
            .title('Edit Subcategory')
            .icon(TagIcon)
            .child(
              S.document()
                .schemaType('productCategory')
                .documentId(subCategoryId)
            ),
          S.listItem()
            .title('Subcategories')
            .icon(FolderIcon)
            .child(getSubCategoryList(subCategoryId, S)) // 👈 recursion
        ])
    );


export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Posts').icon(BookIcon),
            ])
        ),

      S.divider(),

      S.listItem()
        .title('Products')
        .icon(PackageIcon)
        .child(
          S.list()
            .title('Products')
            .items([
              S.documentTypeListItem('product').title('All Products').icon(PackageIcon),
            ])
        ),

      S.listItem()
        .title('Product Categories')
        .icon(FolderIcon)
        .child(
          S.documentList()
            .title('Parent Categories')
            .filter('_type == "productCategory" && !defined(parent)')
            .child((documentId) =>
              S.list()
                .title('Manage Category')
                .items([
                  S.listItem()
                    .title('Edit Category')
                    .icon(TagIcon)
                    .child(
                      S.document()
                        .schemaType('productCategory')
                        .documentId(documentId)
                    ),
                  S.listItem()
                    .title('Subcategories')
                    .icon(FolderIcon)
                    .child(getSubCategoryList(documentId, S)),
                ])
            )
        ),

      S.divider(),

      // ✅ Site Banners section
      S.listItem()
        .title('Site Banners')
        .icon(ImageIcon)
        .child(
          S.documentTypeList('siteBanner')
            .title('Site Banners')
        ),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) =>
          !['post', 'product', 'productCategory', 'siteBanner'].includes(item.getId())
      ),
    ]);


