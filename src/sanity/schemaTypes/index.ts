import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { orders } from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, orders],
}
