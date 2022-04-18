const domain = process.env.SHOPIFY_STORE_DOMAIN
const storeFrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

interface Options {
  endpoint: string
  method: 'POST' | 'GET'
  headers: {}
  body: string
}

async function ShopifyData(query: string) {
  const URL = `https://${domain}/api/2022-04/graphql.json`

  const options: Options = {
    endpoint: URL,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storeFrontAccessToken,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }

  try {
    return await fetch(URL, options).then((response) => {
      return response.json()
    })
  } catch (e) {
    throw new Error(`Products not fetched with error: ${e}`)
  }
}

export async function getProductsInCollection() {
  const query = `{
  collectionByHandle(handle: "frontpage") {
    title
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 3) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
}
`
  const response = await ShopifyData(query)
  console.log(response)
  console.log("hello next")

  return response?.data?.collectionByHandle?.products?.edges ?? []
}
