import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Producto} from './producto.model';

@model()
export class Item extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  detalle: string;

  @belongsTo(() => Producto, {name: 'producto'})
  producto_id: number;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  // describe navigational properties here
}

export type ItemWithRelations = Item & ItemRelations;
