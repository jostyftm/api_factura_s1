import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DatosMysqlDataSource} from '../datasources';
import {Item, ItemRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class ItemRepository extends DefaultCrudRepository<
  Item,
  typeof Item.prototype.id,
  ItemRelations
> {

  public readonly producto: BelongsToAccessor<Producto, typeof Item.prototype.id>;

  constructor(
    @inject('datasources.datos_mysql') dataSource: DatosMysqlDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Item, dataSource);
    this.producto = this.createBelongsToAccessorFor('producto', productoRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
  }
}
